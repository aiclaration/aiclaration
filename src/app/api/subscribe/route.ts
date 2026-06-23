import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiter, getClientIp } from '@/lib/rate-limit';

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation';

// Abuse protection (replaces the planned Cloudflare Bot Fight Mode — no Cloudflare).
// 5 sign-ups per IP per hour: generous for a human, expensive for an email-bombing bot.
const limiter = createRateLimiter(5, 60 * 60_000);
// A human cannot read the page + fill the form in under ~2s; faster = bot.
const MIN_SUBMIT_MS = 2000;

export async function POST(req: NextRequest) {
  // Layer 2: per-IP rate limit. Triggers a Brevo DOI email on every accepted call,
  // so an unprotected endpoint is an email-bombing + reputation-burning vector.
  if (!limiter.check(getClientIp(req.headers))) {
    return NextResponse.json(
      { message: 'Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültiges Request-Format.' }, { status: 400 });
  }

  const { email, website, t0 } = body as { email?: string; website?: unknown; t0?: unknown };

  // Layer 1a: honeypot. The hidden `website` field is invisible to humans; only bots
  // fill it. Return 200 "ok" WITHOUT contacting Brevo so the bot gets no detection signal.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  }

  // Layer 1b: time-trap. Submitted suspiciously fast → bot. Same silent accept.
  // Client-supplied timestamp is spoofable; this is a cheap filter, not the main defense.
  if (typeof t0 === 'number' && Number.isFinite(t0) && Date.now() - t0 < MIN_SUBMIT_MS) {
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ message: 'E-Mail-Adresse ist ein Pflichtfeld.' }, { status: 400 });
  }

  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return NextResponse.json({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const templateId = process.env.BREVO_DOI_TEMPLATE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aiclaration.de';

  if (!apiKey || !listId || !templateId) {
    // In development: log warning and return success to not block UI testing
    console.warn('[subscribe] Brevo env vars not configured — BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID');
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  }

  const brevoRes = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      email: trimmed,
      includeListIds: [parseInt(listId, 10)],
      templateId: parseInt(templateId, 10),
      redirectionUrl: `${appUrl}/bestaetigt`,
      attributes: {
        SIGNUP_SOURCE: 'landingpage',
      },
    }),
  });

  // Brevo returns 204 No Content on success
  if (brevoRes.status === 204 || brevoRes.status === 200) {
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  }

  // Already subscribed or other non-fatal states still return success to avoid leaking info
  if (brevoRes.status === 400) {
    const data = await brevoRes.json().catch(() => ({}));
    const code: string = (data as { code?: string }).code ?? '';
    // "duplicate_parameter" = contact exists, treat as success
    if (code === 'duplicate_parameter') {
      return NextResponse.json({ message: 'ok' }, { status: 200 });
    }
    console.error('[subscribe] Brevo 400:', data);
    return NextResponse.json({ message: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.' }, { status: 500 });
  }

  console.error('[subscribe] Brevo error:', brevoRes.status);
  return NextResponse.json({ message: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.' }, { status: 500 });
}

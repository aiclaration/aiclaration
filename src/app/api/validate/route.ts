// /api/validate — URL-Fetch + Ajv Schema-Validation + SSRF-Protection
// See 00_Specs/4_Pflichtenheft.md S7.1 + S7.2 + S7.3
import { NextRequest, NextResponse } from 'next/server';
import { validateSchema } from '@/lib/schema';
import { isBlockedUrl, normalizeUrl, resolvesToPrivate } from '@/lib/ssrf';
import { createRateLimiter, getClientIp } from '@/lib/rate-limit';
import type { ValidateResponse } from '@/lib/types';

// Force Node.js runtime — DNS resolution (dns/promises) is not available on the Edge runtime.
export const runtime = 'nodejs';

const MAX_RESPONSE_BYTES = 50 * 1024; // 50 KB
const FETCH_TIMEOUT_MS = 5_000;
const MAX_REDIRECTS = 2;

// Per-IP rate limit (shared util, per-process). 10 validations/IP/minute.
const limiter = createRateLimiter(10, 60_000);

type FetchOutcome =
  | { ok: true; res: Response }
  | { ok: false; reason: 'SSRF' | 'REDIRECT_LIMIT' | 'NETWORK' | 'TIMEOUT' };

/**
 * Fetch following at most MAX_REDIRECTS hops MANUALLY, re-validating every hop
 * against the SSRF blocklist AND its resolved IPs. This closes two holes that
 * `redirect: 'follow'` leaves open:
 *   - a public URL 302-redirecting to an internal IP (e.g. cloud metadata)
 *   - DNS-rebinding where a public hostname resolves to a private address
 */
async function safeFetch(initialUrl: string, signal: AbortSignal): Promise<FetchOutcome> {
  let url = initialUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return { ok: false, reason: 'NETWORK' };
    }
    if (isBlockedUrl(url) || (await resolvesToPrivate(parsed.hostname))) {
      return { ok: false, reason: 'SSRF' };
    }

    let res: Response;
    try {
      res = await fetch(url, {
        signal,
        redirect: 'manual',
        headers: {
          'User-Agent': 'aiclaration-validator/1.0 (https://aiclaration.de)',
          Accept: 'application/json',
        },
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return { ok: false, reason: 'TIMEOUT' };
      return { ok: false, reason: 'NETWORK' };
    }

    // Manual redirect handling
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) return { ok: true, res }; // 3xx without Location — treat as final
      try {
        url = new URL(location, url).toString();
      } catch {
        return { ok: false, reason: 'NETWORK' };
      }
      continue;
    }
    return { ok: true, res };
  }
  return { ok: false, reason: 'REDIRECT_LIMIT' };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const start = Date.now();

  if (!limiter.check(getClientIp(req.headers))) {
    return NextResponse.json(
      { error: 'RATE_LIMIT_EXCEEDED', retry_after_seconds: 60 },
      { status: 429 }
    );
  }

  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'INVALID_REQUEST', message: 'Ungültiges JSON im Request-Body' },
      { status: 400 }
    );
  }

  if (!body.url || typeof body.url !== 'string') {
    return NextResponse.json(
      { error: 'INVALID_REQUEST', message: 'url ist ein Pflichtfeld' },
      { status: 400 }
    );
  }

  const rawUrl = body.url;
  const normalized = normalizeUrl(rawUrl);

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(normalized);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') throw new Error();
  } catch {
    return NextResponse.json(
      {
        error: 'INVALID_URL_FORMAT',
        message: 'Bitte geben Sie eine vollständige URL ein (mit https://)',
      },
      { status: 400 }
    );
  }

  if (isBlockedUrl(normalized)) {
    const response: ValidateResponse = {
      status: 'SSRF_ERROR',
      details: null,
      message: 'Diese URL kann nicht validiert werden — bitte eine öffentliche URL eingeben',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  // Build the /.well-known/ URL from the origin
  const wellKnownUrl = `${parsedUrl.protocol}//${parsedUrl.host}/.well-known/ai-transparency.json`;

  if (isBlockedUrl(wellKnownUrl)) {
    const response: ValidateResponse = {
      status: 'SSRF_ERROR',
      details: null,
      message: 'Diese URL kann nicht validiert werden — bitte eine öffentliche URL eingeben',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  // Fetch with hard timeout + manual redirect limit (max 2 hops, each SSRF-checked)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  let outcome: FetchOutcome;
  try {
    outcome = await safeFetch(wellKnownUrl, controller.signal);
  } finally {
    clearTimeout(timeout);
  }

  if (!outcome.ok) {
    const map: Record<typeof outcome.reason, { status: ValidateResponse['status']; message: string }> = {
      SSRF: {
        status: 'SSRF_ERROR',
        message: 'Diese URL kann nicht validiert werden — sie verweist auf eine interne oder nicht-öffentliche Adresse',
      },
      REDIRECT_LIMIT: {
        status: 'REDIRECT_LIMIT',
        message: 'Zu viele Weiterleitungen — die Datei muss direkt unter /.well-known/ erreichbar sein (max. 2 Redirects)',
      },
      TIMEOUT: {
        status: 'TIMEOUT',
        message: 'Die Website ist nicht erreichbar — Timeout nach 5 Sekunden',
      },
      NETWORK: {
        status: 'NOT_FOUND',
        message: '.well-known/ai-transparency.json nicht gefunden — haben Sie die Datei bereits angelegt?',
      },
    };
    const m = map[outcome.reason];
    const response: ValidateResponse = {
      status: m.status,
      details: null,
      message: m.message,
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  const fetchRes = outcome.res;

  if (fetchRes.status === 404) {
    const response: ValidateResponse = {
      status: 'NOT_FOUND',
      details: null,
      message: '.well-known/ai-transparency.json nicht gefunden — haben Sie die Datei bereits angelegt?',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  if (!fetchRes.ok) {
    const response: ValidateResponse = {
      status: 'NOT_FOUND',
      details: null,
      message: `Server antwortete mit Status ${fetchRes.status}`,
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  // NOTE (deviation from Pflichtenheft S7.1 step 5, intentional — see Session 04 log):
  // The spec hard-rejects any Content-Type != application/json. In practice many
  // legitimate static hosts (GitHub raw/Gist, S3, some CDNs) serve .json as
  // text/plain or application/octet-stream. Our OWN Zero-Tech guidance recommends
  // those hosts. Rejecting on MIME alone would punish users for a server
  // misconfiguration even though their file is perfectly valid. We therefore treat
  // Content-Type as advisory: the authoritative test is "parses as JSON + matches
  // schema". A genuine non-JSON body still fails below with FORMAT_ERROR.

  // Read body (max 50 KB)
  const reader = fetchRes.body?.getReader();
  if (!reader) {
    const response: ValidateResponse = {
      status: 'INTERNAL_ERROR',
      details: null,
      message: 'Fehler beim Lesen der Antwort',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  let tooLarge = false;
  let streaming = true;

  while (streaming) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_RESPONSE_BYTES) {
      tooLarge = true;
      await reader.cancel();
      streaming = false;
      break;
    }
    chunks.push(value);
  }

  if (tooLarge) {
    const response: ValidateResponse = {
      status: 'TOO_LARGE',
      details: null,
      message: 'Die ai-transparency.json Datei ist zu groß — maximal 50 KB erlaubt',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  const text = new TextDecoder().decode(
    chunks.reduce((acc, chunk) => {
      const merged = new Uint8Array(acc.length + chunk.length);
      merged.set(acc);
      merged.set(chunk, acc.length);
      return merged;
    }, new Uint8Array(0))
  );

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    const response: ValidateResponse = {
      status: 'FORMAT_ERROR',
      details: null,
      message: 'Die Datei enthält kein gültiges JSON',
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  const { valid, errors } = validateSchema(parsed);

  if (!valid) {
    const response: ValidateResponse = {
      status: 'INVALID',
      details: { errors },
      message: `Schema-Validierung fehlgeschlagen (${errors.length} Fehler)`,
      checked_at: new Date().toISOString(),
      processing_time_ms: Date.now() - start,
    };
    return NextResponse.json(response);
  }

  const data = parsed as Record<string, unknown>;
  const policy = data.ai_content_policy as Record<string, unknown>;

  const response: ValidateResponse = {
    status: 'VALID',
    details: {
      version: String(data.version ?? ''),
      last_updated: String(data.last_updated ?? ''),
      ai_content_policy: {
        uses_ai_content: Boolean(policy?.uses_ai_content),
        content_types: Array.isArray(policy?.content_types) ? (policy.content_types as string[]) : [],
        labeling_method: String(policy?.labeling_method ?? ''),
        human_review: Boolean(policy?.human_review),
        tools_used: Array.isArray(policy?.tools_used) ? (policy.tools_used as string[]) : [],
      },
      contact: String(data.contact ?? ''),
      legal_basis: String(data.legal_basis ?? ''),
    },
    checked_at: new Date().toISOString(),
    processing_time_ms: Date.now() - start,
  };

  return NextResponse.json(response);
}

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  // Bot protection (no Cloudflare): honeypot field + render timestamp (time-trap).
  const [website, setWebsite] = useState(''); // honeypot — real users never touch this
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Bitte bestätigen Sie die Einwilligung.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website, t0: startedAt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.message ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Netzwerkfehler — bitte versuchen Sie es erneut.');
      setStatus('error');
    }
  }

  return (
    <section id="newsletter" className="bg-slate-900 py-20 px-4 scroll-mt-20">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Vor August 2026 informiert bleiben
        </h2>
        <p className="text-slate-300 mb-8">
          Kostenloser Newsletter — EU AI Act Updates, neue Features, Deployment-Anleitungen.
          Kein Spam. Abmeldung jederzeit.
        </p>

        {status === 'success' ? (
          <div className="bg-emerald-900/40 border border-emerald-700 rounded-xl p-6 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-emerald-100 font-semibold mb-1">Fast geschafft!</p>
                <p className="text-emerald-300 text-sm">
                  Wir haben Ihnen eine Bestätigungs-E-Mail geschickt. Bitte klicken Sie auf den Link
                  darin, um Ihre Anmeldung abzuschließen (Double Opt-In).
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot: hidden from humans (off-screen + aria-hidden + tabIndex -1),
                tempting to bots. If filled, the server silently drops the request. */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}
            >
              <label htmlFor="company-website">Website (bitte leer lassen)</label>
              <input
                id="company-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <label htmlFor="newsletter-email" className="sr-only">
                E-Mail-Adresse
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                placeholder="ihre@email.de"
                autoComplete="email"
                required
                className="flex-1 h-11 px-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/30 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Wird gesendet…' : 'Anmelden'}
              </button>
            </div>

            <label className="flex items-start gap-3 text-left mb-4 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => { setConsent(e.target.checked); setErrorMsg(''); }}
                required
                className="w-6 h-6 rounded border-2 border-slate-600 checked:bg-emerald-600 checked:border-emerald-600 focus:ring-4 focus:ring-emerald-600/30 cursor-pointer shrink-0 mt-0.5"
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed">
                Ich bin einverstanden, den kostenlosen Newsletter von aiclaration zu erhalten. Abmeldung jederzeit
                möglich.{' '}
                <Link href="/datenschutz" className="underline hover:text-slate-200">
                  Datenschutz
                </Link>
              </span>
            </label>

            {(errorMsg || status === 'error') && (
              <div className="flex items-start gap-2 text-red-400 text-sm text-left" role="alert">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{errorMsg || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'}</span>
              </div>
            )}
          </form>
        )}

        <p className="mt-6 text-xs text-slate-500">
          Double Opt-In nach § 7 UWG · EU-Server (Brevo) · Abmeldung jederzeit
        </p>
      </div>
    </section>
  );
}

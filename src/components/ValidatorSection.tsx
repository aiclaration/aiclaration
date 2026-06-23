'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Square, Search } from 'lucide-react';

export default function ValidatorSection() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (url.trim()) {
      router.push('/validate?url=' + encodeURIComponent(url.trim()));
    }
  }

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3 text-center">
          Schritt 3 von 3 — Kostenlos
        </p>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
          Validieren Sie Ihre vorhandene Policy
        </h2>
        <p className="text-lg text-slate-700 text-center mb-10">
          Haben Sie bereits eine ai-transparency.json? Prüfen Sie jetzt, ob sie dem Standard
          entspricht.
        </p>

        <form onSubmit={handleSubmit} className="mb-10">
          <label htmlFor="validate-url" className="block font-medium text-slate-800 mb-2">
            Ihre Website-URL
          </label>
          <div className="flex gap-3">
            <input
              id="validate-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-11 flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-500 focus:border-emerald-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Jetzt prüfen
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            Wir prüfen{' '}
            <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">
              /.well-known/ai-transparency.json
            </code>{' '}
            auf Ihrer Domain.
          </p>
        </form>

        {/* Beispiel-Ergebnis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Beispiel-Ergebnis
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full">
              ✓ VALID
            </span>
            <span className="text-sm text-slate-500">example.com</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle
                className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Policy-Layer</p>
                <p className="text-slate-700 text-sm">
                  KI-Transparenz-Prozess dokumentiert und verifiziert
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <Square
                className="w-5 h-5 text-slate-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Content-Layer</p>
                <p className="text-slate-700 text-sm">
                  Kennzeichnung einzelner KI-Texte — Ihre Verantwortung (technisch nicht prüfbar
                  durch dieses Tool)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

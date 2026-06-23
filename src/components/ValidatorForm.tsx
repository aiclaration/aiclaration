'use client';

import { useState, type FormEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import ResultDisplay from './ResultDisplay';
import type { ValidateResponse } from '@/lib/types';

export default function ValidatorForm({ initialUrl }: { initialUrl?: string }) {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidateResponse | null>(null);
  const [checkedUrl, setCheckedUrl] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setInputError('Bitte geben Sie eine Website-URL ein.');
      return;
    }
    setInputError('');
    setLoading(true);
    setResult(null);
    setCheckedUrl(trimmed);

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });
      const data: ValidateResponse = await res.json();
      setResult(data);
    } catch {
      setResult({
        status: 'INTERNAL_ERROR',
        details: null,
        message: 'Netzwerkfehler — bitte versuchen Sie es erneut.',
        checked_at: new Date().toISOString(),
        processing_time_ms: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="validator-url" className="block font-medium text-slate-800 mb-2">
          Ihre Website-URL
        </label>
        <div className="flex gap-3">
          <input
            id="validator-url"
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setInputError(''); }}
            placeholder="https://ihrefirma.de"
            className={`h-11 flex-1 px-4 py-2 rounded-lg border text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-600/30 transition-colors ${
              inputError ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-emerald-600'
            }`}
            autoComplete="url"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center gap-2 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Search className="w-4 h-4" aria-hidden="true" />
            )}
            {loading ? 'Wird geprüft…' : 'Jetzt prüfen'}
          </button>
        </div>
        {inputError && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {inputError}
          </p>
        )}
        <p className="text-sm text-slate-500 mt-2">
          Wir prüfen{' '}
          <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">
            /.well-known/ai-transparency.json
          </code>{' '}
          auf Ihrer Domain — kein Login, keine Datenspeicherung.
        </p>
      </form>

      {result && (
        <div className="mt-8" role="region" aria-label="Validierungsergebnis" aria-live="polite">
          <ResultDisplay result={result} checkedUrl={checkedUrl} />
        </div>
      )}
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Square } from 'lucide-react';
import ValidatorForm from '@/components/ValidatorForm';

export const metadata: Metadata = {
  title: 'Validator — ai-transparency.json prüfen | aiclaration',
  description:
    'Prüfen Sie, ob Ihre ai-transparency.json dem Standard entspricht. Kostenlos, ohne Login.',
};

interface Props {
  searchParams: Promise<{ url?: string }>;
}

export default async function ValidatePage({ searchParams }: Props) {
  const { url } = await searchParams;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-2xl mx-auto px-4 py-16" id="main-content">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-8 py-2 min-h-11"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Zurück zur Startseite
        </Link>

        <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
          Schritt 3 von 3
        </p>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Ihre Policy validieren
        </h1>
        <p className="text-slate-700 mb-8">
          Prüfen Sie, ob Ihre <code className="font-mono text-sm bg-slate-100 px-1 rounded">ai-transparency.json</code> dem Standard entspricht — kostenlos, ohne Login.
        </p>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8">
          <ValidatorForm initialUrl={url} />
        </div>

        {/* Was passiert beim Check */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h2 className="font-semibold text-slate-900 mb-4">Was wird geprüft?</h2>
          <ol className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">1</span>
              <span>Abruf von <code className="font-mono text-xs bg-slate-100 px-1 rounded">/.well-known/ai-transparency.json</code> auf Ihrer Domain</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">2</span>
              <span>MIME-Type-Prüfung (muss <code className="font-mono text-xs bg-slate-100 px-1 rounded">application/json</code> sein)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">3</span>
              <span>JSON-Schema-Validierung gegen den ai-transparency.json Standard</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5">4</span>
              <span>Anzeige des 2-Layer-Status: Policy-Layer + Content-Layer</span>
            </li>
          </ol>
        </div>

        {/* 2-Layer-Erklärung — immer sichtbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Policy-Layer vs. Content-Layer</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Policy-Layer — unser Tool prüft das</p>
                <p className="text-slate-700 text-sm">
                  Ist Ihr KI-Transparenz-Prozess dokumentiert? Existiert die ai-transparency.json und entspricht sie dem Standard?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">Content-Layer — Ihre Verantwortung</p>
                <p className="text-slate-700 text-sm">
                  Sind einzelne KI-generierte Texte auf Ihrer Website als KI-generiert gekennzeichnet?
                  Technisch nicht automatisch prüfbar. Nutzen Sie unseren{' '}
                  <Link href="/generate#snippet" className="underline text-emerald-700">
                    Content-Labeling Snippet
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Dies ist kein Rechtsrat. Für rechtssichere Compliance-Beurteilung: Rechtsanwalt hinzuziehen.
          </p>
        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';

const bullets = [
  '5 Fragen → Ihre ai-transparency.json in 2 Minuten',
  'Kostenloser Download — keine Anmeldung',
  'Anleitung für WordPress, Squarespace, Jimdo inklusive',
];

const steps = [
  { label: 'Hinweis lesen & bestätigen', note: 'Pflicht-ACK' },
  { label: '5 Fragen zu Ihrem KI-Einsatz', note: 'Multiple-Choice' },
  { label: 'ai-transparency.json herunterladen', note: 'Sofortiger Download' },
];

export default function GeneratorSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Wizard-Vorschau */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-slate-500 font-mono">
                aiclaration.de/generate
              </span>
            </div>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    i === 0
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full text-sm font-semibold flex items-center justify-center ${
                      i === 0
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{step.label}</p>
                    <p className="text-xs text-slate-500">{step.note}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 text-white">
                <Download className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">ai-transparency.json</p>
                  <p className="text-xs text-slate-400">Bereit zum Download</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
              Schritt 2 von 3 — Kostenlos
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Erstellen Sie Ihre ai-transparency.json
            </h2>
            <p className="text-slate-700 mb-6">
              Der Wizard führt Sie in 5 einfachen Fragen durch die Erstellung Ihrer KI-Transparenz-
              Erklärung — ohne Login, ohne Datenspeicherung.
            </p>
            <ul className="space-y-3 mb-8">
              {bullets.map((text) => (
                <li key={text} className="flex items-center gap-3 text-slate-800">
                  <CheckCircle
                    className="w-5 h-5 text-emerald-600 shrink-0"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>
            <Link
              href="/generate"
              className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center gap-2"
            >
              Jetzt erstellen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

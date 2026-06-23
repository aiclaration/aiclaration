import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const bullets = [
  'Kostenlos, ohne Anmeldung',
  'Sofort wissen: Bin ich betroffen?',
  'Klarer nächster Schritt',
];

export default function BetroffenheitsCheckSection() {
  return (
    <section className="bg-slate-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3">
              Schritt 1 von 3 — Kostenlos
            </p>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Sind Sie betroffen? — 3 Fragen, unter 2 Minuten
            </h2>
            <p className="text-slate-700 mb-6">
              Der EU AI Act Art. 50(4) gilt nicht für jeden. Finden Sie in 3 Fragen heraus, ob Ihr
              Unternehmen betroffen ist — und was das für Sie bedeutet.
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
              href="/check"
              className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center gap-2"
            >
              Jetzt prüfen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* 3-Fragen-Vorschau */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="space-y-4">
              {[
                'Nutzen Sie KI (ChatGPT, Claude, Copilot o.ä.) für Texte?',
                'Publizieren Sie diese Texte online für die Öffentlichkeit?',
                'Prüft ein Mensch jeden KI-Text vor Veröffentlichung?',
              ].map((frage, i) => (
                <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <span className="flex-shrink-0 w-7 h-7 bg-emerald-600 text-white rounded-full text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-slate-800 text-sm leading-relaxed">{frage}</p>
                </div>
              ))}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                <p className="text-sm font-semibold text-emerald-800">
                  → Ihr persönliches Ergebnis wartet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

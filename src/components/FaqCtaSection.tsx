'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Was ist ai-transparency.json?',
    a: 'Eine offene JSON-Spezifikation, die unter /.well-known/ai-transparency.json auf Ihrer Website abgelegt wird — analog zu robots.txt. Sie beschreibt maschinenlesbar, wie Ihr Unternehmen KI für Content einsetzt.',
  },
  {
    q: 'Was deckt das Badge AB?',
    a: 'Den Policy-Layer: Ihr organisatorischer KI-Transparenz-Prozess ist dokumentiert und von aiclaration verifiziert. Das Siegel bestätigt, dass eine ai-transparency.json existiert und dem Standard entspricht.',
  },
  {
    q: 'Was deckt das Badge NICHT AB?',
    a: 'Den Content-Layer: Die Kennzeichnung einzelner KI-generierter Texte direkt im Content bleibt Ihre Pflicht. Das Badge ist kein Rechtsersatz für die Textkennzeichnung gemäß Art. 50(4).',
  },
  {
    q: 'Für wen ist aiclaration?',
    a: 'Für KMU mit Blog, News-Bereich oder Newsletter, die ChatGPT, Claude, Copilot oder ähnliche Tools für Content nutzen — und nachweisen müssen, dass ihr KI-Transparenz-Prozess dokumentiert ist.',
  },
  {
    q: 'Wie integriere ich das auf meiner Website?',
    a: 'Sie laden die generierte ai-transparency.json in Ihr /.well-known/-Verzeichnis hoch. Für WordPress, Squarespace und Jimdo gibt es eine Schritt-für-Schritt-Anleitung im Generator. Alternativ: Zero-Tech-Option über /validate/[slug] (Hosted Badge).',
  },
  {
    q: 'Was ist der EU Code of Practice on AI-Generated Content?',
    a: 'Ein freiwilliger Branchenstandard der EU AI Office, der am 10.06.2026 finalisiert wurde. Er stärkt die Erwartung an maschinenlesbare KI-Transparenz-Erklärungen — ai-transparency.json erfüllt genau diesen Gedanken.',
  },
  {
    q: 'Reicht ai-transparency.json für Art. 50(4)-Compliance?',
    a: 'Nein — das Tool dokumentiert Ihren Policy-Layer (Prozess-Nachweis). Den Content-Layer (Kennzeichnung einzelner KI-Texte) müssen Sie selbst umsetzen. Für rechtssichere Beurteilung Ihrer Gesamtsituation: Rechtsanwalt hinzuziehen.',
  },
];

export default function FaqCtaSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Häufige Fragen
        </h2>

        <div className="space-y-2 mb-16">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between p-4 text-left min-h-11 hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {open === i && (
                <div className="p-4 pt-0 text-slate-700 text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Abschluss-CTA */}
        <div className="bg-emerald-600 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Jetzt KI-Transparenz dokumentieren
          </h3>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
            Kostenlos starten — keine Anmeldung, kein Datenspeicher, keine versteckten Kosten.
          </p>
          <Link
            href="/generate"
            className="bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center justify-center"
          >
            ai-transparency.json erstellen →
          </Link>
        </div>
      </div>
    </section>
  );
}

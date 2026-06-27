import Link from 'next/link';
import { Gavel, AlertCircle, FileX } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
          Ab August 2026: Neue Transparenzpflichten für KI-generierte Inhalte
        </h2>
        <p className="text-lg text-slate-700 text-center mb-12 max-w-2xl mx-auto">
          Der EU AI Act Art. 50(4) greift für öffentlich veröffentlichte KI-Inhalte — mit
          Ausnahmen bei redaktioneller Prüfung. Sind Sie vorbereitet?
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <Gavel className="w-8 h-8 text-red-600 mb-4" aria-hidden="true" />
            <h3 className="font-bold text-slate-900 mb-2">Bußgeldrisiko</h3>
            <p className="text-slate-700 text-sm">
              Bis 15 Mio. € oder 3% des weltweiten Jahresumsatzes (Art. 99 Abs. 4) bei Verstoß
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <AlertCircle className="w-8 h-8 text-amber-600 mb-4" aria-hidden="true" />
            <h3 className="font-bold text-slate-900 mb-2">Anwaltskosten</h3>
            <p className="text-slate-700 text-sm">
              Rechtsgutachten für KI-Compliance: 5.000–15.000 € — für die meisten KMU nicht
              verhältnismäßig
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <FileX className="w-8 h-8 text-slate-600 mb-4" aria-hidden="true" />
            <h3 className="font-bold text-slate-900 mb-2">Kein Nachweis</h3>
            <p className="text-slate-700 text-sm">
              Ohne dokumentierten Prozess: kein Beweis gegenüber Kunden, Partnern und Regulierern
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
          <p className="text-lg font-semibold text-slate-900 mb-2">
            Die Lösung:{' '}
            <code className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-800 font-mono text-base">
              ai-transparency.json
            </code>
          </p>
          <p className="text-slate-700 mb-6">
            Der offene Standard für maschinenlesbare KI-Transparenz-Erklärungen — dokumentiert
            Ihren Policy-Layer in 2 Minuten.
          </p>
          <Link
            href="/check"
            className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center justify-center mx-auto"
          >
            Betroffen? Prüfen Sie jetzt
          </Link>
        </div>
      </div>
    </section>
  );
}

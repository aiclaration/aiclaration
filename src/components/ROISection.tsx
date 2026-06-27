import Link from 'next/link';
import { TrendingDown, Clock, ShieldCheck } from 'lucide-react';

const comparisons = [
  {
    icon: TrendingDown,
    label: 'Anwalt — Einmal-Gutachten',
    cost: '5.000–15.000 €',
    note: 'einmalig, Momentaufnahme zum Prüfzeitpunkt',
    highlight: false,
  },
  {
    icon: ShieldCheck,
    label: 'aiclaration Generator + Validator',
    cost: '0 €',
    note: 'kostenlos, ohne Anmeldung — sofort nutzbar',
    highlight: true,
  },
  {
    icon: Clock,
    label: 'Nichts tun',
    cost: 'bis 15 Mio. €',
    note: 'Bußgeld-Risiko Art. 99 Abs. 4 EU AI Act',
    highlight: false,
  },
];

export default function ROISection() {
  return (
    <section className="bg-white py-20 px-4 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide mb-3 text-center">
          ROI-Rechnung
        </p>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
          Was kostet Compliance — und was kostet Nicht-Compliance?
        </h2>
        <p className="text-lg text-slate-700 text-center mb-12 max-w-2xl mx-auto">
          Eine anwaltliche KI-Compliance-Erstprüfung kostet meist <strong>5.000–15.000 €</strong> einmalig.
          Der ai-transparency.json-Generator von aiclaration ist <strong>kostenlos</strong> — ohne Anmeldung.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {comparisons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`rounded-xl p-6 border ${
                  item.highlight
                    ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-600/10'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                {item.highlight && (
                  <span className="text-xs font-semibold bg-emerald-600 text-white px-3 py-1 rounded-full block w-fit mb-3">
                    Kostenlos verfügbar
                  </span>
                )}
                <Icon
                  className={`w-7 h-7 mb-3 ${item.highlight ? 'text-emerald-600' : 'text-slate-500'}`}
                  aria-hidden="true"
                />
                <p className="text-sm font-medium text-slate-600 mb-1">{item.label}</p>
                <p
                  className={`text-2xl font-bold mb-2 ${
                    item.highlight ? 'text-emerald-700' : 'text-slate-900'
                  }`}
                >
                  {item.cost}
                </p>
                <p className="text-xs text-slate-500">{item.note}</p>
              </div>
            );
          })}
        </div>

        {/* Hinweis auf geplante Auto-Checks */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong>Geplant:</strong> Automatische monatliche Re-Checks mit E-Mail-Alert bei
            Statusänderung (Starter-Plan, <strong>in Vorbereitung</strong>). So bleibt Ihre
            Dokumentation aktuell, ohne dass Sie manuell nachprüfen müssen.{' '}
            <Link href="/#newsletter" className="text-emerald-700 font-medium hover:underline">
              Auf die Warteliste vormerken →
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/generate"
            className="bg-emerald-600 text-emerald-100 font-semibold px-8 py-4 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center justify-center text-lg"
          >
            Kostenlos starten — kein Login nötig →
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            Dies ist kein Rechtsrat. Für rechtssichere Compliance-Beurteilung: Rechtsanwalt hinzuziehen.
          </p>
        </div>
      </div>
    </section>
  );
}

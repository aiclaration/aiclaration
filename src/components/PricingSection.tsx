import Link from 'next/link';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0 €',
    period: 'solange Free-Tier verfügbar',
    highlight: false,
    badge: null,
    features: [
      { text: 'ai-transparency.json Generator (Download)', included: true },
      { text: 'Validator-Checks ohne monatliches Kontingent', included: true },
      { text: 'Content-Labeling Snippet', included: true },
      { text: 'Managed-Hosting-Anleitung', included: true },
      { text: 'Monatliche Auto-Checks + E-Mail-Alert', included: false },
      { text: 'Verified Badge (SVG-Siegel für Website)', included: false },
    ],
    cta: { label: 'Kostenlos starten', href: '/generate' },
  },
  {
    name: 'Starter',
    price: '49 €',
    period: 'pro Monat (geplant)',
    highlight: true,
    badge: 'In Vorbereitung',
    features: [
      { text: 'Alles aus Free', included: true },
      { text: 'Monatliche Auto-Checks — Statusänderungen frühzeitig erkennen', included: true },
      { text: 'E-Mail-Alert bei Statusänderung', included: true },
      { text: 'Verified Badge — klickbares SVG-Siegel', included: true },
      { text: 'Hosted JSON-URL (Zero-Tech-Option)', included: true },
      { text: 'PDF-Audit-Report (SHA-256)', included: false },
    ],
    cta: { label: 'Auf Warteliste vormerken', href: '/#newsletter' },
  },
  {
    name: 'Pro',
    price: '99 €',
    period: 'pro Monat (geplant)',
    highlight: false,
    badge: 'In Vorbereitung',
    features: [
      { text: 'Alles aus Starter', included: true },
      { text: 'Wöchentliche Auto-Checks', included: true },
      { text: 'PDF-Audit-Report (SHA-256 Timestamp)', included: true },
      { text: 'API-Zugang', included: true },
      { text: 'Prioritäts-Support', included: true },
      { text: 'Agency-Dashboard (V2)', included: false },
    ],
    cta: { label: 'Auf Warteliste vormerken', href: '/#newsletter' },
  },
];

export default function PricingSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
          Transparente Preise
        </h2>
        <p className="text-lg text-slate-700 text-center mb-4 max-w-2xl mx-auto">
          Starten Sie kostenlos — upgraden Sie wenn Sie ein offizielles Siegel benötigen.
        </p>

        {/* ROI-Callout */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center mb-6">
          <p className="text-slate-800 text-sm">
            <strong>Warum monatliche Auto-Checks?</strong> EU-Regeln ändern sich. Neue KI-Tools kommen hinzu.
            Ihr Policy-Status kann jederzeit veralten — ohne dass Sie es merken. Der Starter-Plan prüft automatisch jeden Monat und alarmiert Sie sofort.
          </p>
        </div>

        {/* Pricing-Tabelle */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlight
                  ? 'border-emerald-600 shadow-lg shadow-emerald-600/10 bg-emerald-50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.badge && (
                <span className="text-xs font-semibold bg-emerald-600 text-white px-3 py-1 rounded-full self-start mb-4">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                <span className="text-slate-500 text-sm ml-1">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-sm">
                    {f.included ? (
                      <Check
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-slate-300 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    <span className={f.included ? 'text-slate-800' : 'text-slate-400'}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.cta.href}
                className={`font-semibold px-6 py-3 rounded-lg transition-all duration-150 min-h-11 flex items-center justify-center ${
                  plan.highlight
                    ? 'bg-emerald-600 text-emerald-100 hover:bg-emerald-700 active:scale-[0.98]'
                    : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Badge-Mockup */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-sm font-medium text-slate-700">So sieht das Verified Badge aus:</p>
          <svg
            width="240"
            height="80"
            viewBox="0 0 240 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="KI-Transparenz-Prozess dokumentiert — Badge-Vorschau"
          >
            <rect width="240" height="80" rx="8" fill="#1e293b" />
            {/* Lucide ShieldCheck icon paths */}
            <g transform="translate(16, 16)" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </g>
            <text
              x="60"
              y="32"
              fontFamily="system-ui, sans-serif"
              fontSize="13"
              fontWeight="600"
              fill="#d1fae5"
            >
              KI-Transparenz-Prozess
            </text>
            <text
              x="60"
              y="50"
              fontFamily="system-ui, sans-serif"
              fontSize="13"
              fontWeight="600"
              fill="#d1fae5"
            >
              dokumentiert ✓
            </text>
            <text
              x="60"
              y="66"
              fontFamily="system-ui, sans-serif"
              fontSize="10"
              fill="#64748b"
            >
              aiclaration.de · EU AI Act Art. 50(4)
            </text>
          </svg>
        </div>

        {/* Agency-Hinweis */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-slate-900 mb-1">Agency-Plan (V2)</p>
            <p className="text-slate-600 text-sm">
              299 €/Monat · bis 50 Domains · White-Label-Badge · Reseller-Dashboard.
              Verfügbar nach Market-Validation.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="font-semibold text-slate-900 mb-1">Presse & Medien</p>
            <p className="text-slate-600 text-sm">
              Sie möchten über aiclaration oder den EU AI Act berichten?{' '}
              <a
                href="mailto:info@aiclaration.de"
                className="text-emerald-600 hover:underline"
              >
                Kontaktieren Sie uns für O-Töne
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

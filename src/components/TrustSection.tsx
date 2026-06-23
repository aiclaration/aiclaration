import { ShieldCheck } from 'lucide-react';

const badges = [
  'Privacy-by-Architecture — keine personenbezogene Datenspeicherung',
  'EU AI Act Art. 50(4) — Policy-Layer dokumentiert',
  'EU Code of Practice on AI Transparency — finalisiert 10.06.2026',
  'Made in Germany — Hosting in der EU (Nürnberg)',
  'Open Standard — maschinenlesbar, überprüfbar',
];

export default function TrustSection() {
  return (
    <section className="bg-slate-900 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Vertrauen durch Transparenz
        </h2>
        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
          aiclaration wurde nach dem Prinzip Privacy-by-Architecture entwickelt — Ihre Daten
          verlassen nie Ihren Browser.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {badges.map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 bg-slate-800 rounded-xl p-5 text-left"
            >
              <ShieldCheck
                className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-emerald-100 text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-left">
          <p className="text-slate-400 text-sm">
            <strong className="text-slate-300">Rechtlicher Hinweis (RDG-Pflicht):</strong> Dies ist
            kein Rechtsrat. aiclaration dokumentiert Ihren organisatorischen KI-Transparenz-Prozess
            (Policy-Layer). Für rechtsverbindliche Compliance-Beurteilung wenden Sie sich an einen
            Rechtsanwalt.
          </p>
        </div>
      </div>
    </section>
  );
}

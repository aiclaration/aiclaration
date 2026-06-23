import Link from 'next/link';
import DeadlineCountdown from './DeadlineCountdown';

export default function HeroSection() {
  return (
    <section className="bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <DeadlineCountdown />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          KI-Transparenz dokumentieren —{' '}
          <span className="text-emerald-600">vor August 2026</span>
        </h1>

        <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
          ai-transparency.json Generator + Validator. Kostenlos. Ohne Registrierung.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/generate"
            className="bg-emerald-600 text-emerald-100 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 inline-flex items-center justify-center"
          >
            Jetzt Policy erstellen
          </Link>
          <Link
            href="/check"
            className="bg-slate-100 text-slate-800 font-medium px-8 py-3 rounded-lg border border-slate-300 hover:bg-slate-200 transition-all duration-150 min-h-11 inline-flex items-center justify-center"
          >
            Bin ich betroffen?
          </Link>
        </div>

        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Bußgeld bis 15 Mio. € oder 3% Umsatz bei Verstoß — dokumentieren Sie Ihren Prozess jetzt.
        </p>
      </div>
    </section>
  );
}

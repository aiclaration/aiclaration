import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Anmeldung bestätigt | aiclaration',
  description: 'Ihre Newsletter-Anmeldung wurde erfolgreich bestätigt.',
  robots: { index: false, follow: false },
};

export default function BestaetigtPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" aria-hidden="true" />
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Anmeldung bestätigt!</h1>
          <p className="text-slate-700 mb-8">
            Willkommen. Sie erhalten ab jetzt unseren kostenlosen Newsletter zu EU AI Act Updates,
            neuen Features und Deployment-Anleitungen.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11"
          >
            Jetzt ai-transparency.json erstellen →
          </Link>
          <div className="mt-4">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';

export const metadata: Metadata = {
  title: 'aiclaration — KI-Transparenz dokumentieren | EU AI Act Art. 50(4)',
  description:
    'ai-transparency.json Generator + Validator. EU AI Act Art. 50(4) Compliance. Kostenlos. Ohne Registrierung. Made in Germany.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-emerald-600 focus:text-white focus:p-4 focus:rounded"
        >
          Direkt zum Hauptinhalt
        </a>
        <Header />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | aiclaration',
  robots: { index: false, follow: false },
};

// Rechtsdaten ausgefuellt 2026-06-22. OFFEN/Risiko: c/o-Postflex ladungsfaehige Anschrift? (siehe DASHBOARD)
// Rechtsgrundlage: §5 DDG · §18 Abs. 2 MStV
// Vollstaendiges Template: 02_Templates/Impressum_Template.md

export default function ImpressumPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16" id="main-content">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>
      <section className="space-y-6 text-sm leading-relaxed text-gray-700">
        <div>
          <p className="font-semibold text-gray-900">Angaben gemäß § 5 DDG</p>
          <address className="not-italic mt-2">
            Stephan Ochmann<br />
            c/o Postflex PFX-295-246<br />
            Emsdettener Straße 10<br />
            48268 Greven<br />
            Deutschland
          </address>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Kontakt</p>
          <p className="mt-1">
            Telefon: +49 (0) 2363 8072515<br />
            E-Mail: <a href="mailto:info@aiclaration.de" className="underline">info@aiclaration.de</a>
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </p>
          <p className="mt-1">Stephan Ochmann, c/o Postflex PFX-295-246, Emsdettener Straße 10, 48268 Greven</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Streitbeilegung</p>
          <p className="mt-1">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
            vor einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Haftung für Inhalte</p>
          <p className="mt-1">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
            diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Urheberrecht</p>
          <p className="mt-1">
            Die durch den Seitenbetreiber erstellten Inhalte unterliegen dem deutschen
            Urheberrecht. Downloads und Kopien sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet.
          </p>
        </div>
        <p className="text-xs text-gray-400 pt-8 border-t">
          Stand: 22.06.2026 &mdash; Stephan Ochmann &mdash;{' '}
          <a href="https://aiclaration.de/impressum" className="underline">Impressum</a>
          {' | '}
          <a href="https://aiclaration.de/datenschutz" className="underline">Datenschutz</a>
          {' | '}
          <a href="https://aiclaration.de/agb" className="underline">AGB</a>
          {' | '}
          <a href="https://aiclaration.de/nutzungsbedingungen" className="underline">Nutzungsbedingungen</a>
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen | aiclaration',
  robots: { index: false, follow: false },
};

// Rechtsdaten ausgefuellt 2026-06-22 (Session 06).
// Rechtsgrundlage: BGB · RDG · UWG § 7 (Newsletter = Einwilligung, kein § 327-Tauschvertrag)
// Vollstaendiges Template: 02_Templates/Nutzungsbedingungen_Template.md
// HINWEIS: Gilt fuer V1 Freebie (kein Paid-Tier) -- fuer Paid: AGB verwenden

export default function NutzungsbedingungenPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Nutzungsbedingungen &amp; Haftungsausschluss</h1>
      <p className="text-sm text-gray-500 mb-8">Gültig für: KI-Transparenz-Generator (kostenlos)</p>
      <section className="space-y-8 text-sm leading-relaxed text-gray-700">
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 1 Gegenstand der Nutzung</h2>
          <p>
            Der &bdquo;KI-Transparenz-Generator&ldquo; wird kostenlos und ohne Registrierung
            bereitgestellt. aiclaration räumt Ihnen ein einfaches, nicht übertragbares Recht ein,
            die erzeugten Dateien für Ihren eigenen Geschäftsbetrieb zu nutzen. Eine Überlassung
            personenbezogener Daten ist für die Nutzung nicht erforderlich.
          </p>
          <p className="mt-2">
            Ein etwaiger Newsletter erfolgt unabhängig von der Tool-Nutzung ausschließlich auf
            Grundlage Ihrer ausdrücklichen Einwilligung (§ 7 UWG, Double-Opt-In) und ist jederzeit
            mit Wirkung für die Zukunft abbestellbar.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            § 2 Haftungsausschluss für Berechnungen &amp; Ergebnisse
          </h2>
          <p>
            Die durch aiclaration erstellten Berechnungen werden auf Basis der vom Nutzer
            eingegebenen Daten und der zum Zeitpunkt der Erstellung gültigen Fassung von
            der EU-KI-Verordnung (Verordnung (EU) 2024/1689, &bdquo;EU AI Act&ldquo;), insbesondere Art. 50 erstellt.
          </p>
          <ul className="mt-3 space-y-2 list-none">
            <li>
              <strong>Keine Gewähr:</strong> aiclaration übernimmt keine Gewähr für die
              Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Berechnungen.
            </li>
            <li>
              <strong>Kein Rechtsgutachten:</strong> Die Ergebnisse stellen kein Rechtsgutachten,
              keine Rechtsberatung und keine steuerliche Beratung im Sinne des RDG dar.
            </li>
            <li>
              <strong>Eigenes Risiko:</strong> Jede geschäftliche Entscheidung auf Basis der
              aiclaration-Ergebnisse erfolgt auf alleiniges Risiko des Nutzers.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 3 Nutzungsbeschränkungen</h2>
          <p>Die Ergebnisse dürfen ausschließlich für den eigenen Geschäftsbetrieb verwendet werden. Untersagt sind:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Weitergabe an Dritte oder kommerzielle Weiterveräußerung</li>
            <li>Automatisierte Massenabfragen / Scraping</li>
            <li>Nutzung zu militärischen Zwecken oder Menschenrechtsverletzungen</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            § 4 Haftungsbeschränkung &amp; Verfügbarkeit
          </h2>
          <p>
            Da es sich beim KI-Transparenz-Generator um einen unentgeltlichen Service handelt,
            haftet Stephan Ochmann nur für Schäden, die auf Vorsatz oder grober
            Fahrlässigkeit beruhen. Eine Haftung für entgangenen Gewinn oder mittelbare
            Schäden ist ausgeschlossen. Es besteht kein Anspruch auf dauerhafte
            Verfügbarkeit des Dienstes.
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

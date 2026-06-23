import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB | aiclaration',
  robots: { index: false, follow: false },
};

// Rechtsdaten ausgefuellt 2026-06-22 (Session 06). OFFEN: Gerichtsstand = "Deutschland" (Stadt praeziser); c/o-Anschrift (siehe DASHBOARD).
// Rechtsgrundlage: BGB * DDG * DSGVO * RDG
// Vollstaendiges Template: 02_Templates/AGB_Template.md
// RDG-Pflicht: § 2 Abs. 3 (Kein-Rechtsrat-Hinweis) niemals entfernen!
// § 4 Paid ist auskommentiert -- aktivieren wenn Paid-Version live

export default function AgbPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>
      <section className="space-y-8 text-sm leading-relaxed text-gray-700">
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 1 Geltungsbereich</h2>
          <p>
            (1) Diese AGB gelten für alle Verträge zwischen Stephan Ochmann, c/o Postflex PFX-295-246, Emsdettener Straße 10, 48268 Greven
            (nachfolgend &bdquo;Anbieter&ldquo;) und dem Nutzer über die Nutzung von
            aiclaration (aiclaration.de).
          </p>
          <p className="mt-2">
            (2) aiclaration richtet sich an Unternehmer im Sinne des § 14 BGB. Verbraucher
            im Sinne des § 13 BGB sind von der Nutzung ausgeschlossen.
          </p>
          <p className="mt-2">(3) Entgegenstehende AGB des Kunden werden nicht anerkannt.</p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 2 Leistungsbeschreibung</h2>
          <p>
            (1) aiclaration ist ein Self-Service-Tool, das strukturierte Berechnungen und
            Dokumentationsgrundlagen gemäß der EU-KI-Verordnung (Verordnung (EU) 2024/1689, &bdquo;EU AI Act&ldquo;), insbesondere Art. 50 erstellt.
          </p>
          <p className="mt-2">
            (2) Der Dienst umfasst in V1:{' '}
            <strong>Freebie</strong> &mdash; ein Self-Service-Generator für eine maschinenlesbare ai-transparency.json-Datei nebst Betroffenheits-Check zur KI-Transparenzpflicht nach EU AI Act Art. 50 (kostenlos).
          </p>
          {/* TODO: Paid-Version in § 2 Abs. 2 ergänzen wenn aktiv */}
          <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-amber-900">
            <p className="font-semibold mb-1">
              (3) Kein Rechtsrat
            </p>
            <p>
              aiclaration erstellt Berechnungsgrundlagen &mdash;{' '}
              <strong>kein Rechtsgutachten, keine Rechtsberatung</strong> im Sinne des RDG.
              Die Ergebnisse dienen als Ausgangsbasis für die eigene Compliance-Prüfung.
              Die finale rechtliche Bewertung obliegt dem Kunden und seinem Rechtsberater.
            </p>
          </div>
          <p className="mt-2">
            (4) Der Anbieter behält sich vor, den Dienst jederzeit zu ändern oder einzustellen.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            § 3 Kostenlose Inhalte (Tauschvertrag § 327 BGB)
          </h2>
          <p>(1) Das Freebie wird kostenlos zur Verfügung gestellt.</p>
          <p className="mt-2">
            (2) Mit der Anforderung des Freebies schließen Sie einen Vertrag über die
            Bereitstellung digitaler Inhalte gegen Überlassung personenbezogener Daten
            (§ 327 BGB). Als Gegenleistung erklären Sie sich bereit, über aiclaration per
            E-Mail informiert zu werden.
          </p>
          <p className="mt-2">
            (3) Die Abmeldung ist jederzeit möglich und beendet diesen Vertrag.
            Ein Anspruch auf dauerhaften Zugang zum Freebie besteht nicht.
          </p>
        </div>
        {/*
          TODO: § 4 Paid aktivieren wenn Paid-Version live (aus AGB_Template.md kopieren):
          - Polar als MoR
          - Preise zzgl. gesetzlicher USt
          - Widerrufsrecht § 356 Abs. 5 BGB
        */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 4 Nutzungsbeschränkungen</h2>
          <p>Ergebnisse ausschließlich für den eigenen Geschäftsbetrieb. Untersagt sind:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Weitergabe an Dritte oder kommerzielle Weiterveräußerung</li>
            <li>Automatisierte Massenabfragen / Scraping</li>
            <li>Reverse Engineering der Berechnungslogik</li>
            <li>Nutzung zu militärischen Zwecken oder Menschenrechtsverletzungen</li>
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 5 Haftung</h2>
          <p>
            (1) Unbeschränkte Haftung bei Vorsatz, grober Fahrlässigkeit sowie bei
            Schäden aus der Verletzung von Leben, Körper oder Gesundheit.
          </p>
          <p className="mt-2">
            (2) Bei leichter Fahrlässigkeit nur bei Verletzung wesentlicher Vertragspflichten,
            begrenzt auf den vertragstypisch vorhersehbaren Schaden.
          </p>
          <p className="mt-2">
            (3) <strong>Haftungsausschluss Berechnungsergebnisse:</strong> Da aiclaration
            Berechnungsgrundlagen &mdash; kein Rechtsgutachten &mdash; erstellt, übernimmt
            der Anbieter keine Haftung für Entscheidungen auf Basis der Ergebnisse.
          </p>
          <p className="mt-2">
            (4) Für kostenlose Leistungen (Freebie) haftet der Anbieter nur bei Vorsatz
            und grober Fahrlässigkeit.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 6 Datenschutz</h2>
          <p>
            Die Erhebung personenbezogener Daten erfolgt gemäß unserer{' '}
            <a href="https://aiclaration.de/datenschutz" className="underline">
              Datenschutzerklärung
            </a>.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            § 7 Einsatz von KI-Werkzeugen (EU AI Act)
          </h2>
          {/*
            Variante A (aktiv): statische Texte, keine Laufzeit-KI-Ausgaben.
            Variante B nur aktivieren wenn aiclaration zur Laufzeit LLM-Ausgaben erzeugt
            (Art. 50 EU AI Act Kennzeichnungspflicht gilt dann zwingend).
          */}
          <p>
            (1) Texte und Inhalte dieser Website wurden mit Unterstützung von
            KI-Werkzeugen erstellt und sind als statische Inhalte eingebunden.
            Eine Kennzeichnungspflicht nach Art. 50 EU AI Act besteht hierfür nicht.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-2">§ 8 Schlussbestimmungen</h2>
          <p>(1) Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG).</p>
          <p className="mt-2">
            (2) Gerichtsstand ist &mdash; soweit gesetzlich zulässig &mdash; Greven.
          </p>
          <p className="mt-2">
            (3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit
            der übrigen Bestimmungen unberührt.
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

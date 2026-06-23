import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | aiclaration',
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-3xl mx-auto px-4 py-16" id="main-content">
        <h1 className="text-4xl font-bold text-slate-900 mb-12 tracking-tight">Datenschutzerklärung</h1>
        <div className="space-y-16">

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              1. Datenschutz auf einen Blick
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Allgemeine Hinweise</h3>
                <p className="text-slate-600 leading-7">
                  Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen
                  Daten passiert, wenn Sie diese Website besuchen. Wir setzen keine Analyse- oder
                  Werbetracker ein. Es werden keine Daten an soziale Netzwerke übertragen.{' '}
                  <strong className="text-slate-800">Kein Upload persönlicher Dokumente erforderlich</strong>
                  {' '}&#8212; aiclaration verarbeitet keine hochgeladenen Geschäftsdokumente.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">SSL-/TLS-Verschlüsselung</h3>
                <p className="text-slate-600 leading-7">
                  Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung.
                  Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                  von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem
                  Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Lokale Verarbeitung (Check &amp; Generator)</h3>
                <p className="text-slate-600 leading-7">
                  Betroffenheits-Check und Generator führen alle Berechnungen{' '}
                  <strong className="text-slate-800">lokal in Ihrem Browser</strong>{' '}
                  durch. Ihre dort eingegebenen Daten verlassen Ihr Gerät nicht und werden nicht
                  auf Servern gespeichert. Serververbindungen entstehen nur in zwei Fällen: beim
                  optionalen E-Mail-Versand (nur die E-Mail-Adresse) und bei Nutzung des Validators
                  (siehe Abschnitt 9).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              2. Verantwortliche Stelle
            </h2>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <p className="text-slate-800 font-medium">Stephan Ochmann</p>
              <address className="not-italic text-slate-600 leading-relaxed mt-1">
                c/o Postflex PFX-295-246<br />
                Emsdettener Straße 10<br />
                48268 Greven<br />
                Deutschland
              </address>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1">
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">E-Mail:</span>{' '}
                  <a href="mailto:info@aiclaration.de" className="underline hover:text-slate-900 transition-colors">info@aiclaration.de</a>
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              3. Datenerfassung auf dieser Website
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Freebie / Warteliste (&#167; 327 BGB &#8212; Tauschvertrag)
                </h3>
                <p className="text-slate-600 leading-7 mb-4">
                  Wenn Sie das kostenlose Freebie anfordern, schließen wir mit Ihnen einen Vertrag
                  über die Bereitstellung digitaler Inhalte gegen Überlassung personenbezogener Daten
                  (gemäß &#167; 327 BGB). Als Gegenleistung für den kostenlosen Zugang informieren
                  wir Sie gelegentlich per E-Mail über aiclaration.
                </p>
                <div className="bg-slate-100 p-4 rounded text-base text-slate-700 leading-relaxed space-y-2">
                  <p><strong>Gespeicherte Daten:</strong> E-Mail-Adresse, Bestätigungsstatus (Double-Opt-In), Registrierungszeitpunkt.</p>
                  <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung nach &#167; 327 BGB).</p>
                  <p><strong>Speicherdauer &amp; Widerruf:</strong> Bis zur Kündigung. Bei Abmeldung Löschung innerhalb 30 Tagen.
                    Widerruf jederzeit per Abmeldelink oder an{' '}
                    <a href="mailto:info@aiclaration.de" className="underline">info@aiclaration.de</a>.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Server-Log-Dateien (Hetzner)</h3>
                <p className="text-slate-600 leading-7 mb-3">
                  Unser Hosting-Anbieter Hetzner Online GmbH erhebt automatisch technisch notwendige Informationen:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2 mb-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer-URL</li>
                  <li>IP-Adresse</li>
                  <li>Uhrzeit der Serveranfrage</li>
                </ul>
                <div className="bg-slate-100 p-4 rounded text-base text-slate-700 leading-relaxed">
                  <p><strong>Speicherdauer:</strong> 7 Tage. <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
                  Hosting ausschließlich in der EU (Deutschland), kein Drittstaat-Transfer. AVV gemäß Art. 28 DSGVO liegt vor.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              4. Cookies
            </h2>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Analyse- &amp; Tracking-Cookies</h3>
              <p className="text-slate-600 leading-7">
                Wir setzen keine Analyse-, Werbe- oder Tracking-Cookies ein. Es werden keine Daten
                zu Werbezwecken an Dritte übermittelt. Ein Cookie-Banner ist daher nicht erforderlich.
              </p>
            </div>
            {/* TODO: Falls Auth vorhanden: Session-Cookie-Abschnitt aus Datenschutz_Template.md aktivieren */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              5. Hosting &amp; Infrastruktur (Hetzner)
            </h2>
            <p className="text-slate-600 leading-7 mb-3">
              aiclaration wird auf Hetzner Cloud (Standort: Nürnberg, Deutschland) betrieben.
              Alle Daten werden ausschließlich innerhalb der Europäischen Union verarbeitet und gespeichert.
              Es erfolgt keine Datenübermittlung in Drittstaaten durch das Hosting.
            </p>
            <p className="text-sm text-slate-500">
              Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland.
              AVV gemäß Art. 28 DSGVO liegt vor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              6. Analytics
            </h2>
            <p className="text-slate-600 leading-7">
              Wir setzen kein Website-Tracking und keine Analyse-Tools ein. Es werden keine
              personenbezogenen Daten zu Analysezwecken erhoben oder an Dritte übermittelt.
            </p>
            {/* TODO: Falls Umami aktiviert: Umami-Abschnitt aus Datenschutz_Template.md §6 einfügen */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              7. E-Mail-Versand (Brevo)
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              Für den Versand von E-Mails (Double-Opt-In-Bestätigung, Freebie, gelegentliche Updates)
              nutzen wir Brevo (Sendinblue SAS, Paris, Frankreich). An Brevo werden übermittelt:
              E-Mail-Adresse, Bestätigungsstatus, Quellkanal der Anmeldung. Ihre Daten werden auf EU-Servern gespeichert.
            </p>
            <p className="text-sm text-slate-500">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung nach &#167; 327 BGB).
              AVV gemäß Art. 28 DSGVO ist abgeschlossen. Kein Drittstaat-Transfer.
            </p>
            {/* TODO: Polar-Abschnitt aus Datenschutz_Template.md aktivieren wenn Paid-Version live */}
            {/* TODO: Supabase-Abschnitt aus Datenschutz_Template.md aktivieren wenn V2 mit DB */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              8. Briefkorrespondenz (Postflex)
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              Für physische Briefpost an die im Impressum genannte Adresse nutzen wir den
              Adressservice der Postflex GmbH &amp; Co. KG, Emsdettener Straße 10, 48268 Greven.
              Postflex empfängt eingehende Briefsendungen stellvertretend und übermittelt
              diese an uns. Dabei verarbeitet Postflex personenbezogene Daten der Absender
              (z.&nbsp;B. Namen und Absenderadressen auf Briefumschlägen).
            </p>
            <p className="text-sm text-slate-500">
              <strong>Rolle:</strong> Postflex ist Auftragsverarbeiter gemäß Art. 28 DSGVO.
              Ein AVV ist abgeschlossen. <strong>Rechtsgrundlage:</strong>{' '}
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer erreichbaren
              Geschäftsadresse). Postflex verarbeitet die Daten nicht für eigene Zwecke.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              9. Berechnungen im Browser &amp; Validator
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r mb-4">
              <p className="text-slate-700 text-base leading-relaxed">
                <strong>Betroffenheits-Check und Generator führen alle Berechnungen vollständig lokal in Ihrem Browser durch.</strong>{' '}
                Ihre dort eingegebenen Daten verlassen Ihr Gerät nicht und werden nicht auf Servern
                gespeichert.
              </p>
            </div>
            <p className="text-slate-600 leading-7 mb-3">
              <strong className="text-slate-800">Validator (Ausnahme):</strong> Wenn Sie den Validator
              nutzen, wird die von Ihnen eingegebene Website-Adresse (URL) an unseren Server
              übermittelt. Dieser ruft unter der angegebenen Adresse die Datei
              {' '}/.well-known/ai-transparency.json ab und prüft sie. Die URL und das Prüfergebnis
              werden ausschließlich für die Dauer der Anfrage verarbeitet und{' '}
              <strong className="text-slate-800">nicht gespeichert</strong>. Zur Missbrauchsabwehr
              (Begrenzung der Anfragen pro Minute) wird Ihre IP-Adresse kurzzeitig im Arbeitsspeicher
              verarbeitet.
            </p>
            <div className="bg-slate-100 p-4 rounded text-base text-slate-700 leading-relaxed">
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an der Bereitstellung und am Schutz des Dienstes). Keine Speicherung, kein
                Drittstaat-Transfer.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              10. Einsatz von KI-Werkzeugen (EU AI Act Art. 50)
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              Texte und UI-Inhalte dieser Website wurden mit Unterstützung von KI-Werkzeugen erstellt
              und sind als statische Inhalte eingebunden. aiclaration erzeugt zur Laufzeit{' '}
              <strong className="text-slate-800">keine KI-generierten Ausgaben</strong>{' '}
              für Endnutzer. Die Berechnungslogik basiert ausschließlich auf deterministischen
              Regelprüfungen &#8212; keine Black-Box, keine Halluzinationen.
            </p>
            <div className="bg-slate-100 p-4 rounded text-base text-slate-700 leading-relaxed">
              <p>
                <strong>Klassifizierung nach EU AI Act:</strong>{' '}
                aiclaration ist kein Hochrisiko-KI-System im Sinne von Anhang III der KI-Verordnung
                (EU) 2024/1689. Eine Kennzeichnungspflicht nach Art. 50 Abs. 1 EU AI Act besteht
                für die statischen Website-Inhalte nicht.
              </p>
            </div>
            {/*
              TODO: Variante B aktivieren wenn aiclaration LLM-Ausgaben dynamisch erzeugt:
              aiclaration erzeugt Ausgaben mithilfe von KI-Sprachmodellen. Gemäß Art. 50 EU AI Act
              werden KI-generierte Inhalte für Endnutzer als solche gekennzeichnet.
            */}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">
              11. Ihre Rechte
            </h2>
            <p className="text-slate-600 leading-7 mb-4">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft, Berichtigung, Einschränkung
              und Löschung Ihrer gespeicherten personenbezogenen Daten. Wenden Sie sich dazu an{' '}
              <a href="mailto:info@aiclaration.de" className="underline hover:text-slate-900 transition-colors">info@aiclaration.de</a>.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-slate-600 text-base mb-8">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Auskunft (Art. 15 DSGVO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Berichtigung (Art. 16 DSGVO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Löschung (Art. 17 DSGVO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Einschränkung (Art. 18 DSGVO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Datenübertragbarkeit (Art. 20 DSGVO)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                Widerspruch (Art. 21 DSGVO)
              </li>
            </ul>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r mb-4">
              <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-2">
                Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                Soweit die Verarbeitung Ihrer personenbezogenen Daten auf einer Einwilligung beruht,
                haben Sie das Recht, diese jederzeit zu widerrufen. Die Rechtmäßigkeit der bis zum
                Widerruf erfolgten Verarbeitung bleibt davon unberührt. Widerruf per Abmeldelink
                in unseren E-Mails oder an{' '}
                <a href="mailto:info@aiclaration.de" className="underline">info@aiclaration.de</a>.
              </p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r">
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide mb-2">
                Beschwerderecht
              </h3>
              <p className="text-slate-700 text-base leading-relaxed">
                Sie können sich bei der zuständigen Datenschutzaufsichtsbehörde beschweren.
                Wir empfehlen, sich zunächst direkt an uns zu wenden:{' '}
                <a href="mailto:info@aiclaration.de" className="underline">info@aiclaration.de</a>.
              </p>
            </div>
          </section>

        </div>
        <div className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          Stand: 23.06.2026 &#8212; Stephan Ochmann
        </div>
      </main>
    </div>
  );
}

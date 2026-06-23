import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ai-transparency.json Spezifikation v1.0 | aiclaration',
  description:
    'Die offene Spezifikation für ai-transparency.json — maschinenlesbarer Standard für KI-Transparenz-Erklärungen gemäß EU AI Act Art. 50(4). Analog zu robots.txt und security.txt.',
};

const EXAMPLE_JSON = `{
  "version": "1.0",
  "last_updated": "2026-08-01",
  "ai_content_policy": {
    "uses_ai_content": true,
    "content_types": ["blog_posts", "newsletter", "marketing_text"],
    "labeling_method": "inline_disclosure",
    "human_review": true,
    "tools_used": ["ChatGPT", "Claude"]
  },
  "contact": "datenschutz@ihrefirma.de",
  "legal_basis": "EU AI Act Art. 50(4)"
}`;

const FIELDS = [
  {
    field: 'version',
    type: 'string',
    required: true,
    description: 'Version der Spezifikation. Aktuell: "1.0"',
  },
  {
    field: 'last_updated',
    type: 'string (date)',
    required: true,
    description: 'Datum der letzten Aktualisierung im Format YYYY-MM-DD',
  },
  {
    field: 'ai_content_policy.uses_ai_content',
    type: 'boolean',
    required: true,
    description: 'true wenn das Unternehmen KI zur Content-Erstellung einsetzt',
  },
  {
    field: 'ai_content_policy.content_types',
    type: 'array<string>',
    required: false,
    description:
      'Welche Content-Typen mit KI erstellt werden. Erlaubte Werte: blog_posts, newsletter, pr_texts, social_media, product_descriptions, marketing_text, other',
  },
  {
    field: 'ai_content_policy.labeling_method',
    type: 'string',
    required: false,
    description:
      'Wie KI-Inhalte gekennzeichnet werden. Werte: inline_disclosure, metadata_tag, planned, none',
  },
  {
    field: 'ai_content_policy.human_review',
    type: 'boolean',
    required: false,
    description: 'true wenn ein Mensch KI-Content vor Veröffentlichung redaktionell prüft',
  },
  {
    field: 'ai_content_policy.tools_used',
    type: 'array<string>',
    required: false,
    description: 'Liste der eingesetzten KI-Werkzeuge (z. B. ["ChatGPT", "Claude", "Copilot"])',
  },
  {
    field: 'contact',
    type: 'string (email)',
    required: true,
    description: 'Öffentliche E-Mail-Adresse für KI-Transparenz-Anfragen',
  },
  {
    field: 'legal_basis',
    type: 'string',
    required: true,
    description: 'Rechtliche Grundlage. Empfohlen: "EU AI Act Art. 50(4)"',
  },
];

export default function SpecPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-3xl mx-auto px-4 py-16" id="main-content">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-8 py-2 min-h-11"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Zurück zur Startseite
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Open Standard · v1.0 · 2026-06-19
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            ai-transparency.json Spezifikation
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed">
            Offener Standard für maschinenlesbare KI-Transparenz-Erklärungen im Web —
            analog zu <code className="font-mono text-base bg-slate-100 px-1 rounded">robots.txt</code> und{' '}
            <code className="font-mono text-base bg-slate-100 px-1 rounded">security.txt</code>.
          </p>
        </div>

        {/* Was ist ai-transparency.json */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Was ist ai-transparency.json?</h2>
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
            <p>
              <code className="font-mono text-sm bg-slate-100 px-1 rounded">ai-transparency.json</code> ist
              eine standardisierte JSON-Datei, die Unternehmen unter{' '}
              <code className="font-mono text-sm bg-slate-100 px-1 rounded">
                /.well-known/ai-transparency.json
              </code>{' '}
              auf ihrer Website ablegen. Sie beschreibt maschinenlesbar, wie das Unternehmen
              KI-generierte Inhalte handhabt.
            </p>
            <p>
              Das Format folgt dem <strong>RFC 5785 /.well-known/ URI-Standard</strong> (IANA) und
              ist konzipiert als Policy-Layer-Nachweis gemäß EU AI Act Art. 50(4) — nicht als
              Ersatz für die Textkennzeichnung einzelner Artikel (Content-Layer).
            </p>
          </div>
        </section>

        {/* Platzierung */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Platzierung der Datei</h2>
          <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm text-slate-300 mb-4">
            <p className="text-slate-500 mb-1"># Platzierung auf dem Webserver</p>
            <p>https://ihredomain.de/.well-known/ai-transparency.json</p>
            <p className="mt-4 text-slate-500"># Content-Type Pflicht</p>
            <p>Content-Type: application/json</p>
          </div>
          <p className="text-sm text-slate-600">
            Der MIME-Type <code className="font-mono text-xs bg-slate-100 px-1 rounded">application/json</code>{' '}
            ist beim Ausliefern der Datei zu setzen. Viele Webserver tun dies automatisch für{' '}
            <code className="font-mono text-xs bg-slate-100 px-1 rounded">.json</code>-Dateien.
          </p>
        </section>

        {/* Beispiel */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Beispiel</h2>
          <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm text-slate-300 overflow-auto">
            <pre>{EXAMPLE_JSON}</pre>
          </div>
          <div className="mt-4 flex gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center bg-emerald-600 text-emerald-100 font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm min-h-11"
            >
              Eigene Datei generieren →
            </Link>
            <Link
              href="/validate"
              className="inline-flex items-center bg-white text-slate-800 font-medium px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors text-sm min-h-11"
            >
              Bestehende Datei validieren
            </Link>
          </div>
        </section>

        {/* Felder-Referenz */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Felder-Referenz</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700 rounded-tl-lg">Feld</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Typ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Pflicht</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700 rounded-tr-lg">Beschreibung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FIELDS.map((f) => (
                  <tr key={f.field} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-emerald-700">
                        {f.field}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{f.type}</td>
                    <td className="px-4 py-3">
                      {f.required ? (
                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded">
                          Pflicht
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Regulatorischer Hintergrund */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Regulatorischer Hintergrund</h2>
          <div className="space-y-4 text-slate-700">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <p className="font-semibold text-slate-900 mb-2">EU AI Act Art. 50(4)</p>
              <p className="text-sm">
                Betreiber von KI-Systemen, die Texte für die öffentliche Information generieren,
                müssen sicherstellen, dass deren Ausgaben maschinenlesbar als KI-generiert
                gekennzeichnet sind. Ausnahme: wenn eine natürliche Person redaktionell
                verantwortlich ist und den Inhalt vollständig geprüft hat. Gilt ab August 2026.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="font-semibold text-slate-900 mb-2">EU Code of Practice on AI-Generated Content</p>
              <p className="text-sm">
                Freiwilliger Branchenstandard der EU AI Office (finalisiert 10.06.2026). Stärkt die
                Erwartung an maschinenlesbare KI-Transparenz-Erklärungen. ai-transparency.json erfüllt
                den technischen Gedanken dieses Standards.
              </p>
            </div>
          </div>
        </section>

        {/* Policy-Layer vs Content-Layer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Policy-Layer vs. Content-Layer</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
            <p className="font-semibold mb-2">Wichtig: ai-transparency.json ist der Policy-Layer</p>
            <p>
              Art. 50(4) erfordert zwei Ebenen: (1) <strong>Policy-Layer</strong> — dokumentierter
              Prozess (ai-transparency.json) und (2) <strong>Content-Layer</strong> — Kennzeichnung
              jedes einzelnen KI-generierten Texts direkt im Content. ai-transparency.json löst nur
              den Policy-Layer. Den Content-Layer müssen Sie selbst umsetzen.
            </p>
          </div>
        </section>

        {/* IANA + Lizenz */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Standard & Lizenz</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <strong>Einreichung:</strong> ai-transparency.json ist zur Registrierung als{' '}
              <code className="font-mono text-xs bg-slate-100 px-1 rounded">/.well-known/</code>{' '}
              URI bei der IANA (RFC 5785) eingereicht.
            </p>
            <p>
              <strong>Lizenz:</strong> Die Spezifikation ist offen und frei nutzbar. Implementierungen
              sind ausdrücklich erwünscht — auch ohne Nutzung von aiclaration als Tool.
            </p>
            <p>
              <strong>Versionierung:</strong> Rückwärtskompatible Erweiterungen werden als 1.x
              veröffentlicht. Breaking Changes erhöhen die Major-Version.
            </p>
            <a
              href="https://github.com/aiclaration"
              className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-medium"
              target="_blank"
              rel="noreferrer"
            >
              GitHub — Spec-Repository
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* RDG-Disclaimer */}
        <div className="bg-slate-100 rounded-xl p-5 text-xs text-slate-500">
          Dies ist kein Rechtsrat. ai-transparency.json ist ein technisches Dokumentationsformat.
          Für rechtssichere Compliance-Beurteilung wenden Sie sich an einen Rechtsanwalt.
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download, CheckCircle, Info } from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 'done';

interface FormData {
  usesAi: boolean | null;
  contentTypes: string[];
  labelingMethod: string;
  humanReview: boolean | null;
  humanReviewChoice: string; // 'always' | 'partial' | 'no' — keeps which option is visibly selected
  contactEmail: string;
}

const CONTENT_TYPE_OPTIONS = [
  { value: 'blog_posts', label: 'Blogbeiträge' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'pr_texts', label: 'PR-Texte / Pressemitteilungen' },
  { value: 'social_media', label: 'Social Media Beiträge' },
  { value: 'product_descriptions', label: 'Produktbeschreibungen' },
  { value: 'marketing_text', label: 'Marketing-Texte' },
  { value: 'other', label: 'Sonstiges' },
];

const LABELING_OPTIONS = [
  { value: 'inline_disclosure', label: 'Ja — inline disclosure (z. B. „Dieser Text wurde mit KI erstellt")' },
  { value: 'metadata_tag', label: 'Ja — Meta-Tags im HTML' },
  { value: 'planned', label: 'Nein, aber ich plane es' },
  { value: 'none', label: 'Nein, noch nicht' },
];

const HUMAN_REVIEW_OPTIONS = [
  { value: 'always', label: 'Ja, immer', bool: true },
  { value: 'partial', label: 'Ja, teilweise', bool: true },
  { value: 'no', label: 'Nein', bool: false },
];

function generateJson(data: FormData): object {
  return {
    version: '1.0',
    last_updated: new Date().toISOString().split('T')[0],
    ai_content_policy: {
      uses_ai_content: data.usesAi ?? false,
      content_types: data.contentTypes,
      labeling_method: data.labelingMethod || 'none',
      human_review: data.humanReview ?? false,
      tools_used: [],
    },
    contact: data.contactEmail,
    legal_basis: 'EU AI Act Art. 50(4)',
  };
}

function downloadJson(data: FormData) {
  const json = generateJson(data);
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-transparency.json';
  a.click();
  URL.revokeObjectURL(url);
}

export default function GeneratorWizard() {
  const [step, setStep] = useState<Step>(0);
  const [ackChecked, setAckChecked] = useState(false);
  const [form, setForm] = useState<FormData>({
    usesAi: null,
    contentTypes: [],
    labelingMethod: '',
    humanReview: null,
    humanReviewChoice: '',
    contactEmail: '',
  });
  const [emailError, setEmailError] = useState('');

  function nextStep() {
    setStep((s) => (typeof s === 'number' ? ((s + 1) as Step) : s));
  }

  function prevStep() {
    setStep((s) => (typeof s === 'number' && s > 0 ? ((s - 1) as Step) : s));
  }

  function toggleContentType(value: string) {
    setForm((f) => ({
      ...f,
      contentTypes: f.contentTypes.includes(value)
        ? f.contentTypes.filter((v) => v !== value)
        : [...f.contentTypes, value],
    }));
  }

  function handleEmailSubmit() {
    const email = form.contactEmail.trim();
    if (!email) {
      setEmailError('Bitte geben Sie eine E-Mail-Adresse ein.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }
    setEmailError('');
    setStep('done');
  }

  const totalSteps = 5;
  const currentStepNum = typeof step === 'number' ? step : totalSteps + 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-8 py-2 min-h-11"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">ai-transparency.json erstellen</h1>
      <p className="text-slate-700 mb-8">5 Fragen — 2 Minuten — kostenlos, kein Login, kein Datenspeicher</p>

      {typeof step === 'number' && step > 0 && step <= totalSteps && (
        <div
          className="flex gap-2 mb-8"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Schritt ${step} von ${totalSteps}`}
        >
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i + 1 <= currentStepNum ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}

      {/* Step 0: ACK */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start gap-3 mb-6">
            <Info className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Wichtiger Hinweis</h2>
              <p className="text-sm text-slate-600">Bitte lesen und bestätigen Sie, bevor es weitergeht.</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 mb-6 text-slate-700 text-sm leading-relaxed">
            <p>
              <strong>ai-transparency.json</strong> dokumentiert Ihren organisatorischen KI-Transparenz-Prozess
              gemäß EU AI Act Art. 50(4). Das Tool erzeugt den{' '}
              <strong>Policy-Layer</strong> — den Nachweis, dass ein Prozess vorhanden ist.
            </p>
            <p className="mt-3">
              Die Kennzeichnung jedes einzelnen KI-generierten Texts direkt im Content (
              <strong>Content-Layer</strong>) bleibt <strong>Ihre eigene Pflicht</strong> und wird durch
              dieses Tool nicht übernommen oder ersetzt.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Dies ist kein Rechtsrat. Für rechtssichere Compliance-Beurteilung: Rechtsanwalt hinzuziehen.
            </p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer group mb-8">
            <input
              type="checkbox"
              checked={ackChecked}
              onChange={(e) => setAckChecked(e.target.checked)}
              className="w-6 h-6 rounded border-2 border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 focus:ring-4 focus:ring-emerald-600/30 cursor-pointer shrink-0 mt-0.5"
            />
            <span className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
              Ich habe verstanden: Policy-Layer ≠ Content-Layer. Die Kennzeichnung einzelner KI-Texte bleibt
              meine Pflicht.
            </span>
          </label>
          <button
            type="button"
            onClick={nextStep}
            disabled={!ackChecked}
            className="w-full bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            Weiter
          </button>
        </div>
      )}

      {/* Step 1: KI-Nutzung */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage 1 von 5
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-4 leading-snug">
            Nutzt Ihr Unternehmen KI zur Erstellung von Inhalten?
          </h2>
          {form.usesAi === false && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
              Wenn Sie keine KI für Content nutzen, ist keine ai-transparency.json nötig — Sie können
              trotzdem eine erstellen, falls sich das ändert.
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              type="button"
              onClick={() => { setForm((f) => ({ ...f, usesAi: true })); nextStep(); }}
              className={`flex-1 font-semibold px-6 py-3 rounded-lg border-2 transition-all duration-150 min-h-11 ${
                form.usesAi === true
                  ? 'bg-emerald-600 border-emerald-600 text-emerald-100'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-emerald-400'
              }`}
            >
              Ja
            </button>
            <button
              type="button"
              onClick={() => { setForm((f) => ({ ...f, usesAi: false })); nextStep(); }}
              className={`flex-1 font-medium px-6 py-3 rounded-lg border-2 transition-all duration-150 min-h-11 ${
                form.usesAi === false
                  ? 'bg-slate-700 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
              }`}
            >
              Nein
            </button>
          </div>
          <button type="button" onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 py-2">
            ← Zurück
          </button>
        </div>
      )}

      {/* Step 2: Content-Typen */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage 2 von 5
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-2 leading-snug">
            Welche Inhalte erstellen Sie mit KI?
          </h2>
          <p className="text-sm text-slate-600 mb-6">Mehrfachauswahl möglich</p>
          <div className="space-y-3 mb-6">
            {CONTENT_TYPE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={form.contentTypes.includes(opt.value)}
                  onChange={() => toggleContentType(opt.value)}
                  className="w-6 h-6 rounded border-2 border-slate-300 checked:bg-emerald-600 checked:border-emerald-600 focus:ring-4 focus:ring-emerald-600/30 cursor-pointer shrink-0"
                />
                <span className="text-sm font-medium text-slate-800">{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 py-2 min-h-11 px-2">
              ← Zurück
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11"
            >
              Weiter
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Kennzeichnung */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage 3 von 5
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-6 leading-snug">
            Kennzeichnen Sie KI-generierte Inhalte aktuell im Text?
          </h2>
          <div className="space-y-3 mb-6">
            {LABELING_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  form.labelingMethod === opt.value
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="labeling"
                  value={opt.value}
                  checked={form.labelingMethod === opt.value}
                  onChange={() => setForm((f) => ({ ...f, labelingMethod: opt.value }))}
                  className="w-5 h-5 accent-emerald-600"
                />
                <span className="text-sm font-medium text-slate-800">{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 py-2 min-h-11 px-2">
              ← Zurück
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!form.labelingMethod}
              className="flex-1 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Redaktionelle Prüfung */}
      {step === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage 4 von 5
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-6 leading-snug">
            Prüft ein Mensch den KI-generierten Content vor der Veröffentlichung?
          </h2>
          <div className="space-y-3 mb-6">
            {HUMAN_REVIEW_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  form.humanReviewChoice === opt.value
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="humanReview"
                  value={opt.value}
                  checked={form.humanReviewChoice === opt.value}
                  onChange={() => setForm((f) => ({ ...f, humanReview: opt.bool, humanReviewChoice: opt.value }))}
                  className="w-5 h-5 accent-emerald-600"
                />
                <span className="text-sm font-medium text-slate-800">{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 py-2 min-h-11 px-2">
              ← Zurück
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={form.humanReview === null}
              className="flex-1 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Kontakt-E-Mail */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">
            Frage 5 von 5
          </p>
          <h2 className="text-xl font-semibold text-slate-900 mb-2 leading-snug">
            Kontakt-E-Mail für KI-Transparenz-Anfragen
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Diese E-Mail wird in Ihrer ai-transparency.json öffentlich angezeigt — z. B. datenschutz@ihredomain.de
          </p>
          <div className="mb-6">
            <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800 mb-2">
              E-Mail-Adresse
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.contactEmail}
              onChange={(e) => { setForm((f) => ({ ...f, contactEmail: e.target.value })); setEmailError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleEmailSubmit(); }}
              placeholder="datenschutz@ihredomain.de"
              className={`h-11 w-full px-4 py-2 rounded-lg border text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-600/30 transition-colors ${
                emailError ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-emerald-600'
              }`}
              autoComplete="email"
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {emailError}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={prevStep} className="text-sm text-slate-500 hover:text-slate-700 py-2 min-h-11 px-2">
              ← Zurück
            </button>
            <button
              type="button"
              onClick={handleEmailSubmit}
              className="flex-1 bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11"
            >
              Fertig — JSON erstellen
            </button>
          </div>
        </div>
      )}

      {/* Done: Download */}
      {step === 'done' && (
        <div className="space-y-6">
          {/* 1: Download */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">Schritt 1/3 — JSON heruntergeladen</h2>
                <p className="text-sm text-slate-600">Kein Login, kein Datenspeicher, kostenlos</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 mb-6 font-mono text-xs text-slate-300 overflow-auto max-h-48">
              <pre>{JSON.stringify(generateJson(form), null, 2)}</pre>
            </div>

            <button
              type="button"
              onClick={() => downloadJson(form)}
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 text-emerald-100 font-semibold px-6 py-4 rounded-lg hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150 min-h-11 mb-4 text-lg"
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              ai-transparency.json herunterladen
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(0);
                setAckChecked(false);
                setForm({ usesAi: null, contentTypes: [], labelingMethod: '', humanReview: null, humanReviewChoice: '', contactEmail: '' });
              }}
              className="w-full text-sm text-slate-500 hover:text-slate-700 py-2 min-h-11"
            >
              Neue JSON erstellen
            </button>
          </div>

          {/* 2: Hosting-Anleitung */}
          <div id="hosting" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Schritt 2/3 — Datei auf Ihrer Website ablegen</h3>
            <p className="text-sm text-slate-600 mb-5">
              Legen Sie die Datei unter{' '}
              <code className="bg-slate-100 px-1 rounded font-mono">/.well-known/ai-transparency.json</code>{' '}
              auf Ihrer Website ab. Wählen Sie Ihre Hosting-Plattform:
            </p>

            <div className="space-y-4 text-sm">
              <details className="border border-slate-200 rounded-xl overflow-hidden">
                <summary className="font-semibold text-slate-900 px-5 py-4 cursor-pointer hover:bg-slate-50 flex items-center gap-2">
                  WordPress (mit Redirection-Plugin)
                </summary>
                <div className="px-5 py-4 border-t border-slate-100 text-slate-700 space-y-2">
                  <p><strong>Option A (empfohlen) — Plugin:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Plugin &bdquo;Redirection&ldquo; oder &bdquo;301 Redirects&ldquo; installieren</li>
                    <li>Neue Weiterleitung erstellen: Quelle <code className="font-mono text-xs bg-slate-100 px-1 rounded">/.well-known/ai-transparency.json</code></li>
                    <li>Ziel: URL zu Ihrer hochgeladenen JSON-Datei (z.&nbsp;B. im Media-Ordner)</li>
                  </ol>
                  <p className="mt-3"><strong>Option B — File Manager (cPanel/Plesk):</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Im Hosting-Control-Panel den File Manager öffnen</li>
                    <li>Im Root-Verzeichnis (public_html) Ordner <code className="font-mono text-xs bg-slate-100 px-1 rounded">.well-known</code> anlegen</li>
                    <li>Datei <code className="font-mono text-xs bg-slate-100 px-1 rounded">ai-transparency.json</code> hochladen</li>
                  </ol>
                </div>
              </details>

              <details className="border border-slate-200 rounded-xl overflow-hidden">
                <summary className="font-semibold text-slate-900 px-5 py-4 cursor-pointer hover:bg-slate-50">
                  Squarespace
                </summary>
                <div className="px-5 py-4 border-t border-slate-100 text-slate-700 space-y-2">
                  <p>Squarespace erlaubt keinen direkten Datei-Upload zu <code className="font-mono text-xs bg-slate-100 px-1 rounded">/.well-known/</code>.</p>
                  <p><strong>Lösung — URL-Weiterleitung:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>JSON-Datei auf externem Server oder CDN (z.&nbsp;B. GitHub Gist, Cloudflare Pages) ablegen</li>
                    <li>In Squarespace: Einstellungen → Erweitert → URL-Weiterleitungen</li>
                    <li>Weiterleitung: <code className="font-mono text-xs bg-slate-100 px-1 rounded">/.well-known/ai-transparency.json</code> → externe URL</li>
                  </ol>
                  <p className="text-slate-500 text-xs mt-2">Oder: Nutzen Sie die Zero-Tech-Option weiter unten (keine eigene Hosting-URL nötig).</p>
                </div>
              </details>

              <details className="border border-slate-200 rounded-xl overflow-hidden">
                <summary className="font-semibold text-slate-900 px-5 py-4 cursor-pointer hover:bg-slate-50">
                  IONOS, Strato, 1&1, All-Inkl. (Managed Hosting)
                </summary>
                <div className="px-5 py-4 border-t border-slate-100 text-slate-700 space-y-2">
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>FTP-Zugang oder File Manager im Kunden-Center öffnen</li>
                    <li>Im Root-Verzeichnis (htdocs / public_html / www) Ordner <code className="font-mono text-xs bg-slate-100 px-1 rounded">.well-known</code> anlegen</li>
                    <li>Datei <code className="font-mono text-xs bg-slate-100 px-1 rounded">ai-transparency.json</code> in diesen Ordner hochladen</li>
                    <li>Test: <code className="font-mono text-xs bg-slate-100 px-1 rounded">https://ihredomain.de/.well-known/ai-transparency.json</code> aufrufen</li>
                  </ol>
                </div>
              </details>

              <details className="border border-slate-200 rounded-xl overflow-hidden">
                <summary className="font-semibold text-slate-900 px-5 py-4 cursor-pointer hover:bg-slate-50">
                  Jimdo, Wix, Webflow
                </summary>
                <div className="px-5 py-4 border-t border-slate-100 text-slate-700 space-y-2">
                  <p>Diese Plattformen haben eingeschränkten Dateisystem-Zugang. Empfehlung:</p>
                  <p>Nutzen Sie die <strong>Zero-Tech-Option</strong> weiter unten — kein FTP, kein Datei-Upload nötig.</p>
                </div>
              </details>

              <details className="border border-slate-200 rounded-xl overflow-hidden">
                <summary className="font-semibold text-slate-900 px-5 py-4 cursor-pointer hover:bg-slate-50">
                  Hetzner, Uberspace, eigener Server (Nginx / Apache)
                </summary>
                <div className="px-5 py-4 border-t border-slate-100 text-slate-700 space-y-2">
                  <p><strong>Nginx:</strong></p>
                  <pre className="bg-slate-100 p-3 rounded text-xs font-mono overflow-x-auto">{`location /.well-known/ai-transparency.json {
  alias /var/www/html/.well-known/ai-transparency.json;
  add_header Content-Type application/json;
}`}</pre>
                  <p className="mt-2"><strong>Apache (.htaccess):</strong></p>
                  <pre className="bg-slate-100 p-3 rounded text-xs font-mono overflow-x-auto">{`<Files "ai-transparency.json">
  Header set Content-Type "application/json"
</Files>`}</pre>
                </div>
              </details>
            </div>
          </div>

          {/* 3: Zero-Tech-Option */}
          <div id="zero-tech" className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Kein Serverzugang? Zero-Tech-Option
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Wenn Sie keinen Zugang zum Dateisystem Ihrer Website haben (Jimdo, Wix, manche Squarespace-Pläne),
              können Sie Ihre Policy künftig von uns hosten lassen — erreichbar unter{' '}
              <code className="font-mono text-xs bg-amber-100 px-1 rounded">aiclaration.de/v/[ihr-slug]</code>,
              ohne eigenes Hosting. Diese Option ist Teil des{' '}
              <strong>Starter-Plans (in Vorbereitung)</strong>.
            </p>
            <p className="text-sm font-semibold text-slate-800 mb-3">So wird es funktionieren:</p>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1 mb-4">
              <li>Wir richten Ihren persönlichen Slug ein (z. B. <code className="font-mono text-xs bg-amber-100 px-1 rounded">meinefirma</code>)</li>
              <li>Sie verlinken auf <code className="font-mono text-xs bg-amber-100 px-1 rounded">aiclaration.de/v/meinefirma</code> — fertig</li>
            </ol>
            <a
              href="mailto:info@aiclaration.de?subject=Zero-Tech-Option vormerken&body=Bitte merken Sie mich für die gehostete Zero-Tech-Option vor. Meine Domain: "
              className="inline-flex items-center bg-amber-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-amber-700 transition-colors min-h-11 text-sm"
            >
              Für Zero-Tech-Option vormerken →
            </a>
          </div>

          {/* 4: Content-Labeling Snippet */}
          <div id="snippet" className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Bonus: Content-Labeling Snippet (Content-Layer)
            </h3>
            <p className="text-sm text-slate-700 mb-4">
              Art. 50(4) erfordert auch, dass einzelne KI-Texte auf Ihrer Website gekennzeichnet sind (Content-Layer).
              Fügen Sie diesen HTML-Schnipsel in jeden KI-generierten Artikel ein:
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">HTML-Kommentar (maschinenlesbar)</p>
                <div className="bg-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 relative">
                  <pre>{`<!-- Dieser Text enthält KI-generierte Inhalte gemäß EU AI Act Art. 50(4) -->`}</pre>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Sichtbare Kennzeichnung für Leser</p>
                <div className="bg-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300">
                  <pre>{`<p class="ai-disclosure">
  Dieser Beitrag wurde mit KI-Unterstützung erstellt
  und redaktionell geprüft (EU AI Act Art. 50).
</p>

<style>
.ai-disclosure {
  font-size: 0.75rem;
  color: #64748b;
  border-left: 3px solid #e2e8f0;
  padding-left: 1rem;
  margin-top: 2rem;
}
</style>`}</pre>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">WordPress: So automatisieren Sie die Kennzeichnung</p>
                <p>Fügen Sie den Snippet als <strong>Custom HTML Block</strong> am Ende jedes KI-generierten Beitrags ein. Mit dem Plugin &bdquo;Advanced Custom Fields&ldquo; können Sie ein Pflichtfeld &bdquo;KI eingesetzt (Ja/Nein)&ldquo; pro Artikel anlegen und das Snippet conditional im Theme ausgeben.</p>
              </div>
            </div>
          </div>

          {/* 5: Validate CTA */}
          <div className="bg-emerald-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Schritt 3/3 — Policy validieren</h3>
            <p className="text-emerald-100 text-sm mb-6">
              Nachdem Sie die Datei abgelegt haben: Prüfen Sie mit unserem Validator, ob alles korrekt eingebunden ist.
            </p>
            <Link
              href="/validate"
              className="inline-flex items-center bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors min-h-11"
            >
              Policy jetzt validieren →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

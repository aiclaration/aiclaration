'use client';

import { CheckCircle, XCircle, AlertCircle, Square, Clock, WifiOff, ShieldAlert } from 'lucide-react';
import type { ValidateResponse, AiTransparencyJson } from '@/lib/types';

const STATUS_META = {
  VALID: {
    icon: CheckCircle,
    color: 'emerald',
    label: '✓ VALID',
    bg: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  INVALID: {
    icon: XCircle,
    color: 'red',
    label: '✗ INVALID',
    bg: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-800',
  },
  NOT_FOUND: {
    icon: AlertCircle,
    color: 'amber',
    label: 'NICHT GEFUNDEN',
    bg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  FORMAT_ERROR: {
    icon: XCircle,
    color: 'red',
    label: 'FORMAT-FEHLER',
    bg: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-800',
  },
  SSRF_ERROR: {
    icon: ShieldAlert,
    color: 'slate',
    label: 'URL BLOCKIERT',
    bg: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-600',
    badgeBg: 'bg-slate-100 text-slate-800',
  },
  TIMEOUT: {
    icon: Clock,
    color: 'amber',
    label: 'TIMEOUT',
    bg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  TOO_LARGE: {
    icon: XCircle,
    color: 'red',
    label: 'DATEI ZU GROß',
    bg: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-800',
  },
  REDIRECT_LIMIT: {
    icon: WifiOff,
    color: 'amber',
    label: 'ZU VIELE REDIRECTS',
    bg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  RATE_LIMIT_EXCEEDED: {
    icon: Clock,
    color: 'amber',
    label: 'RATE-LIMIT',
    bg: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  INTERNAL_ERROR: {
    icon: AlertCircle,
    color: 'red',
    label: 'INTERNER FEHLER',
    bg: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    badgeBg: 'bg-red-100 text-red-800',
  },
} as const;

const LABELING_LABELS: Record<string, string> = {
  inline_disclosure: 'Inline Disclosure (Text-Kennzeichnung)',
  metadata_tag: 'Meta-Tags im HTML',
  'ai Generated': 'KI-generiert markiert',
  planned: 'In Planung',
  none: 'Noch nicht umgesetzt',
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  blog_posts: 'Blogbeiträge',
  newsletter: 'Newsletter',
  pr_texts: 'PR-Texte / Pressemitteilungen',
  social_media: 'Social Media',
  product_descriptions: 'Produktbeschreibungen',
  marketing_text: 'Marketing-Texte',
  other: 'Sonstiges',
};

interface Props {
  result: ValidateResponse;
  checkedUrl: string;
}

export default function ResultDisplay({ result, checkedUrl }: Props) {
  const meta = STATUS_META[result.status] ?? STATUS_META.INTERNAL_ERROR;
  const Icon = meta.icon;
  const details = result.status === 'VALID' ? (result.details as Partial<AiTransparencyJson>) : null;
  const errorList =
    result.status === 'INVALID' && result.details && 'errors' in result.details
      ? (result.details as { errors: { path: string; message: string }[] }).errors
      : null;

  return (
    <div className={`rounded-xl border p-6 ${meta.bg}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 shrink-0 ${meta.iconColor}`} aria-hidden="true" />
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${meta.badgeBg}`}>
            {meta.label}
          </span>
          <span className="text-sm text-slate-600 font-mono truncate max-w-xs">{checkedUrl}</span>
        </div>
      </div>

      {/* Pflicht: 2-Layer-Status — immer anzeigen */}
      <div className="space-y-3 mb-6">
        <div
          className={`flex items-start gap-3 p-4 rounded-lg border ${
            result.status === 'VALID'
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-white border-slate-200'
          }`}
        >
          {result.status === 'VALID' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold text-slate-900 text-sm">Policy-Layer</p>
            <p className="text-slate-700 text-sm">
              {result.status === 'VALID'
                ? 'KI-Transparenz-Prozess dokumentiert und verifiziert ✓'
                : 'Noch nicht verifiziert — Policy-Layer ausstehend'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
          <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-slate-900 text-sm">Content-Layer</p>
            <p className="text-slate-700 text-sm">
              Kennzeichnung einzelner KI-Texte direkt im Content — Ihre Verantwortung (technisch
              nicht prüfbar durch dieses Tool)
            </p>
          </div>
        </div>
      </div>

      {/* Fehlermeldung */}
      {result.message && result.status !== 'VALID' && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
          <p className="text-sm text-slate-700">{result.message}</p>
        </div>
      )}

      {/* Schema-Fehler (INVALID) */}
      {errorList && errorList.length > 0 && (
        <div className="bg-white rounded-lg border border-red-200 p-4 mb-4">
          <p className="text-sm font-semibold text-red-800 mb-2">
            Fehler in Ihrer ai-transparency.json:
          </p>
          <ul className="space-y-1">
            {errorList.map((e, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-red-500 shrink-0">•</span>
                <span>
                  <code className="font-mono text-xs bg-red-50 px-1 rounded">{e.path}</code>{' '}
                  {e.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Policy-Details (nur bei VALID) */}
      {details && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Policy-Details
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium text-slate-600 w-36 shrink-0">Version</dt>
              <dd className="text-slate-800">{details.version ?? '—'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-600 w-36 shrink-0">Stand</dt>
              <dd className="text-slate-800">{details.last_updated ?? '—'}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-slate-600 w-36 shrink-0">KI eingesetzt</dt>
              <dd className="text-slate-800">
                {details.ai_content_policy?.uses_ai_content ? 'Ja' : 'Nein'}
              </dd>
            </div>
            {details.ai_content_policy?.content_types &&
              details.ai_content_policy.content_types.length > 0 && (
                <div className="flex gap-2">
                  <dt className="font-medium text-slate-600 w-36 shrink-0">Content-Typen</dt>
                  <dd className="text-slate-800">
                    {details.ai_content_policy.content_types
                      .map((t) => CONTENT_TYPE_LABELS[t] ?? t)
                      .join(', ')}
                  </dd>
                </div>
              )}
            {details.ai_content_policy?.labeling_method && (
              <div className="flex gap-2">
                <dt className="font-medium text-slate-600 w-36 shrink-0">Kennzeichnung</dt>
                <dd className="text-slate-800">
                  {LABELING_LABELS[details.ai_content_policy.labeling_method] ??
                    details.ai_content_policy.labeling_method}
                </dd>
              </div>
            )}
            <div className="flex gap-2">
              <dt className="font-medium text-slate-600 w-36 shrink-0">Redaktionsprüfung</dt>
              <dd className="text-slate-800">
                {details.ai_content_policy?.human_review ? 'Ja' : 'Nein / nicht angegeben'}
              </dd>
            </div>
            {details.contact && (
              <div className="flex gap-2">
                <dt className="font-medium text-slate-600 w-36 shrink-0">Kontakt</dt>
                <dd className="text-slate-800 truncate">{details.contact}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Hilfe bei Fehlern */}
      {result.status === 'NOT_FOUND' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">Datei noch nicht gefunden?</p>
          <p>
            Erstellen Sie Ihre ai-transparency.json mit unserem{' '}
            <a href="/generate" className="underline font-medium">
              kostenlosen Generator
            </a>{' '}
            und legen Sie sie unter <code className="font-mono text-xs bg-amber-100 px-1 rounded">
              /.well-known/ai-transparency.json
            </code>{' '}
            auf Ihrer Website ab.
          </p>
        </div>
      )}

      {/* Badge-Upgrade CTA (nur bei VALID) */}
      {result.status === 'VALID' && (
        <div className="bg-emerald-600 rounded-xl p-5 text-white text-center">
          <p className="font-bold text-lg mb-1">Policy validiert ✓</p>
          <p className="text-emerald-100 text-sm mb-4">
            Aktivieren Sie das Verified Badge für Ihre Website — monatliche Auto-Checks
            inklusive — Statusänderungen werden frühzeitig erkannt.
          </p>
          <a
            href="/generate"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors min-h-11"
          >
            Badge aktivieren — ab 49 €/Monat →
          </a>
          <p className="text-xs text-emerald-300 mt-3">
            Starter-Plan: monatlicher Auto-Check + E-Mail-Alert + klickbares SVG-Badge
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-4 text-right">
        Geprüft: {new Date(result.checked_at).toLocaleString('de-DE')} ·{' '}
        {result.processing_time_ms} ms
      </p>
    </div>
  );
}

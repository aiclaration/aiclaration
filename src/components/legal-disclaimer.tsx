// Haftungsausschluss — Variante A (short) fuer Footer, Variante B (long) fuer Ergebnis-Seiten
// Pflicht auf JEDER Seite im Footer (Variante A) und unter jedem Ergebnis (Variante B)
// Quelle: 02_Templates/Haftungsausschluss_Template.md
// TODO: toolName + regulierung bei Verwendung uebergeben

interface LegalDisclaimerProps {
  toolName?: string;
  regulierung?: string;
  variant?: 'short' | 'long';
}

export function LegalDisclaimer({
  toolName = 'aiclaration',
  regulierung = '[REGULIERUNG]',
  variant = 'short',
}: LegalDisclaimerProps) {
  if (variant === 'long') {
    return (
      <div className="rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-medium mb-1">Hinweis zur Einordnung dieses Ergebnisses</p>
        <p>
          {toolName} berechnet auf Basis Ihrer Angaben gemaess {regulierung}. Das Ergebnis
          ist eine strukturierte Berechnungsgrundlage -{' '}
          <strong>kein Rechtsgutachten, keine Rechtsberatung</strong> im Sinne des RDG.
          Die finale rechtliche Bewertung obliegt Ihnen und Ihrem Rechtsberater.
          Der Anbieter uebernimmt keine Haftung fuer Entscheidungen auf Basis dieses Ergebnisses.
        </p>
      </div>
    );
  }

  return (
    <p className="text-xs text-gray-500">
      {toolName} erstellt Berechnungsgrundlagen gemaess {regulierung} &mdash;{' '}
      <strong>kein Rechtsgutachten, keine Rechtsberatung.</strong>{' '}
      Die finale rechtliche Bewertung obliegt dem Nutzer und seinem Rechtsberater.
    </p>
  );
}

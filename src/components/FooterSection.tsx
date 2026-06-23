import Link from 'next/link';

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/agb', label: 'AGB' },
  { href: '/nutzungsbedingungen', label: 'Nutzungsbedingungen' },
];

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <p className="text-slate-400 font-semibold text-lg">aiclaration</p>
          <nav aria-label="Rechtliche Links">
            <ul className="flex flex-wrap gap-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-slate-200 transition-colors min-h-11 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Haftungsausschluss
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              aiclaration prüft die formale Konformität von ai-transparency.json-Dateien gemäß
              EU AI Act Art. 50, Verordnung (EU) 2024/1689. Es wird keine Rechts- oder
              Steuerberatung gemäß RDG/StBerG erbracht. Die finale Bewertung und rechtliche
              Verantwortung obliegen dem Nutzer bzw. dessen zugelassenen Beratern. Ein positives
              Validierungsergebnis ersetzt keine behördliche Genehmigung. Alle Inhalte wurden
              nach bestem Wissen erstellt; eine Gewähr für Richtigkeit, Vollständigkeit oder
              Aktualität — insbesondere bei Rechtsänderungen — wird nicht übernommen.
            </p>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} aiclaration · Made in Germany · Hosting: Hetzner EU
            (Nürnberg)
          </p>
        </div>
      </div>
    </footer>
  );
}

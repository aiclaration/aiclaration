import Link from 'next/link';

const navLinks = [
  { href: '/generate', label: 'Generator' },
  { href: '/check', label: 'Check' },
  { href: '/validate', label: 'Validator' },
  { href: '/spec', label: 'Spezifikation' },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-bold text-slate-900 text-lg hover:text-emerald-700 transition-colors shrink-0"
        >
          aiclaration
        </Link>
        <nav aria-label="Hauptnavigation">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors min-h-11 inline-flex items-center"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

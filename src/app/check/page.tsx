import type { Metadata } from 'next';
import BetroffenheitsCheck from '@/components/BetroffenheitsCheck';

export const metadata: Metadata = {
  title: 'Bin ich betroffen? — EU AI Act Art. 50 Betroffenheits-Check | aiclaration',
  description:
    'Prüfen Sie in 3 Fragen, ob Ihr Unternehmen von EU AI Act Art. 50(4) betroffen ist. Kostenlos, ohne Anmeldung.',
};

export default function CheckPage() {
  return (
    <main className="min-h-screen bg-slate-50" id="main-content">
      <BetroffenheitsCheck />
    </main>
  );
}

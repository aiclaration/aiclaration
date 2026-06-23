import type { Metadata } from 'next';
import GeneratorWizard from '@/components/GeneratorWizard';

export const metadata: Metadata = {
  title: 'ai-transparency.json Generator — EU AI Act Art. 50(4) | aiclaration',
  description:
    'Erstellen Sie Ihre ai-transparency.json in 5 Fragen. Kostenlos, kein Login, kein Datenspeicher — sofortiger Download.',
};

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-slate-50" id="main-content">
      <GeneratorWizard />
    </main>
  );
}

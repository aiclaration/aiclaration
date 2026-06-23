import type { MetadataRoute } from 'next';

// Auto-served by Next.js App Router at /manifest.webmanifest (+ <link rel="manifest">).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'aiclaration',
    short_name: 'aiclaration',
    description: 'ai-transparency.json Generator + Validator — EU AI Act Art. 50(4) Compliance',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#f8fafc',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

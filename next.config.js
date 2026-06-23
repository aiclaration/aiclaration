/** @type {import('next').NextConfig} */

// Content-Security-Policy. The app uses no third-party scripts/fonts (system-ui
// stack) and only same-origin fetches (/api/validate, /api/subscribe). Next.js
// injects inline bootstrap/hydration, hence 'unsafe-inline' for script/style —
// acceptable for V1 without a nonce-middleware setup. Tighten with nonces later.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
];

const nextConfig = {
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
};
module.exports = nextConfig;

import { describe, it, expect } from 'vitest';
import { isBlockedUrl, isPrivateIp, resolvesToPrivate, normalizeUrl } from './ssrf';

const wellKnown = (host: string) => `https://${host}/.well-known/ai-transparency.json`;

// Pflichtenheft S9.3 — die 8 geforderten SSRF-Szenarien, geprüft auf dem String-Layer
// (isBlockedUrl). Szenario 1 ist die einzige öffentliche, erlaubte URL.
describe('SSRF S9.3 — isBlockedUrl (String-Layer)', () => {
  it('1) öffentliche Domain ist NICHT blockiert', () => {
    expect(isBlockedUrl(wellKnown('example.com'))).toBe(false);
  });

  it.each([
    ['2', 'localhost'],
    ['3', '127.0.0.1'],
    ['4', '10.0.0.1'],
    ['5', '172.16.0.1'],
    ['6', '192.168.1.1'],
    ['7', 'metadata.google.internal'],
    ['8', '169.254.169.254'],
  ])('%s) %s ist blockiert', (_n, host) => {
    expect(isBlockedUrl(wellKnown(host))).toBe(true);
  });

  it('blockiert nicht-http(s)-Schemata', () => {
    expect(isBlockedUrl('file:///etc/passwd')).toBe(true);
    expect(isBlockedUrl('ftp://example.com')).toBe(true);
  });
});

// Layer 2: IP-Klassifizierung (fängt DNS-Rebinding ab — eine öffentliche Domain,
// die per DNS auf eine private Adresse zeigt).
describe('isPrivateIp', () => {
  it.each(['127.0.0.1', '10.0.0.1', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254', '100.64.0.1', '0.0.0.0'])(
    'blockiert privat/reserviert %s',
    (ip) => expect(isPrivateIp(ip)).toBe(true)
  );

  it.each(['8.8.8.8', '1.1.1.1', '93.184.216.34'])('erlaubt öffentliche IPv4 %s', (ip) =>
    expect(isPrivateIp(ip)).toBe(false)
  );

  it('blockiert IPv6 Loopback / ULA / Link-local', () => {
    expect(isPrivateIp('::1')).toBe(true);
    expect(isPrivateIp('fc00::1')).toBe(true);
    expect(isPrivateIp('fd12::1')).toBe(true);
    expect(isPrivateIp('fe80::1')).toBe(true);
  });

  it('erlaubt öffentliche IPv6', () => {
    expect(isPrivateIp('2606:4700:4700::1111')).toBe(false);
  });

  it('blockiert IPv4-mapped IPv6 auf private Adresse', () => {
    expect(isPrivateIp('::ffff:127.0.0.1')).toBe(true);
  });

  it('behandelt unparsbare Eingaben als unsicher', () => {
    expect(isPrivateIp('not-an-ip')).toBe(true);
  });
});

// resolvesToPrivate: bei IP-Literalen synchron (kein DNS) — deterministisch testbar.
describe('resolvesToPrivate (IP-Literale, kein DNS)', () => {
  it('blockiert private IP-Literale', async () => {
    expect(await resolvesToPrivate('127.0.0.1')).toBe(true);
    expect(await resolvesToPrivate('169.254.169.254')).toBe(true);
  });

  it('erlaubt öffentliche IP-Literale', async () => {
    expect(await resolvesToPrivate('8.8.8.8')).toBe(false);
  });
});

describe('normalizeUrl', () => {
  it('ergänzt fehlendes https://', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com');
  });
  it('lässt explizites Schema unverändert', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com');
  });
  it('trimmt Whitespace', () => {
    expect(normalizeUrl('  example.com  ')).toBe('https://example.com');
  });
});

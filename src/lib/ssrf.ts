// SSRF-Protection — see 00_Specs/4_Pflichtenheft.md S7.3
// Two layers of defense:
//   1. String/regex blocklist (catches literal private IPs + known hostnames)
//   2. DNS resolution check (catches DNS-rebinding: a public hostname that
//      resolves to a private/loopback/metadata IP). The regex layer alone
//      cannot see what a hostname actually resolves to.
import net from 'node:net';
import { lookup } from 'node:dns/promises';

const BLOCKED_PATTERNS = [
  /^https?:\/\/localhost(:\d+)?(\/|$)/i,
  /^https?:\/\/127\./,
  /^https?:\/\/10\./,
  /^https?:\/\/172\.(1[6-9]|2\d|3[01])\./,
  /^https?:\/\/192\.168\./,
  /^https?:\/\/169\.254\./,       // Link-local + AWS/GCP/Hetzner metadata
  /^https?:\/\/100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./, // CGNAT 100.64.0.0/10
  /^https?:\/\/0\./,
  /^https?:\/\/\[::1\]/,          // IPv6 loopback
  /^https?:\/\/\[fc/i,            // IPv6 ULA
  /^https?:\/\/\[fd/i,            // IPv6 ULA
  /^https?:\/\/\[fe80/i,          // IPv6 link-local
  /^https?:\/\/metadata\./i,      // Cloud metadata hostnames
  /^https?:\/\/.+\.local(:\d+)?(\/|$)/i,
  /^https?:\/\/0\.0\.0\.0/,
];

/** Layer 1: synchronous string check. */
export function isBlockedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return true;
    if (parsed.hostname === '' || parsed.hostname == null) return true;
    return BLOCKED_PATTERNS.some((p) => p.test(url));
  } catch {
    return true;
  }
}

/** True if an IP literal falls into a private/reserved/loopback/metadata range. */
export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number);
    if (p.some((n) => Number.isNaN(n))) return true;
    if (p[0] === 0) return true;                       // 0.0.0.0/8
    if (p[0] === 10) return true;                      // private
    if (p[0] === 127) return true;                     // loopback
    if (p[0] === 169 && p[1] === 254) return true;     // link-local + metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true; // private
    if (p[0] === 192 && p[1] === 168) return true;     // private
    if (p[0] === 192 && p[1] === 0 && p[2] === 0) return true; // IETF protocol
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] >= 224) return true;                      // multicast + reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase().replace(/^\[|\]$/g, '');
    if (lower === '::1' || lower === '::') return true;
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true; // ULA
    if (lower.startsWith('fe80')) return true;          // link-local
    const mapped = lower.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]);          // IPv4-mapped IPv6
    return false;
  }
  return true; // not a recognizable IP → treat as unsafe
}

/**
 * Layer 2: resolve the hostname and block if ANY resolved address is private.
 * Returns true (= blocked) on resolution failure — fail closed.
 */
export async function resolvesToPrivate(hostname: string): Promise<boolean> {
  const host = hostname.replace(/^\[|\]$/g, '');
  if (net.isIP(host)) return isPrivateIp(host);
  try {
    const results = await lookup(host, { all: true });
    if (!results.length) return true;
    return results.some((r) => isPrivateIp(r.address));
  } catch {
    return true;
  }
}

export function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return 'https://' + trimmed;
  }
  return trimmed;
}

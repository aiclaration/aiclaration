// Shared in-memory rate limiting + client-IP extraction.
//
// Per-process only (good enough for a single Coolify instance). NOT global across
// multiple replicas — documented limitation, see DASHBOARD. Replaces the Cloudflare
// Bot Fight Mode that the deployment originally planned (decision 2026-06-22: no Cloudflare).

/**
 * Best-effort client IP. `cf-connecting-ip` is kept for forward-compat but is empty
 * without Cloudflare; without a reverse proxy that sets `x-forwarded-for`/`x-real-ip`
 * every caller collapses to 'unknown' (one shared bucket). Coolify/Traefik MUST
 * forward these headers for per-IP limiting to work in production.
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  );
}

/**
 * Fixed-window per-IP limiter. `check(ip)` returns true if allowed, false if over
 * the limit. Expired entries are swept lazily (at most once per window) so the
 * backing Map cannot grow unbounded over the process lifetime.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const counts = new Map<string, { count: number; resetAt: number }>();
  let lastSweep = Date.now();

  function sweep(now: number): void {
    if (now - lastSweep < windowMs) return;
    lastSweep = now;
    for (const [key, entry] of counts) {
      if (now > entry.resetAt) counts.delete(key);
    }
  }

  return {
    check(ip: string): boolean {
      const now = Date.now();
      sweep(now);
      const entry = counts.get(ip);
      if (!entry || now > entry.resetAt) {
        counts.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (entry.count >= limit) return false;
      entry.count++;
      return true;
    },
  };
}

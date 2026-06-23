import { describe, it, expect, vi, afterEach } from 'vitest';
import { createRateLimiter, getClientIp } from './rate-limit';

describe('createRateLimiter', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows up to the limit, then blocks within the same window', () => {
    const rl = createRateLimiter(3, 60_000);
    expect(rl.check('1.2.3.4')).toBe(true);
    expect(rl.check('1.2.3.4')).toBe(true);
    expect(rl.check('1.2.3.4')).toBe(true);
    expect(rl.check('1.2.3.4')).toBe(false);
  });

  it('tracks each IP independently', () => {
    const rl = createRateLimiter(1, 60_000);
    expect(rl.check('a')).toBe(true);
    expect(rl.check('a')).toBe(false);
    expect(rl.check('b')).toBe(true);
  });

  it('resets the bucket once the window has elapsed', () => {
    vi.useFakeTimers();
    const rl = createRateLimiter(1, 1000);
    expect(rl.check('a')).toBe(true);
    expect(rl.check('a')).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(rl.check('a')).toBe(true);
  });
});

describe('getClientIp', () => {
  it('prefers cf-connecting-ip', () => {
    const h = new Headers({ 'cf-connecting-ip': '9.9.9.9', 'x-forwarded-for': '1.1.1.1' });
    expect(getClientIp(h)).toBe('9.9.9.9');
  });

  it('falls back to the first x-forwarded-for entry', () => {
    const h = new Headers({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' });
    expect(getClientIp(h)).toBe('1.1.1.1');
  });

  it('returns "unknown" when no IP headers are present', () => {
    expect(getClientIp(new Headers())).toBe('unknown');
  });
});

import { describe, it, expect } from 'vitest';
import { resolveBrevoConfig, type SubscribeEnv } from './subscribe-config';

const full: SubscribeEnv = {
  BREVO_API_KEY: 'xkeysib-test',
  BREVO_LIST_ID: '2',
  BREVO_DOI_TEMPLATE_ID: '1',
};

describe('resolveBrevoConfig', () => {
  it('returns the config when all three vars are present', () => {
    expect(resolveBrevoConfig({ ...full, NODE_ENV: 'production' })).toEqual({
      ok: true,
      apiKey: 'xkeysib-test',
      listId: '2',
      templateId: '1',
    });
  });

  it('flags a hard misconfiguration in production when a var is missing', () => {
    expect(
      resolveBrevoConfig({ ...full, BREVO_API_KEY: undefined, NODE_ENV: 'production' })
    ).toEqual({ ok: false, reason: 'missing-in-prod' });
  });

  it('treats every missing var as missing-in-prod under production', () => {
    for (const key of ['BREVO_API_KEY', 'BREVO_LIST_ID', 'BREVO_DOI_TEMPLATE_ID'] as const) {
      const env: SubscribeEnv = { ...full, NODE_ENV: 'production' };
      delete env[key];
      expect(resolveBrevoConfig(env)).toEqual({ ok: false, reason: 'missing-in-prod' });
    }
  });

  it('falls back silently (dev-fallback) outside production', () => {
    expect(resolveBrevoConfig({ NODE_ENV: 'development' })).toEqual({
      ok: false,
      reason: 'dev-fallback',
    });
    expect(resolveBrevoConfig({ NODE_ENV: 'test' })).toEqual({
      ok: false,
      reason: 'dev-fallback',
    });
  });

  it('treats an empty-string var as missing', () => {
    expect(resolveBrevoConfig({ ...full, BREVO_LIST_ID: '', NODE_ENV: 'production' })).toEqual({
      ok: false,
      reason: 'missing-in-prod',
    });
  });
});

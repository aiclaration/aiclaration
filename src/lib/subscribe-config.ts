// Brevo configuration resolution for /api/subscribe.
//
// Pure + framework-free so it can be unit-tested without importing next/server.
// The route maps the result to the right HTTP response.

export type BrevoConfig =
  | { ok: true; apiKey: string; listId: string; templateId: string }
  | { ok: false; reason: 'missing-in-prod' | 'dev-fallback' };

/** Just the env vars this helper reads — `process.env` satisfies it. */
export interface SubscribeEnv {
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
  BREVO_DOI_TEMPLATE_ID?: string;
  NODE_ENV?: string;
}

/**
 * Resolves the three required Brevo env vars.
 *
 * If all are present → `ok`. If any is missing, the reason depends on the
 * environment: in production it is a hard misconfiguration (`missing-in-prod` →
 * the route must answer 500, never a silent success), whereas outside production
 * it is a tolerated `dev-fallback` so the UI can be exercised without real keys.
 */
export function resolveBrevoConfig(env: SubscribeEnv): BrevoConfig {
  const apiKey = env.BREVO_API_KEY;
  const listId = env.BREVO_LIST_ID;
  const templateId = env.BREVO_DOI_TEMPLATE_ID;

  if (apiKey && listId && templateId) {
    return { ok: true, apiKey, listId, templateId };
  }

  return {
    ok: false,
    reason: env.NODE_ENV === 'production' ? 'missing-in-prod' : 'dev-fallback',
  };
}

// Ajv JSON-Schema for ai-transparency.json — see 00_Specs/4_Pflichtenheft.md S6.3
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const AI_TRANSPARENCY_SCHEMA = {
  // Must match Ajv's registered draft-07 meta-schema URI exactly (http + trailing #),
  // otherwise ajv.compile() throws "no schema with key or ref ..." at runtime.
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['version', 'last_updated', 'ai_content_policy', 'contact', 'legal_basis'],
  additionalProperties: true,
  properties: {
    version: { type: 'string' },
    last_updated: { type: 'string', format: 'date' },
    ai_content_policy: {
      type: 'object',
      required: ['uses_ai_content'],
      additionalProperties: true,
      properties: {
        uses_ai_content: { type: 'boolean' },
        content_types: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              'marketing_text',
              'blog_posts',
              'newsletter',
              'pr_texts',
              'social_media',
              'product_descriptions',
              'other',
            ],
          },
        },
        labeling_method: {
          type: 'string',
          enum: ['inline_disclosure', 'metadata_tag', 'ai Generated', 'planned', 'none'],
        },
        human_review: { type: 'boolean' },
        tools_used: { type: 'array', items: { type: 'string' } },
      },
    },
    contact: { type: 'string', format: 'email' },
    legal_basis: { type: 'string' },
  },
} as const;

let _ajv: Ajv | null = null;

export function getAjv(): Ajv {
  if (!_ajv) {
    _ajv = new Ajv({ allErrors: true });
    addFormats(_ajv);
  }
  return _ajv;
}

export function validateSchema(data: unknown): { valid: boolean; errors: { path: string; message: string }[] } {
  const ajv = getAjv();
  const validate = ajv.compile(AI_TRANSPARENCY_SCHEMA);
  const valid = validate(data);
  if (valid) return { valid: true, errors: [] };
  const errors = (validate.errors ?? []).map((e) => ({
    path: e.instancePath || '(root)',
    message: e.message ?? 'Validierungsfehler',
  }));
  return { valid: false, errors };
}

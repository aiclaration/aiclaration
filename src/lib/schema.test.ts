import { describe, it, expect } from 'vitest';
import { validateSchema } from './schema';

interface PolicyDoc {
  version: string;
  last_updated: string;
  ai_content_policy: {
    uses_ai_content: boolean;
    content_types: string[];
    labeling_method: string;
    human_review: boolean;
    tools_used: string[];
  };
  contact: string;
  legal_basis: string;
}

// Fresh, valid base document per call (no shared reference → safe to mutate).
function base(): PolicyDoc {
  return {
    version: '1.0',
    last_updated: '2026-06-22',
    ai_content_policy: {
      uses_ai_content: true,
      content_types: ['blog_posts'],
      labeling_method: 'inline_disclosure',
      human_review: true,
      tools_used: ['ChatGPT'],
    },
    contact: 'transparenz@example.com',
    legal_basis: 'EU AI Act Art. 50',
  };
}

// Pflichtenheft S9.2 — valide Fälle 1–5.
describe('schema S9.2 — valide Policies (1–5)', () => {
  it('1) Blog', () => {
    expect(validateSchema(base()).valid).toBe(true);
  });

  it('2) PR-Texte, human_review', () => {
    const d = base();
    d.ai_content_policy.content_types = ['pr_texts'];
    d.ai_content_policy.human_review = true;
    expect(validateSchema(d).valid).toBe(true);
  });

  it('3) Newsletter, tools_used', () => {
    const d = base();
    d.ai_content_policy.content_types = ['newsletter'];
    d.ai_content_policy.tools_used = ['ChatGPT', 'Claude'];
    expect(validateSchema(d).valid).toBe(true);
  });

  it('4) Agentur, multi content_types', () => {
    const d = base();
    d.ai_content_policy.content_types = ['marketing_text', 'social_media', 'blog_posts'];
    expect(validateSchema(d).valid).toBe(true);
  });

  it('5) kein KI-Einsatz', () => {
    const d = base();
    d.ai_content_policy.uses_ai_content = false;
    expect(validateSchema(d).valid).toBe(true);
  });
});

// Pflichtenheft S9.2 — invalide Fälle 6–8 (fehlende Pflichtfelder).
describe('schema S9.2 — fehlende Pflichtfelder (6–8)', () => {
  it('6) fehlend: uses_ai_content', () => {
    const d: unknown = {
      version: '1.0',
      last_updated: '2026-06-22',
      ai_content_policy: { content_types: ['blog_posts'] },
      contact: 'transparenz@example.com',
      legal_basis: 'EU AI Act Art. 50',
    };
    const r = validateSchema(d);
    expect(r.valid).toBe(false);
    expect(r.errors.length).toBeGreaterThan(0);
  });

  it('7) fehlend: legal_basis', () => {
    const d: unknown = {
      version: '1.0',
      last_updated: '2026-06-22',
      ai_content_policy: { uses_ai_content: true },
      contact: 'transparenz@example.com',
    };
    expect(validateSchema(d).valid).toBe(false);
  });

  it('8) fehlend: contact', () => {
    const d: unknown = {
      version: '1.0',
      last_updated: '2026-06-22',
      ai_content_policy: { uses_ai_content: true },
      legal_basis: 'EU AI Act Art. 50',
    };
    expect(validateSchema(d).valid).toBe(false);
  });
});

// Format-/Enum-Härte (über die Spec-Szenarien hinaus — schützt vor stillen Fehlern).
describe('schema — Format- und Enum-Validierung', () => {
  it('contact muss E-Mail-Format haben', () => {
    const d = base();
    d.contact = 'keine-email';
    expect(validateSchema(d).valid).toBe(false);
  });

  it('last_updated muss ISO-Datum sein', () => {
    const d = base();
    d.last_updated = '22.06.2026';
    expect(validateSchema(d).valid).toBe(false);
  });

  it('labeling_method nur erlaubte Enum-Werte', () => {
    const d = base();
    d.ai_content_policy.labeling_method = 'irgendwas';
    expect(validateSchema(d).valid).toBe(false);
  });

  it('content_types nur erlaubte Enum-Werte', () => {
    const d = base();
    d.ai_content_policy.content_types = ['nicht_erlaubt'];
    expect(validateSchema(d).valid).toBe(false);
  });

  it('leeres Objekt ist invalide (alle Pflichtfelder fehlen)', () => {
    expect(validateSchema({}).valid).toBe(false);
  });
});

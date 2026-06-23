// Shared types — see 00_Specs/4_Pflichtenheft.md S6.3 + S7.2

export interface AiContentPolicy {
  uses_ai_content: boolean;
  content_types?: string[];
  labeling_method?: string;
  human_review?: boolean;
  tools_used?: string[];
}

export interface AiTransparencyJson {
  version: string;
  last_updated: string;
  ai_content_policy: AiContentPolicy;
  contact: string;
  legal_basis: string;
}

export type ValidatorStatus =
  | 'VALID'
  | 'INVALID'
  | 'NOT_FOUND'
  | 'FORMAT_ERROR'
  | 'SSRF_ERROR'
  | 'TIMEOUT'
  | 'TOO_LARGE'
  | 'REDIRECT_LIMIT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'INTERNAL_ERROR';

export interface ValidateRequest {
  url: string;
}

export interface ValidateResponse {
  status: ValidatorStatus;
  details: Partial<AiTransparencyJson> | { errors: { path: string; message: string }[] } | null;
  message?: string;
  checked_at: string;
  processing_time_ms: number;
}

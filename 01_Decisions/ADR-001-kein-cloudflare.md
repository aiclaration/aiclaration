# ADR-001: Kein Cloudflare — DNS bei IONOS, Schutz App-seitig

Status: DECIDED
Date: 2026-06-22

## Context

`00_Specs/7_Deployment_Ops.md` plante Cloudflare als Proxy vor dem Hetzner-/Coolify-Origin und nutzte es für drei Funktionen:
1. **Bot Fight Mode** — Bot-/Abuse-Abwehr (u. a. für `/api/subscribe`)
2. **Email Address Obfuscation** — Schutz der Kontakt-Mail vor Scrapern
3. **SSL/TLS-Termination** + Origin-IP-Verschleierung + Basis-DDoS

Der Founder hat entschieden, **kein Cloudflare** einzusetzen. Die Domain `aiclaration.de` ist bei **IONOS** registriert; die DNS-Zone bleibt dort.

## Decision

Cloudflare entfällt vollständig. Konsequenzen werden anderweitig aufgefangen:
- **DNS (inkl. SPF/DKIM/DMARC für Brevo)** wird bei IONOS verwaltet.
- **Bot-/Abuse-Schutz** wird App-seitig implementiert (Rate-Limit + Honeypot + Time-Trap), statt am Edge.
- **SSL** übernimmt Coolify/Traefik via Let's Encrypt.

## Consequences

- **Positive:**
  - Keine Abhängigkeit von einem US-Anbieter im Request-Pfad — sauberere DSGVO-Linie (kein Daten-Transfer an Cloudflare).
  - Eine Infrastruktur-Ebene weniger (kein CF-Proxy zu konfigurieren).
  - Bot-Schutz liegt im eigenen, testbaren Code statt in einer Blackbox.
- **Negative / Risiken:**
  - **`x-forwarded-for`-Abhängigkeit:** Ohne Cloudflare liefert `cf-connecting-ip` nichts. Das per-IP-Rate-Limit (`src/lib/rate-limit.ts`) hängt daran, dass Coolify/Traefik `x-forwarded-for`/`x-real-ip` korrekt durchreichen — sonst kollabieren alle Clients auf `'unknown'` (ein gemeinsamer Bucket). **Beim Deployment verifizieren.**
  - **Kein Edge-DDoS/Bot-Schutz:** Origin-IP ist exponiert; volumetrische Angriffe treffen den Server direkt. Für V1 (geringe Last) akzeptiert.
  - **Email-Obfuscation entfällt:** Kontakt-Mail im Impressum ist scrapebar → mehr Spam. Bei Bedarf im Code obfuskieren.
  - **Rate-Limit ist per-Prozess**, nicht global über mehrere Replicas — für V1 Single-Instance ausreichend.

## Umsetzung (Session 06)

- `src/lib/rate-limit.ts` — geteilte Rate-Limit-Util + `getClientIp` (Fallback-Kette ohne CF)
- `/api/subscribe` — Rate-Limit 5/IP/h + Honeypot + Time-Trap
- `/api/validate` — auf dieselbe Util umgestellt
- `src/lib/rate-limit.test.ts` — 6 Tests

## Offen

- Falls echter Bot-Druck auftritt: CAPTCHA nachrüsten — Empfehlung **Friendly Captcha** (EU-gehostet, DSGVO-konform, kein Cloudflare).
- Spec `7_Deployment_Ops.md` sollte ratifiziert werden (Cloudflare-Abschnitte entfernen; nennt zudem fälschlich „Resend" statt Brevo).

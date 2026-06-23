---
type: project_tech_guidelines
project: aiclaration
extends: "[[04_Tools_Tech/00_Index|Globaler Tech-Stack]]"
tech_stack: [Next.js, Ajv, Stripe, Resend, Brevo, Hetzner+Coolify, Bitwarden]
---

# Tech-Stack — aiclaration

Erweitert [[04_Tools_Tech/00_Index|03_Tools_Tech (Global)]]. Nur aiclaration-spezifische Regeln stehen hier.

---

## Architektur-Entscheidung: Static-First + Single Edge Function

> **Leitsatz:** V1 ist maximal stateless. Kein Backend-Server. Kein Daten-Speicher. Nur eine einzige Edge Function für den URL-Validator.

### V1 — Architektur-Übersicht

```
Browser
  └── Next.js Static Export (Landingpage, Generator-Wizard, Validator-UI)
        └── Next.js API Route auf Hetzner VPS (Coolify-managed, /api/validate)
              └── Externe Ziel-URL (/.well-known/ai-transparency.json)
```

### V1 — Stack-Tabelle

| Schicht | Technologie | Begründung |
|---|---|---|
| Frontend | Next.js 15 Static Export (`output: 'export'`) | Kein SSR — stateless, keine Server-Kosten |
| Styling | Tailwind CSS | Standard-Stack |
| Hosting | Hetzner EU + Coolify (EU Region) | VPS-Hosting EU-only, DSGVO-konform |
| Validator | Next.js API Route auf Hetzner VPS (Coolify-managed, TypeScript) | URL-Fetch + Ajv JSON-Schema-Validation |
| Zahlungen | Stripe (EU) | Subscription, kein eigenes Payment-Handling |
| E-Mail transaktional | Resend | System-Alerts, Badge-Ablauf-Warnungen |
| E-Mail Marketing | Brevo | Free→Paid-Conversion, Agency-Outreach |
| Secrets | Bitwarden CLI (EU) | KEINE .env-Dateien in Repo |

### V2 — Erweiterungen (nach Market-Validation)

| Schicht | Technologie | Begründung |
|---|---|---|
| Signierte Badge-URLs | Rust (WASM) | Kryptografisch fälschungssichere Badge-Verification |
| Agency-Dashboard | Next.js App Router | Multi-Domain-Verwaltung (erst V2) |
| PDF-Audit-Report | Puppeteer (Hetzner EU + Coolify) | SHA-256-Timestamp, serverless |
| Automatische Checks | Hetzner EU + Coolify Cron Jobs | Weekly URL-Validation ohne eigenen Server |

---

## Kernkomponente: URL-Validator API Route (`/api/validate`)

Die einzige nicht-statische Komponente (Next.js API Route, Hetzner VPS, Coolify-managed). Besonderer Fokus auf Sicherheit.

### Ablauf

```
1. Request: POST { url: "https://example.com" }
2. Validierung: URL-Format + Allowlist-Check (nur http/https)
3. Fetch: GET https://example.com/.well-known/ai-transparency.json
   - Timeout: 5 Sekunden (hard)
   - Max Response Size: 50 KB
   - Redirect-Limit: max. 2
4. Schema-Validation: Ajv + JSON-Schema (lokal, kein Netzwerk)
5. Response: { status: "VALID" | "INVALID" | "NOT_FOUND" | "FORMAT_ERROR", details: [...] }
```

### SSRF-Protection (Pflicht V1)

```typescript
// Blockliste — private IP-Ranges nicht erlaubt
const BLOCKED_PATTERNS = [
  /^https?:\/\/localhost/i,
  /^https?:\/\/127\./,
  /^https?:\/\/10\./,
  /^https?:\/\/172\.(1[6-9]|2\d|3[01])\./,
  /^https?:\/\/192\.168\./,
  /^https?:\/\/169\.254\./,   // Link-local / Cloud metadata (AWS, Azure, GCP, Hetzner)
  /^https?:\/\/0\./,
  /^https?:\/\/\[::1\]/,      // IPv6 loopback
  /^https?:\/\/metadata\./i,  // Cloud metadata endpoints
];
```

### Rate Limiting

- Max. 10 Validator-Requests / IP / Minute (Next.js Middleware auf Hetzner VPS)
- Free-Plan: 1 manueller Check gesamt (Stripe-gesteuertes Flag, kein Login nötig in V1 → Cookie-basiert)
- Paid-Plan: automatische Checks via Hetzner VPS Cron Job (Coolify-managed, kein manuelles Rate-Limit)

---

## JSON-Schema (ai-transparency.json)

Pflichtfelder (Validation schlägt fehl wenn fehlend):

```json
{
  "$schema": "https://json-schema.org/draft/07/schema",
  "required": ["version", "last_updated", "ai_content_policy", "contact", "legal_basis"],
  "properties": {
    "version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date" },
    "ai_content_policy": {
      "type": "object",
      "required": ["uses_ai_content"],
      "properties": {
        "uses_ai_content": { "type": "boolean" },
        "content_types": { "type": "array", "items": { "type": "string" } },
        "labeling_method": { "type": "string" },
        "human_review": { "type": "boolean" },
        "tools_used": { "type": "array", "items": { "type": "string" } }
      }
    },
    "contact": { "type": "string" },
    "legal_basis": { "type": "string" }
  }
}
```

---

## Abhängigkeiten (npm, exakte Versionen — kein ^ oder ~)

```
# V1 Core
next@15.x.x                  # EXACT VERSION PINNING
ajv@8.x.x                    # JSON Schema Validation
ajv-formats@2.x.x            # date, email Formate
tailwindcss@3.x.x

# Stripe + Email
stripe@14.x.x
@resend/node@3.x.x

# Versionspinning-Pflicht: Änderungen nur nach manuellem Security Review
```

---

## Paranoid Mode (5 Schutzschichten — Pflicht V1)

1. **Meta-Tags:** `<meta name="robots" content="noindex,nofollow,noarchive">` auf allen Legal-Routen (/impressum, /datenschutz, /agb)

2. **E-Mail-Obfuskation:** Betreiber-E-Mail nie im Klartext im Source-Code. Darstellung via CSS-Reverse oder JS-Decode (Base64).

3. **Cloudflare (Pflicht vor Launch):** Bot Fight Mode + Email Address Obfuscation. Hetzner EU + Coolify → Custom Domain → Cloudflare Proxy aktivieren.

4. **Sitemap:** /impressum, /datenschutz, /agb explizit aus `next-sitemap.config.js` ausschließen.

5. **robots.txt — Total Blockade:**
```
User-agent: GPTBot
Disallow: /
User-agent: Claude-Web
Disallow: /
User-agent: ia_archiver
Disallow: /
User-agent: *
Allow: /
```

---

## Stripe-Integration

- **Webhook-Signatur-Validation:** `stripe.webhooks.constructEvent()` — ZWINGEND. Kein unvalidierter Webhook-Empfang.
- **AVV mit Stripe:** Kein separater AVV — Stripe integriert DSGVO-konforme Datenverarbeitungsbedingungen (DPA) in Standard-AGB. *(Entscheidung 2026-04-08: kein eigener AVV gewünscht)*

---

## Bekannte V1-Limitationen

- **Cookie-basiertes Free-Limit:** Soft-Limit (löschbar durch User). Für V1 akzeptabel — kein skalierbares Missbrauchsszenario. V2: IP-Hash + Stripe Customer ID.
- **DNS-Rebinding:** Validator-SSRF-Schutz schützt nicht gegen DNS-Rebinding-Angriffe. V1-Risiko akzeptabel (kein Produktionsbackend). V2: Response-IP-Validation nach DNS-Auflösung.
- **Hosted-JSON V1:** Statische Dateien auf Hetzner EU + Coolify, manuelle/halbautomatische Anlage durch Betreiber nach Stripe-Payment. Automatisierung erst V2.

---

## Architektur-Philosophie

1. **Stateless First:** Kein Nutzer-Daten-Speicher in V1. Kein Login. Kein Session-State serverseitig.
2. **Single Point of Network:** Nur die Validator-Edge-Function macht ausgehende Requests — alles andere ist statisch.
3. **SSRF Zero-Tolerance:** Private IPs, Loopback, Cloud-Metadata-Endpoints hart geblockt.
4. **Schema-Lokal:** JSON-Schema-Validation läuft lokal in der Edge Function — keine externe Validation-API.
5. **EU-Only:** Hetzner EU + Coolify Region `fra1` (Frankfurt) — keine US-Datenverarbeitung.

---

## Content-Labeling Snippet (V1)

> **EINFACH:** Ein HTML-Schnipsel den Unternehmen in ihre Website einfügen — kein Tool, kein Service.
> **PROFESSIONELL:** Offizielles Format für Content-Layer (inline disclosure).
> **RECHTSICHER:** Kein Rechtsrat — technisches Hilfsmittel. RDG-Disclaimer immer sichtbar.

### Was es ist

Ein Copy-Paste-HTML-Schnipsel für inline disclosure. Löst den Content-Layer für Unternehmen die noch gar keinen haben.

### Spezifikation

**Standard-Schnipsel (für jede Seite):**
```html
<!-- Dieser Text enthält KI-generierte Inhalte gemäß EU AI Act Art. 50(4) -->
```

**Blog-Post-Schnipsel:**
```html
<p class="ai-disclosure">Dieser Blogbeitrag wurde mit KI-Unterstützung erstellt.</p>
```

**CSS (optional):**
```css
.ai-disclosure {
  font-size: 0.75rem;
  color: #64748b;
  border-left: 3px solid #e2e8f0;
  padding-left: 1rem;
  margin-top: 2rem;
}
```

### Wo es lebt

- **Generator-Wizard Step 3:** Nach der Frage "Kennzeichnen Sie KI-Inhalte?" → Schnipsel anzeigen
- **Separate Page:** `aiclaration.de/snippet` (optional, für SEO)
- **FAQ:** Verlinkung auf "Wie kennzeichne ich einzelne Texte?"

### RDG-Pflicht (immer dabei)

> "Dieser Schnipsel hilft Ihnen bei der Umsetzung. Für rechtsverbindliche Beratung zur Kennzeichnung: Rechtsanwalt."

### Kein eigenes Tool

Das Snippet ist:
- **Kein Service** — niemand muss sich registrieren
- **Kein Tracking** — kein Pixel, kein Cookie
- **Frei verwendbar** — auch ohne unser Tool nutzbar
- **Open Source** — Teil der Spec auf GitHub

---

## Coalition-Strategie (Adoption sichern)

### Founding Members (Pre-Launch)

10 Unternehmen erhalten Lifetime Pro Plan (0 € statt 99 €/Monat).
Gegenleistung: Logo + Case Study + öffentliches Statement.

### Ziel

Social Proof VOR Launch. Die Coalition beweist: "Das Format wird ernst genommen."
Pressemitteilung: "X Unternehmen nutzen bereits ai-transparency.json als Industry Standard."

### Technische Umsetzung

- Founding Member Logos: SVG auf Landingpage (statisch, kein Login nötig)
- Case Studies: Eine Seite `/founders` mit Logo + Kurzbeschreibung
- Öffentliches Statement: Zitat (2–3 Sätze) pro Founding Member

### V2-Erweiterung (nach Market-Validation)

- **Signierte Badge-URLs:** Rust (WASM) für kryptografisch fälschungssichere Badge-Verification
- **Agency-Dashboard:** Multi-Domain-Verwaltung
- **PDF-Audit-Report:** Puppeteer (Hetzner EU + Coolify), SHA-256-Timestamp
- **Automatische Checks:** Hetzner EU + Coolify Cron Jobs (Weekly URL-Validation)

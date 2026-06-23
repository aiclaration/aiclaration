# 7. Operations

> **Projekt:** [[1_Lastenheft|1_Lastenheft]] · **State:** [[5_ClaudeCode_State|5_State]] · **Stack:** [[3b_Tools_Tech|3b_Tools_Tech]]

---

## Domain & DNS

| Property | Wert |
|---|---|
| **Domain** | `aiclaration.de` |
| **Registrar** | (noch nicht eingetragen — bitte bestätigen) |
| **DNS** | Cloudflare Proxy — alle Records über CF |
| **A-Record** | `aiclaration.de` → Hetzner EU + Coolify Deployment IP |
| **CNAME** | `www.aiclaration.de` → `aiclaration.de` |
| **/.well-known/** | Immer erreichbar unter `aiclaration.de/.well-known/` |

### DNS-Setup (Cloudflare)

```
Type    Name    Content                 Proxy    TTL
A       @       Hetzner EU + Coolify Deployment IP     Cloudflare   Auto
CNAME   www     aiclaration.de          Cloudflare   Auto
```

### Vor Launch (Paranoid Mode)

1. Cloudflare Bot Fight Mode aktivieren
2. Cloudflare Email Address Obfuscation aktivieren
3. SSL/TLS Mode: "Full" (strict nicht nötig bei Hetzner EU + Coolify)

---

## Build Pipeline

### CI/CD Flow

```
GitHub (main branch)
  │
  ├── [Push / PR]
  │     └── GitHub Actions
  │           │
  │           ├── Step 1: npm ci
  │           │     └── Install dependencies (package.json — exakte Versionen)
  │           │
  │           ├── Step 2: npm run lint
  │           │     └── ESLint (Frontend Code)
  │           │
  │           ├── Step 3: npm run build
  │           │     └── Next.js Static Export (`output: 'export'`)
  │           │           Output: /out directory
  │           │
  │           ├── Step 4: Vitest (Unit Tests)
  │           │     └── 90%+ Coverage Pflicht
  │           │
  │           └── Step 5: Deploy to Hetzner EU + Coolify
  │                 └── Hetzner EU + Coolify EU (fra1)
  │                       ├── Static Files → CDN
  │                       └── Next.js API Route /api/validate (Node.js, Coolify-managed)
```

### Build-Skripte (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## Secret Management (Bitwarden CLI)

> **HARD RULE:** Keine .env-Dateien im Repo. Alle Secrets via Bitwarden CLI.

### Bitwarden Setup

```bash
# Secrets abrufen (Bitwarden CLI — EU Server)
bw login --server https://vault.bitwarden.eu
bw unlock

# Projekt-Secrets konfigurieren
export BW_SESSION=$(bw unlock --passwordfile ~/.bitwarden/password)

# RESEND_API_KEY
bw get password "aiclaration/RESEND_API_KEY"

# STRIPE_SECRET_KEY
bw get password "aiclaration/STRIPE_SECRET_KEY"

# STRIPE_WEBHOOK_SECRET
bw get password "aiclaration/STRIPE_WEBHOOK_SECRET"

# BREVO_API_KEY
bw get password "aiclaration/BREVO_API_KEY"
```

### Hetzner EU + Coolify Environment Variables

Alle Secrets in Hetzner EU + Coolify Dashboard → Project → Settings → Environment Variables:

| Name | Wert-Quelle | Zugriff |
|---|---|---|
| `RESEND_API_KEY` | Bitwarden | Production + Preview |
| `STRIPE_SECRET_KEY` | Bitwarden | Production + Preview |
| `STRIPE_WEBHOOK_SECRET` | Bitwarden | Production Only |
| `BREVO_API_KEY` | Bitwarden | Production + Preview |

---

## Deployment-Umgebungen

### Umgebungen

| Umgebung | URL | Trigger |
|---|---|---|
| **Preview** | `aiclaration.Hetzner EU + Coolify.app` | Jeder PR → Auto-Deploy |
| **Production** | `aiclaration.de` | Push auf `main` branch |

### Production-Deploy Checkliste

- [ ] Cloudflare Proxy aktiviert
- [ ] Bot Fight Mode + Email Obfuscation
- [ ] SSL/TLS Mode: Full
- [ ] robots.txt: AI-Crawler blockiert
- [ ] sitemap.xml: legal routes ausgeschlossen
- [ ] meta robots: noindex auf /impressum, /datenschutz, /agb
- [ ] Bitwarden Secrets in Hetzner EU + Coolify konfiguriert
- [ ] Stripe Webhook-Endpoint konfiguriert
- [ ] Resend DNS verifiziert
- [ ] Brevo API-Key verifiziert

---

## Monitoring & Alerts

### Uptime

- **Hetzner EU + Coolify Uptime Monitoring:** Inklusive (kein externe Service nötig)
- **Bei Downtime:** Resend Alert an Betreiber-E-Mail

### Logs

- **API Route Logs:** Hetzner EU + Coolify Dashboard → Applications → Logs (Node.js stdout)
- **Cloudflare Logs:** Cloudflare Analytics
- **Keine Textinhalte in Logs** (DSGVO-Requirement)

### Error Handling

1. Edge Function Error → Resend Alert (max 1/Minute)
2. Stripe Webhook Error → Retry via Stripe (automatic)
3. SSRF-Fehler → Kein Alert (erwartetes Verhalten)

---

## Backup & Recovery

- **Code:** GitHub Repo (automatisch)
- **Konfiguration:** Hetzner EU + Coolify (im Dashboard)
- **Secrets:** Bitwarden (Backup im Bitwarden Vault)
- **Domain:** Registrar (manuell bei Registrar geparkt)
- **Recovery:** Kein Disaster-Recovery-Skript nötig (stateless)

---

## Running Costs

| Service | Plan | Kosten/Monat |
|---|---|---|
| Hetzner EU + Coolify | Hobby (Free) | 0 € |
| Domain (aiclaration.de) | Registrar | ~1 €/Monat (12 €/Jahr) |
| Cloudflare | Free Tier | 0 € |
| Resend | Trial (100 E-Mails/Tag) | 0 € |
| Brevo | Free | 0 € |
| **Gesamt** | | **~1 €/Monat** |

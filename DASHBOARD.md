# aiclaration Dashboard

**Status:** In Development (Session 13, 2026-06-27) — **Finaler 360° Legal-Check (Paranoid) + alle Findings gefixt** ✅ Score 84/100 🟢 (H2 ROISection-UWG, M1 toter Waitlist-Anker, M2 Rechtsgrundlage→Einwilligung/§7 UWG, M3 Art.50(4)-Überzeichnung, M4 ROI-Mathe, M5 Phase-Versatz, A11y) · Phase-1-Funktionstest grün (53 Tests/Build, Stiller-Erfolg-Bug gefixt) · **Legal-Stand committet** (war uncommitted = Deploy-Falle) · Offen: M2 anwaltlich freigeben · Nächstes: Branch→main, Hetzner/Coolify Deployment
**Quelle:** [[4_Pflichtenheft|00_Specs/4_Pflichtenheft.md]] (authoritative)
**Regeln:** [[CLAUDE|CLAUDE.md]] · **Sessions:** [[2026-06-19_session-01|01]] · [[2026-06-19_session-02|02]] · [[2026-06-19_session-03|03]] · [[2026-06-19_session-04|04]] · [[2026-06-19_session-05|05]] · [[2026-06-22_session-06|06]] · [[2026-06-23_session-07|07]] · [[2026-06-23_session-08|08]] · [[2026-06-23_session-09|09]] · [[2026-06-23_session-10|10]] · [[2026-06-24_session-11|11]] · [[2026-06-27_session-12|12]] · [[2026-06-27_session-13|13]]

---

## V1 Build-Reihenfolge

### Phase 0: Pre-Launch-Aktivitäten (PARALLEL zu Build — ZEITKRITISCH!)

> **August 2026 = ~6 Wochen**. Diese Phase muss SOFORT laufen — nicht nach Build.

#### 0.1 Pre-Launch Coalition (10 Founding Members)
  - [ ] 3–10 Unternehmen kontaktieren (LinkedIn, IHK, Netzwerk)
  - [ ] Angebot: Lifetime Pro Plan (0 €) + Featured auf Landingpage
  - [ ] Gegenleistung: Logo + öffentliches Statement
  - [ ] Fallback: 3 Founding Members als MVP-Schwelle
  - [ ] Logo-Assets für Landingpage anfordern

#### 0.2 IANA-Registrierung (Moat — Pflicht!)
  - [ ] GitHub-Repo anlegen (aiclaration/ai-transparency-json-spec)
  - [ ] Spec-Dokumentation auf aiclaration.de/spec live (✅ Seite gebaut Session 03)
  - [ ] IANA Well-Known URI Registrierungsantrag einreichen
  - [ ] Status: AUSSTEHEND — wurde Einreichung bereits gestartet?

---

### Phase 1: Landingpage + E-Mail-Capture

#### 1.0 Rechtliche Pflicht-Seiten (VOR Launch-Pflicht!)
  > Ohne diese Seiten darf die Website in Deutschland NICHT live gehen (§5 DDG, DSGVO)
  - [x] `/impressum` — Template gebaut (Platzhalter noch auszufüllen!)
  - [x] `/datenschutz` — Template gebaut (Platzhalter noch auszufüllen!)
  - [x] `/agb` — Template gebaut (Platzhalter noch auszufüllen!)
  - [x] `/nutzungsbedingungen` — Template gebaut
  - [x] **FOUNDER-AUFGABE:** Alle `[PLACEHOLDER]` in Rechtseiten ersetzt ← **Session 06** (Stephan Ochmann, c/o Postflex Greven, +49 2363 8072515, info@aiclaration.de, Stand 22.06.2026, Gerichtsstand Greven, Freebie = „KI-Transparenz-Generator", Regulierung = EU AI Act Art. 50). Build grün, 0 Platzhalter.
  - [x] **360° Legal-Check** via `website-legal-check`-Skill ← **Session 07** (Score ~78/100 🟡) + **Session 11 Re-Check** (Score ~86/100 🟢) — Session 11: 3 neue Blocker behoben (TrustSection absolute Privacy-Claims, PricingSection Phase-Versatz Paid-Pläne, EmailCaptureSection "DSGVO-konform"), LDI NRW als Aufsichtsbehörde ergänzt. Build grün 19/19.
  - [x] ~~c/o-Postflex als ladungsfähige Anschrift~~ — ✅ **GELÖST per Gutachten IT-Recht Kanzlei München (17.02.2026)**: BGH V ZR 210/22, Format korrekt. **Founder-Restpunkte:** PostIdent abgeschlossen? + Postflex AVV unterschrieben?
  - [x] **SIGNUP_SOURCE in DSE §7** — ✅ **GELÖST (Session 09)**: „Quellkanal der Anmeldung" in §7 Brevo-Abschnitt ergänzt
  - [x] **Postflex als Auftragsverarbeiter in DSE** — ✅ **GELÖST (Session 09)**: Neuer §8 „Briefkorrespondenz (Postflex)" mit Art. 28 DSGVO-Verweis
  - [x] ✅ **Hetzner-Serverstandort Nürnberg bestätigt** ← **Session 13 (2026-06-27)** (Founder-Bestätigung) — konsistent mit DSE §5 + Footer

#### 1.1 Landingpage bauen
  - [x] Hero + CTA + Countdown-Timer (`HeroSection.tsx` + `DeadlineCountdown.tsx`) ← **Session 03**
  - [x] Problem-Diagnose (`ProblemSection.tsx`)
  - [x] Freebie-Demo (`BetroffenheitsCheckSection.tsx` + `GeneratorSection.tsx` als LP-Mock)
  - [x] Validator-Teaser (`ValidatorSection.tsx`)
  - [x] Trust + Security (`TrustSection.tsx`)
  - [x] ROI-Sektion (`ROISection.tsx`) ← **Session 03** — vorher fehlte diese!
  - [x] E-Mail-Capture (`EmailCaptureSection.tsx`)
  - [x] Pricing mit korrekten Features (`PricingSection.tsx`) ← **Session 03** — "1× check" entfernt
  - [x] FAQ + Footer (`FaqCtaSection.tsx` + `FooterSection.tsx`)

#### 1.2 E-Mail-Capture implementieren
  - [x] `EmailCaptureSection.tsx` — Dark-Section auf Landingpage
  - [x] `/api/subscribe` — Brevo DOI (`POST /v3/contacts/doubleOptinConfirmation`)
  - [x] Consent-Checkbox (DSGVO-konform)
  - [x] `/bestaetigt` — DOI-Confirmation-Landingpage
  - **Brevo-Setup (User-Aufgabe) — Stand 2026-06-23:**
    - [x] Brevo-Account angelegt
    - [x] Domain-Authentifizierung `aiclaration.de` ← **Session 10** — IONOS: brevo-code TXT + DKIM1/2 CNAMEs + SPF erweitert (`include:sendinblue.com`) + DMARC TXT (`rua@dmarc.brevo.com`). Status in Brevo: Authentifiziert ✅
    - [x] AVV / DPA unterzeichnen (Brevo + Hetzner) ← **2026-06-22**
    - [x] Sender-Adresse `info@aiclaration.de` verifiziert ← **Session 10**
    - [x] Kontaktliste angelegt → `BREVO_LIST_ID=2` ← **Session 10**
    - [x] DOI-Template (ID=1, aktiv) — Button-Link `{{ doubleoptin }}` ← **Session 10**
    - [x] API-Key erstellt → Bitwarden (`me/aiclaration-brevo-api-key`) ← **Session 10**
  - [x] Env vars live setzen: `BREVO_API_KEY`, `BREVO_LIST_ID=2`, `BREVO_DOI_TEMPLATE_ID=1`, `NEXT_PUBLIC_APP_URL=https://aiclaration.de` ← **Session 11** ✅

#### 1.3 Deployment
  - [ ] Hosting-Platform einrichten (laut 00_Specs/7_Deployment_Ops.md — Hetzner EU + Coolify)
  - [ ] Domain `aiclaration.de` verbinden — Domain **registriert** ✅ (2026-06-22), DNS-Zone bei **IONOS**. ⚠️ **ENTSCHEIDUNG 2026-06-22: KEIN Cloudflare** (weicht von 7_Deployment_Ops.md ab → [[01_Decisions/ADR-001-kein-cloudflare|ADR-001]] DECIDED)
  - [ ] ~~Cloudflare Bot Fight Mode~~ entfällt → **Bot-/Abuse-Schutz muss App-seitig gelöst werden** (siehe Phase 2.5 + Session-05-Finding #1)
  - [x] `robots.txt` — GPTBot / Claude-Web / ia_archiver + SEO-Scraper blockiert (`public/robots.txt`)
  - [x] `sitemap.xml` — Legal-Seiten ausgeschlossen (`public/sitemap.xml`) ← **Session 04**
  - [ ] Erste 100 E-Mails sammeln **ZIEL** — vor Phase 2 Core-Tool

---

### Phase 2: Kern-Tool / Engine

> Voraussetzung: Phase 1 deployed + Brevo aktiv

#### 2.1 Tool-Seiten (laut Pflichtenheft S6.2)
  - [x] `/check` — Betroffenheits-Check (3 Fragen, Ergebnis-Matrix) ← Session 02
  - [x] `/generate` — Generator-Wizard (Step 0 ACK + 5 Fragen + Client-Side Download) ← Session 02
  - [x] `/validate` — Validator-UI (URL-Input → API-Call → Ergebnis mit 2-Layer-Status) ← **Session 03**
  - [x] `/spec` — ai-transparency.json Spezifikation (SEO + IANA-Referenz) ← **Session 03**
  - [ ] `/badge/[slug]` — Badge-Verification-Page
  - [ ] `/directory` — Öffentliches Verzeichnis verifizierter Unternehmen (statisches JSON)

#### 2.2 Interaktive Komponenten (laut Pflichtenheft S5)
  - [x] `BetroffenheitsCheck.tsx` — 3-Fragen-Flow ← Session 02
  - [x] `GeneratorWizard.tsx` — 6-Step Wizard + JSON-Download + Content-Labeling Snippet + Zero-Tech-Option ← **Session 03**
  - [x] `ValidatorForm.tsx` — URL-Input + Submit ← **Session 03**
  - [x] `ResultDisplay.tsx` — VALID/INVALID/NOT_FOUND + 2-Layer-Status ← **Session 03**
  - [x] `DeadlineCountdown.tsx` — Countdown bis August 2026 ← **Session 03**
  - [x] `ROISection.tsx` — ROI-Vergleich Anwalt vs. aiclaration ← **Session 03**

#### 2.3 API Endpoints (laut Pflichtenheft S7)
  - [x] `/api/subscribe` — Brevo DOI ← Session 02
  - [x] `/api/validate` — URL-Fetch + Ajv-Schema-Validation + SSRF-Protection ← **Session 03**

#### 2.4 Lib / Core-Logik (laut Pflichtenheft S6.3)
  - [x] `src/lib/schema.ts` — Ajv JSON-Schema für `ai-transparency.json` ← **Session 03**
  - [x] `src/lib/ssrf.ts` — SSRF-Protection: Regex-Blocklist + IP-Resolution gegen DNS-Rebinding ← **Session 04 gehärtet**

#### 2.5 Security & Ops
  - [x] Security Headers — vollständig: CSP, HSTS, Permissions-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ← **Session 04**
  - [x] `robots.txt` — GPTBot / Claude-Web / ia_archiver blockiert (`public/robots.txt`)
  - [x] `sitemap.xml` — Legal-Seiten ausgeschlossen ← **Session 04**
  - [x] Rate Limiting `/api/validate` — in-memory, 10 Req/IP/Min, mit Eviction-Sweep gegen Memory-Leak ← **Session 04**
  - [x] SSRF: manuelles Redirect-Following (max. 2 Hops, jeder Hop re-validiert) — spec-konform S7.1 ← **Session 04**
  - [x] `/api/validate` → Node-Runtime erzwungen (DNS-Auflösung nicht Edge-fähig) ← **Session 04**
  - [x] `src/lib/rate-limit.ts` — geteilte Rate-Limit-Util + `getClientIp` (von `/api/validate` + `/api/subscribe` genutzt, DRY) ← **Session 06**
  - [x] Bot-/Abuse-Schutz `/api/subscribe` — Rate-Limit (5/IP/h) + Honeypot-Feld + Time-Trap; ersetzt entfallenen Cloudflare Bot Fight Mode ← **Session 06**
  - [x] Production-Build grün (`npm run build` — 15 Routen, TypeScript + Lint sauber) ← **Session 04/06**

#### 2.6 Offene Entscheidungen
  - [ ] **Zero-Tech-Option in V1 oder V1.5?** — Session 03 Empfehlung: V1, weil 60-70% der Zielgruppe ohne Serverzugang sind. `/v/[slug]` hosted bei aiclaration. Zero-Tech-Anfrage per E-Mail bereits in Generator-Done-Step eingebaut.
  - [ ] **Billing: Polar MoR oder Stripe?** — Pflichtenheft sagt Stripe. Dashboard Phase 4 sagt "Polar MoR oder Stripe". Entscheidung vor Badge-Launch.
  - [ ] **SPEC-DEFEKT: `labeling_method` Enum `"ai Generated"`** (Pflichtenheft S6.3, Zeile 645) ist malformt (Leerzeichen + Großbuchstabe). Schema reproduziert es spec-treu, der Generator erzeugt es nie. Empfehlung: Pflichtenheft auf `"ai_generated"` korrigieren (Spec ist READ-ONLY — Founder-Freigabe nötig), dann `schema.ts` angleichen.
  - [ ] **SPEC-KONFLIKT: Content-Type-Härte** (Pflichtenheft S7.1 Step 5: „muss application/json sein") kollidiert mit unserer eigenen Zero-Tech-Empfehlung (GitHub Gist/CDN liefern oft `text/plain`/`octet-stream`). Session 04 hat den Validator pragmatisch entschärft (Content-Type = beratend, maßgeblich ist „parst als JSON + Schema-Match"). Empfehlung: Pflichtenheft entsprechend ratifizieren.

---

### Phase 3: Tests

#### 3.1 Unit Tests (Vitest)
  > Hinweis Session 06: vitest-Default-Environment auf `node` gestellt (jsdom war konfiguriert, aber nicht installiert). Für künftige React-Komponenten-Tests `jsdom` installieren + Environment zurückstellen.
  - [x] `rate-limit.test.ts` — Limiter-Verhalten + `getClientIp` (6 Tests) ← **Session 06**
  - [x] `schema.test.ts` — S9.2 Fälle 1–8 auf Schema-Ebene + Format-/Enum-Härte (13 Tests) ← **Session 06**. ⚠️ Dabei **Laufzeit-Bug gefunden+gefixt**: `$schema`-URI war `https://…` (falsch) → `ajv.compile()` warf bei jeder Validierung → `/api/validate` 500. Korrigiert auf `http://json-schema.org/draft-07/schema#`. (S9.2 Fälle 9 NOT_FOUND + 10 MIME sind Route-Verhalten → offen als Route-Integrationstest)
  - [x] SSRF-Protection-Tests — alle 8 Szenarien S9.3 + IP-Layer + normalizeUrl (29 Tests) ← **Session 06**
  - [x] `subscribe-config.test.ts` — `resolveBrevoConfig` Prod-500-Guard vs. Dev-Fallback (5 Tests) ← **Session 12**
  - [ ] Betroffenheits-Check Ergebnis-Matrix (4 Kombinationen)
  - [ ] Generator JSON-Output — korrekte Struktur

#### 3.2 E2E Tests (Playwright)
  - [ ] Generator: Step 0 ACK → 5 Fragen → Download
  - [ ] BetroffenheitsCheck: alle 4 Ergebnis-Pfade
  - [ ] Validator: URL eingeben → Ergebnis anzeigen
  - [ ] E-Mail-Form: Submit → Success-State

---

### Phase 4: Billing + V2

> Erst starten nach: 100+ E-Mails ODER erste Zahlungen

  - [ ] Billing (Entscheidung: Stripe — laut Pflichtenheft)
  - [ ] `/badge/[slug]` — Badge-Verification-Page + SVG-Siegel
  - [ ] Manueller Slug-Prozess nach Stripe-Payment (V1: Admin legt Slug an)
  - [ ] Auth (nur für Badge-paid-Plan falls nötig)
  - [ ] V2-Features (Agency-Dashboard, Auto-Checks, PDF-Report)

---

## Bekannte offene Punkte (aus 360°-Review Session 03)

| Problem | Priorität | Status |
|---|---|---|
| Rechtliche Platzhalter in Impressum/AGB/Datenschutz | 🔴 KRITISCH | ✅ **Ausgefüllt (Session 06)** — offen: c/o-Anschrift ladungsfähig? + Gerichtsstand-Stadt (anwaltliche Restprüfung empfohlen) |
| Pre-Launch Coalition (10 Founding Members) | 🔴 KRITISCH | Nicht gestartet — sofort beginnen |
| IANA-Registrierung eingereicht? | 🔴 KRITISCH | Status unklar |
| Deployment (Hetzner + Coolify) | 🔴 KRITISCH | Noch nicht deployed — 6 Wochen bis Deadline |
| Brevo-Setup (API-Key, DOI-Template, Liste) | 🔴 KRITISCH | **In Arbeit** — Account ✅; offen: Domain-Auth, AVV, Sender, Liste, DOI-Template, API-Key (Detail-Checkliste in Phase 1.2) |
| Zero-Tech-Option Entscheidung | 🟡 WICHTIG | V1-Empfehlung: ja (per E-Mail anfragen bereits eingebaut) |
| /badge/[slug] Seite | 🟡 WICHTIG | Noch nicht gebaut |
| /directory Seite | 🟡 WICHTIG | Noch nicht gebaut |
| Billing-Entscheidung (Stripe vs. Polar) | 🟡 WICHTIG | Ausstehend |

### Findings aus Audit Session 05 (2026-06-19) — Status nach Session 06 (2026-06-22)

| Problem | Priorität | Status |
|---|---|---|
| **`/api/subscribe` ohne Missbrauchsschutz** — E-Mail-Bombing-Vektor. | 🔴 KRITISCH vor Launch | ✅ **GELÖST (Session 06)** — Rate-Limit (5/IP/h) + Honeypot + Time-Trap; ersetzt den entfallenen Cloudflare Bot Fight Mode |
| **Stiller Erfolg in `/api/subscribe`** — bei fehlenden Brevo-Env-Vars Rückgabe `{message:'ok'}`/200; Nutzer sieht „Fast geschafft!", obwohl nichts gespeichert wird. Fix: in Produktion laut fehlschlagen, nur in Dev schlucken. | 🟡 WICHTIG | ✅ **GELÖST (Session 12)** — `resolveBrevoConfig` (`src/lib/subscribe-config.ts`) + `route.ts`: in Prod **HTTP 500** bei fehlender Var, nur in Dev 200-Fallback. E2E via Prod-Build verifiziert (500/Honeypot-200/400). 5 neue Tests. `.env.example`-Kommentar korrigiert. |
| **Tests** — Pflichtenheft S9.2/S9.3 verlangt 10 Schema- + 8 SSRF-Szenarien. | 🔴 KRITISCH (Spec-Pflicht) | **Weitgehend gelöst (Session 06)** — 48 Tests grün: SSRF S9.3 vollständig, Schema S9.2 Fälle 1–8. Offen: S9.2 #9/#10 (Route-Level) + E2E. **Bonus: Laufzeit-Bug in schema.ts gefunden+gefixt** (`$schema`-URI → `/api/validate` 500) |
| **Spec-Defekt `labeling_method: 'ai Generated'`** weiterhin live in `schema.ts:36` (malformt). Founder-Freigabe nötig (00_Specs READ-ONLY). | 🟡 WICHTIG | Offen — Entscheidung Founder |
| **Ungeprüft:** kein Dev-Server/Browser-Test diese Session — Lighthouse, a11y-Audit, echte E2E sind ungeprüft, nicht „grün". | 🟡 WICHTIG | Offen |

### Findings aus Audit Session 06 (2026-06-22, nach Rechtsseiten + Bot-Schutz)

| Problem | Priorität | Status |
|---|---|---|
| **Datenschutz widersprach dem Validator** — behauptete „alles lokal / einzige Serververbindung = E-Mail", obwohl `/api/validate` die URL serverseitig abruft. | 🔴 KRITISCH (DSGVO-Genauigkeit) | ✅ **GELÖST (Session 06)** — §1 präzisiert + ehrlicher Validator-Absatz in §8 (Art. 6 I f, keine Speicherung, IP nur transient fürs Rate-Limit) |
| **Drei verschiedene Kontakt-Mails** (info@/presse@/hello@). | 🟡 WICHTIG | ✅ **GELÖST (Session 06)** — auf Founder-Wunsch alle → `info@aiclaration.de` |
| **robots.txt fehlerhaft** — Cloudflare-Block (trotz ADR-001 kein CF), doppelte User-agents, zwei `*`-Gruppen, /en/-Verweise. | 🟡 WICHTIG | ✅ **GELÖST (Session 06)** — neu geschrieben: eine Gruppe/UA, kein CF-Block, valide |
| **Datenschutz behauptet AVV „liegt vor/abgeschlossen"** (Hetzner §5 + Brevo §7). | 🔴 KRITISCH vor Launch | ✅ **ERLEDIGT (2026-06-22)** — Founder bestätigt: beide AVVs (Hetzner + Brevo) unterschrieben → Datenschutz-Aussagen sind jetzt korrekt |
| **Favicon** (Browser-Tab + iOS + PWA-Manifest). | 🟡 WICHTIG | ✅ **ERLEDIGT (2026-06-22)** — `icon.svg` (Slate-800-Siegel + Emerald-Haken) + `favicon.ico` + `apple-icon.png` + `icon-192/512.png` + `manifest.ts`; via sharp generiert (Skript `scripts/gen-favicons.mjs`), Build grün, Render geprüft |
| **Kein Open Graph / Social-Preview** (`layout.tsx`). | 🟢 ZURÜCKGESTELLT | **Founder-Entscheidung 2026-06-22: vorerst kein Social-Media.** Bei Bedarf später via `og-image` Skill |
| **info@aiclaration.de Postfach** muss real existieren + Mails empfangen (Impressums-Pflicht). | 🔴 KRITISCH vor Launch | ✅ **ERLEDIGT (2026-06-22)** — Founder bestätigt: Postfach ist real und empfängt |
| **Lighthouse / WCAG 2.2 AA (axe) / E2E** nie ausgeführt (Spec S9.4). | 🟡 WICHTIG | Offen |

---

## Spec-Referenzen

| Spec | Link |
|------|------|
| Pflichtenheft (authoritative) | [[4_Pflichtenheft]] |
| Styleguide | [[6_Styleguide]] |
| Tech-Stack | [[3b_Tools_Tech]] |
| Deployment | [[7_Deployment_Ops]] |
| ADR-Register | [[01_Decisions/00_Index]] |

---

## Sessions

| Session | Datum | Status | Highlight |
|---------|-------|--------|-----------|
| Session 01 | 2026-06-19 | ✅ | Vault Setup, Scaffolding, DASHBOARD |
| Session 02 | 2026-06-19 | ✅ | /check, /generate, EmailCapture, /api/subscribe |
| Session 03 | 2026-06-19 | ✅ | 360°-Review + alle kritischen Fixes: /validate, /api/validate, /spec, ROI-Sektion, Countdown, Content-Labeling Snippet, Zero-Tech-Option, Pricing-Fix, SSRF+Schema, DASHBOARD-Komplettierung |
| Session 04 | 2026-06-19 | ✅ | Security-Audit + Härtung: SSRF-Redirect-Fix (DNS-Rebinding), CSP/HSTS-Header, Rate-Limit-Eviction, Content-Type-Entschärfung, Generator-Radio-Bug, sitemap.xml, **Production-Build grün** |
| Session 05 | 2026-06-19 | ✅ | 360°-Audit (nur Dokumentation): Build/Type-Check/Lint live verifiziert grün. Neue Findings: `/api/subscribe` ohne Missbrauchsschutz (E-Mail-Bombing) + stiller Erfolg bei fehlender Config, Null Tests (Spec-Pflicht S9.2/S9.3), Spec-Defekt `'ai Generated'` weiterhin live. Auf Wunsch nur dokumentiert, kein Code-Fix. |
| Session 06 | 2026-06-22 | ✅ | Domain (IONOS) + Brevo-Account. **Kein Cloudflare** ([[01_Decisions/ADR-001-kein-cloudflare\|ADR-001]]). Bot-Schutz `/api/subscribe` (Rate-Limit+Honeypot+Time-Trap) → **Finding #1 gelöst**. SSRF+Schema-Tests (48× grün), **Schema-Laufzeit-Bug gefunden+gefixt**. **Rechtsseiten ausgefüllt** (0 Platzhalter, c/o + Gerichtsstand anwaltlich zu prüfen). Type-Check/Lint/Test/Build grün. |
| Session 07 | 2026-06-23 | ✅ | **360° Legal-Check** (website-legal-check-Skill). 5 kritische Blocker behoben: §-Rendering ("SS"→"§"), ODR-Link entfernt, Dev-Text aus AGB-Heading, "100% DSGVO-konform" → Privacy-by-Architecture, Frankfurt→Nürnberg (Standort-Widerspruch). UWG-Claims bereinigt ("für immer", "unbegrenzt", "immer aktuell", "nie unbemerkt"). Gerichtsstand→"Greven". Build grün. Score: 56→~78/100 🟡 |
| Session 08 | 2026-06-23 | ✅ | **Global Header + Footer** in `layout.tsx`. Neues `Header.tsx` (Logo + 4 Nav-Links). `FooterSection.tsx` um Haftungsausschluss erweitert (EU AI Act Art. 50, Verordnung (EU) 2024/1689). FooterSection aus `page.tsx`, `check/page.tsx`, `generate/page.tsx`, `bestaetigt/page.tsx` entfernt. Build grün. 19 Routen. |
| Session 09 | 2026-06-23 | ✅ | **DSE-Komplettbereinigung**: (1) Neuer §8 Postflex als Auftragsverarbeiter (DSGVO Art. 28), (2) SIGNUP_SOURCE in §7 Brevo ergänzt, (3) alle ASCII-Umlaute bereinigt (fuer→für, gemaess→gemäß usw.), (4) Abschnitt-Nummerierung (§9–11), (5) id="main-content" auf `<main>`. Impressum: "für" statt "fuer" + id="main-content". Build grün 19/19. |
| Session 10 | 2026-06-23 | ✅ | **IONOS + Brevo vollständig eingerichtet**: DNS-Records gesetzt (brevo-code, DKIM1/2, SPF+sendinblue, DMARC TXT mit rua). Domain-Auth grün. Sender `info@aiclaration.de` verifiziert. Kontaktliste `ID=2`. DOI-Template `ID=1` (Button `{{ doubleoptin }}`). API-Key → Bitwarden. IP-Restriction noch nicht aktiviert (Hetzner-IP unbekannt). |
| Session 11 | 2026-06-24 | ✅ | **360° Legal Re-Check** (website-legal-check-Skill, Code + Browser). 3 Blocker behoben: TrustSection Privacy-Claims (absolute Falschaussagen "nie" / "keine personenbezogene Datenspeicherung"), PricingSection Paid-Pläne Phase-Versatz ("In Vorbereitung" + "Auf Warteliste"), EmailCaptureSection "DSGVO-konform" → "Double Opt-In nach § 7 UWG". DSE §11 LDI NRW ergänzt. Score: 78→86/100 🟢. Build grün 19/19. |
| Session 13 | 2026-06-27 | ✅ | **Finaler 360° Legal-Check (Paranoid, Pre-Launch) + alle Findings gefixt.** Score 78→84/100 🟢. 2 HOCH (H1 gesamter Legal-Stand uncommitted = Deploy-Falle → committet; H2 ROISection bewarb nicht-buchbaren Starter als „Empfohlen" → auf kostenloses Produkt umgestellt), 5 MITTEL (M1 toter `/#newsletter`-Anker→`id` ergänzt; **M2 Rechtsgrundlage Newsletter durchgängig auf Einwilligung Art.6 I a + §7 UWG** statt §327-Tauschvertrag — DSE+AGB+NB; M3 Art.50(4)-Überzeichnung entschärft; M4 intransparente ROI-Mathe entfernt; M5 Phase-Versatz Badge/`/validate/[slug]`/Zero-Tech), 4 LOW (prefers-reduced-motion, Footer-Kontrast, FAQ-Tippfehler, Pro-Badge). Verifiziert WAHR: client-seitige Tools, keine ext. Fonts/Tracker, CSP/HSTS sauber, „Code of Practice 10.06.2026" korrekt. type-check/lint/53 Tests/Build grün, Live-Render bestätigt. **Offen: M2 anwaltlich freigeben.** |
| Session 12 | 2026-06-27 | ✅ | **Ausgiebiger Phase-1-Funktionstest + Fix.** type-check/lint/Build grün. Alle 19 Routen 200 (Dev-Server). `/api/subscribe` alle Branches geprüft (valid/honeypot/time-trap/400/400) + **Rate-Limit 5/IP/h exakt bestätigt (6. = 429)**. Security-Header komplett. Impressum/Datenschutz echte Inhalte. **Befund 1 BEHOBEN:** stiller-Erfolg-Failover abgesichert → neue reine Helper-Fn `subscribe-config.ts` (`resolveBrevoConfig`) + `route.ts` gibt in **Prod 500** bei fehlender Brevo-Var (E2E via Prod-Build verifiziert), 5 neue Tests (→ **53 grün**), `.env.example` korrigiert. **Befund 2 offen:** echter Brevo-DOI-Versand erst nach Deployment verifizierbar (lokal keine Keys). |

---

## Quick Commands

```bash
npm run dev       # Dev-Server starten
npm run build     # Production Build prüfen
npm run lint      # ESLint

# Secrets (NIEMALS in .env!)
bw get password me/aiclaration-brevo-api-key

# Nächste Env-Vars (beim Deployment setzen):
# BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID
# NEXT_PUBLIC_APP_URL=https://aiclaration.de
```

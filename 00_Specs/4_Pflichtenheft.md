# 4. Pflichtenheft: aiclaration

> **Projekt-ID:** ID2604071725
> **Lastenheft-Ref:** [[10_Ideen_Projekte/ID2604071725_037_aiclaration/1_Lastenheft|1_Lastenheft]]
> **Tech-Stack:** [[10_Ideen_Projekte/ID2604071725_037_aiclaration/3b_Tools_Tech|3b_Tools_Tech]]
> **Erstellungsdatum:** 2026-04-08
> **Methodik:** Master Pflichtenheft Prompt — ai-transparency.json Standard Validator
> **Prinzip:** Alle Anforderungen aus Lastenheft V1 Scope, Scope V2, Anti-Scope-Creep Firewall sind hier vollständig gemappt.
> **Sprache:** Erklärungen DE | Code/Kommentare EN

---

## Inhaltsverzeichnis

1. [Produkt-Architektur & Kernkonzept](#1-produkt-architektur--kernkonzept)
2. [Two-Stage Freebie — Funnel Flows](#2-two-stage-freebie--funnel-flows)
3. [Customer Journey & CX-Analyse](#3-customer-journey--cx-analyse)
4. [Landingpage & Funnel-Spezifikation](#4-landingpage--funnel-spezifikation)
5. [Komponenten-Spezifikation (Generator + Validator)](#5-komponenten-spezifikation-generator--validator)
6. [Architektur & Traceability](#6-architektur--traceability)
7. [API-Spezifikation (URL-Validator)](#7-api-spezifikation-url-validator)
8. [Error Catalog](#8-error-catalog)
9. [Qualitätssicherung & Testing Strategy](#9-qualitätssicherung--testing-strategy)
10. [Deployment & Operations](#10-deployment--operations)
11. [Anti-Gravity Quality Gate](#11-anti-gravity-quality-gate)

---

## 1. Produkt-Architektur & Kernkonzept

### 1.1 Das Produkt

**Drei-Schicht-Architektur:**

| Schicht | Beschreibung | Status |
|---|---|---|
| **Schicht 1 — Open Standard** | `ai-transparency.json` Spezifikation (offene Spec, IETF-kompatibel) | V1 |
| **Schicht 2 — Generator + Validator** | JSON-Generator-Wizard (5 Fragen → Download) + URL-Validator | V1 |
| **Schicht 3 — Verified Badge** | Gehostete JSON + klickbares SVG-Siegel (paid, recurring) | V1 |

**Kernproblem das wir lösen:** Unternehmen müssen ab August 2026 EU AI Act Art. 50(4) befolgen (KI-generierte Texte kennzeichnen). Unser Tool bietet den **Nachweis eines funktionierenden KI-Transparenz-Prozesses** — nicht die Kennzeichnung einzelner Texte (Content-Layer).

**RDG-Firewall (Pflicht):** Wir lösen nur den Policy-Layer (Prozess-Dokumentation), nicht den Content-Layer (einzelne Text-Kennzeichnung).

### 1.2 V1 — Architektur-Übersicht

```
Browser
  └── Next.js 15 Static Export
        ├── Landingpage (Hero, Problem, Freebie, Validator, Trust, Pricing, FAQ)
        ├── /check — Betroffenheits-Check (3 Fragen, Top-of-Funnel)
        ├── /generate — Generator-Wizard (Step 0 ACK + 5 Fragen → Download)
        ├── /validate — Validator-UI (URL-Eingabe → Ergebnis mit 2-Layer-Status)
        └── /badge/[slug] — Badge-Verification-Page
              └── Next.js API Route /api/validate (Hetzner VPS, Coolify-managed, TypeScript)
                    └── URL-Validator: Fetch + Ajv JSON-Schema-Validation
```

**Stateless-Prinzip:** Kein Backend-Server. Keine Datenbank. Eine einzige Edge Function für URL-Validierung.

### 1.3 Tech-Stack (aus 3b_Tools_Tech)

| Schicht | Technologie | Pflicht |
|---|---|---|
| Frontend | Next.js 15 Static Export (`output: 'export'`) | ✅ |
| Styling | Tailwind CSS v3 | ✅ |
| Hosting | Hetzner EU + Coolify (EU Region: `fra1`) | ✅ |
| Validator | Next.js API Route /api/validate (Hetzner VPS, Coolify-managed, TypeScript) | ✅ |
| Schema-Validation | Ajv v8 + ajv-formats v2 | ✅ |
| Zahlungen | Stripe (EU) | ✅ |
| E-Mail transaktional | Resend | ✅ |
| E-Mail Marketing | Brevo | ✅ |
| Secrets | Bitwarden CLI (EU) | ✅ KEINE .env |

### 1.4 V1 Scope — Vollständige Anforderungsliste (aus Lastenheft S234–244)

> Alle diese Punkte sind in diesem Pflichtenheft implementiert. Kein Scope Creep.

| # | Anforderung | Abschnitt |
|---|---|---|
| 1 | `ai-transparency.json` Spezifikation publizieren (aiclaration.de/spec) | S2 (Freebie Stage 1) |
| 2 | JSON-Generator-Wizard (5 definierte Fragen → Download, kein Login) | S5.2 |
| 3 | URL-Validator (URL eingeben → prüft `/.well-known/ai-transparency.json`, serverless) | S7 |
| 4 | Managed-Hosting-Fallback-Anleitung (WordPress/Squarespace/Jimdo) | S5.2 (Step 5) |
| 5 | Verified-Badge-Registrierung (Stripe, Basis-Plan, Hosted-JSON + manueller Slug-Prozess) | S5.3 |
| 6 | Öffentliches Verzeichnis (statische JSON-Liste, Hetzner EU + Coolify-Deploy) | S4 Sektion 6 |
| 7 | Two-Stage Freebie: Betroffenheits-Check 3 Fragen | S2 Stage 1 + S5.1 |
| 8 | Two-Stage Freebie: Generator Progress-Loop | S2 Stage 2 + S5.2 |
| 9 | Landingpage: Hero-H1, ROI-Rechnung, FAQ-Accordion (SEO), Presse-CTA, Agency-Formular | S4 |
| 10 | **WCAG 2.2 AA:** Kontraste ≥ 4.5:1, Touch-Ziele ≥ 44×44px, Tastatur-Navigation, Form-Labels | S4.3 + S9.1 |

### 1.5 V2 Scope — (nach Market-Validation, NICHT in V1)

| # | Anforderung | Bemerkung |
|---|---|---|
| 1 | Agency-Dashboard (Multi-Domain-Verwaltung, White-Label) | V2 |
| 2 | Automatische Weekly-Checks + Email-Alert | V2 |
| 3 | PDF-Audit-Report (SHA-256 Timestamp) | V2 |
| 4 | API-Zugang für programmatische Integration | V2 |
| 5 | Reseller-Dashboard (Multi-Domain, White-Label) | V2 (gehört zu Agency-Dashboard) |

### 1.6 Anti-Scope-Creep Firewall (aus Lastenheft S257–267)

Diese sind EXPLIZIT NICHT in V1/V2:

| # | Was NICHT gebaut wird | Grund |
|---|---|---|
| 1 | KI-Text-Detection / Plagiats-Prüfung | Altes Konzept — komplett gestrichen |
| 2 | Watermarking-API oder -Algorithmus | Technisches Armsrennen, gestrichen |
| 3 | Rechtsgutachten oder Compliance-Zertifizierung | RDG-Firewall: kein Rechtsrat |
| 4 | Nutzer-Daten-Speicherung / Login / Accounts in V1 | Stateless-Prinzip |
| 5 | Browser-Extension oder Desktop-App | Nicht im Scope |
| 6 | Konkurrenten-Monitoring oder Social-Media-Scanning | Nicht im Scope |
| 7 | EU-weiter Launch in V1 | DACH-only, keine Multi-Language |
| 8 | Integration in bestehendes Compliance-SaaS | Nicht im Scope |
| 9 | Blockchain / NFT-Nachweis | Nicht im Scope |

---

## 2. Two-Stage Freebie — Funnel Flows

### 2.1 Stage 1: Betroffenheits-Check (Top-of-Funnel, kostenlos, SEO)

**Zweck:** "Bin ich als Unternehmen von EU AI Act Art. 50 betroffen?" → Ja/Nein + Erklärung → Weiterleitung zum Generator.

**URL:** `/check`
**Flow:** 3 Fragen → Ergebnis (Ja/Nein) → CTA zum Generator

**Frage 1:** Nutzt Ihr Unternehmen KI (ChatGPT, Claude, Copilot o.ä.) zur Erstellung von Texten für Ihre Website, Blog, Newsletter oder Social Media?
- [ ] Ja
- [ ] Nein → Ergebnis: "Kein KI-Einsatz — keine ai-transparency.json nötig"

**Frage 2:** Publizieren Sie diese KI-generierten Texte online für die Öffentlichkeit?
- [ ] Ja
- [ ] Nein → Ergebnis: "Nur intern — nicht betroffen"

**Frage 3:** Ist eine natürliche Person redaktionell verantwortlich und hat den KI-generierten Text vor Veröffentlichung vollständig überprüft?
- [ ] Ja → Ergebnis: "Ausnahme trifft zu — kein KI-Transparenz-Dokument nötig"
- [ ] Nein → Ergebnis: "Betroffen! Sie müssen ab August 2026 KI-Transparenz dokumentieren"

**Ergebnis-Box:**
```
✅ BETROFFEN — Sie sind von EU AI Act Art. 50(4) betroffen.
Ihr KI-Transparenz-Prozess muss dokumentiert werden.

⬜ Nächster Schritt: Erstellen Sie Ihre ai-transparency.json
   → [Jetzt Policy erstellen] → /generate
```

### 2.2 Stage 2: Generator Progress-Loop (Middle-of-Funnel, kostenlos)

**Zweck:** `ai-transparency.json` Generator mit sichtbarem Fortschritt + Validator.

**Schritt 1/3: JSON-Datei erstellt (Download)**
- Generator-Wizard (5 Fragen → Download)
- **Step 0:** Pflicht-Acknowledgment (kein Skip) —Checkbox ohne die es nicht weitergeht

**Schritt 2/3: Implementiert auf Website (Anleitung + Check)**
- Anleitung für Managed-Hosting (WordPress/Squarespace/Jimdo)
- Validator-Link um eigene Implementierung zu prüfen

**Schritt 3/3: Verifiziert + Badge aktiviert**
- Nochmaliger Validator-Check
- Upgrade-CTA für Paid-Plan
- **Acknowledgment-Placement:** Pflicht-Checkbox ("Ich verstehe: Policy-Layer ≠ Content-Layer") erscheint HIER (vor Badge-Aktivierung) — NICHT als Gate vor Schritt 1

**Rückkehr-Trigger (Free-Plan):** Nach Policy-Änderung → erneuter Validator-Check nötig. Kommunikation: *"Prüfen Sie Ihre Policy nach jeder Änderung Ihres KI-Einsatzes."* → 1 kostenloser Re-Check/Quartal.

---

## 3. Customer Journey & CX-Analyse

### 3.1 Buyer Persona

**Primär:** "Online-Marketing-Leiterin bei deutschem Mittelständler (50–500 MA) mit Blog/News-Bereich"
- Nutzt ChatGPT/Copilot/Claude täglich für Content
- Weiß dass AI Act 2026 kommt — weiß nicht wie Konformität nachweist
- Hat Anwalts-Angebot (5.000 €) abgelehnt
- Kann JSON auf Webserver ablegen (Webmaster-Level)
- LinkedIn-suchbar: "Online Marketing Manager" + "Deutschland"

**Sekundär (B2B2B-Skalierung):** Webagenturen
- Eine Agentur betreut 20–100 Kunden-Websites
- Agency-Plan: 299 €/Monat, bis 50 Domains, White-Label-Badge

### 3.2 Customer Journey Map

#### Phase 1: Unaware → Aware (EU AI Act Angst)

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "Wir nutzen ChatGPT für Texte — ist doch normal, oder?" |
| **Action** | Liest über EU AI Act 2026, sieht Bußgeld-Androhung |
| **Touchpoints** | LinkedIn, IHK-Newsletter, Google "EU AI Act KMU Pflichten" |
| **Emotional** | -3 (Verunsicherung, Angst) |
| **Moment of Truth** | "Betrifft das MICH und MEINE Website?" |
| **Feature-Match** | SEO-Landingpage: "Sind Ihre KI-Texte kennzeichnungspflichtig?" → /check |

#### Phase 2: Education & Consideration (Freebie Betroffenheits-Check)

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "Ich brauche eine schnelle Antwort, keinen Anwalt für 5.000 €" |
| **Action** | Nutzt kostenlosen Betroffenheits-Check (3 Fragen) → Ja/Nein |
| **Touchpoints** | /check (Betroffenheits-Check), Landingpage |
| **Emotional** | -1 (Frustration über Komplexität, vorsichtige Hoffnung) |
| **Friction Points** | "Muss ich das wirklich?" |
| **Moment of Truth** | "Betroffen — aber das Tool hilft mir kostenlos!" |
| **Feature-Match** | Betroffenheits-Check gibt klare Ja/Nein-Antwort + nächsten Schritt |

#### Phase 3: Generator — Free Tool (ohne Login)

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "2 Minuten, kostenlos, keine Anmeldung — probiere ich sofort" |
| **Action** | /generate → 5 Fragen → Download ai-transparency.json |
| **Touchpoints** | Generator-Wizard |
| **Emotional** | +1 (Neugier, vorsichtiger Optimismus) |
| **Friction Points** | "Wie lege ich die Datei auf meinem Server ab?" |
| **Moment of Truth** | "Das Tool generiert mir die richtige Datei in 2 Minuten" |
| **Feature-Match** | Managed-Hosting-Fallback-Anleitung inklusive |

#### Phase 4: Validator — Selbst-Check

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "Ich habe die Datei eingebunden — stimmt das so?" |
| **Action** | /validate → URL eingeben → Validator prüft |
| **Touchpoints** | Validator-UI |
| **Emotional** | +2 (Stolz, leichter Stress vor Ergebnis) |
| **Friction Points** | "Was bedeutet dieser Fehler?" |
| **Moment of Truth** | "VALID ✅ — Meine Policy ist korrekt dokumentiert" |
| **Feature-Match** | Klare Ergebnis-Kommunikation + 2-Layer-Status |

#### Phase 5: Badge-Upgrade (Paid Conversion Trigger)

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "Ein offizielles Siegel wäre besser als ein Link auf meine eigene Datei" |
| **Action** | Starter-Plan (49 €/Monat) → monatliche Checks + Badge |
| **Touchpoints** | Validator-Ergebnis → Upgrade-CTA, Badge-Mockup |
| **Emotional** | +3 (Vertrauensgewinn, Compliance-Sicherheit) |
| **Friction Points** | Preis-Leistung unklar, "Brauche ich das wirklich?" |
| **Moment of Truth** | "Ein Badge auf meiner Website zeigt meinen Prozess öffentlich" |
| **Feature-Match** | ROI-Kalkulator: Bußgeld-Risiko vs. Badge-Kosten |

#### Phase 6: Retention & Advocacy

| Attribut | Inhalt |
|---|---|
| **Gedanke** | "Das Tool spart mir Zeit und gibt mir einen Nachweis" |
| **Action** | Nutzt monatliche Auto-Checks, empfiehlt an Netzwerk |
| **Touchpoints** | Badge auf Website, E-Mail-Alerts, Brevo-Newsletter |
| **Emotional** | +4 (Vertrauen, Erleichterung) |
| **Feature-Match** | Resend System-Alerts bei Regeländerungen, Brevo-Newsletter |

---

## 4. Landingpage & Funnel-Spezifikation

### 4.1 Funnel-Struktur

| Stufe | Fokus | Anteil | Mechanismus |
|---|---|---|---|
| **Stufe 1 (Anonym)** | Betroffenheits-Check (3 Fragen) | 60% | Sofortiger Nutzen, kein Login, SEO-Trigger |
| **Stufe 2 (Anonym)** | Generator | 30% | 5 Fragen → Download, kein Login |
| **Stufe 3 (Lead)** | Validator + Badge-Upgrade | 10% | ROI-Kommunikation, Upgrade-CTA |

### 4.2 Content-Struktur (7 Sektionen)

#### Sektion 1: HERO
```
COMPONENT: HeroSection
REQ-MAP: Lastenheft → "sofortiger Nutzen, kein Login"
```
- **H1:** "KI-Transparenz dokumentieren — vor August 2026"
- **Subline:** "ai-transparency.json Generator + Validator. Kostenlos. Ohne Registrierung."
- **CTA:** "Jetzt Policy erstellen" → /generate
- **Micro-Copy:** "Bußgeld bis 15 Mio. € oder 3% Umsatz bei Verstoß — documentieren Sie Ihren Prozess"

#### Sektion 2: PROBLEM & COMPLIANCE
```
COMPONENT: ProblemSection
REQ-MAP: Lastenheft → Pain Point "Nachweis-Problem"
```
- **H2:** "Ab August 2026: Jeder KI-generierte Text muss gekennzeichnet werden"
- **Pain-Points:**
  1. "Bußgeld: bis 15 Mio. € oder 3% des weltweiten Jahresumsatzes (Art. 99 Abs. 4)"
  2. "Anwalt für Gutachten: 5.000–15.000 €"
  3. "Ohne Nachweis: kein Beweis gegenüber Kunden, Partnern, Regulierern"
- **Lösung:** "ai-transparency.json — der offene Standard für maschinenlesbare KI-Transparenz-Erklärungen"
- **CTA:** "Betroffen? Prüfen Sie jetzt" → /check

#### Sektion 3: FREEBIE — BETROFFENHEITS-CHECK
```
COMPONENT: BetroffenheitsCheckSection
REQ-MAP: Lastenheft → "Two-Stage Freebie: Betroffenheits-Check 3 Fragen"
```
- **H2:** "Sind Sie betroffen? — 3 Fragen, unter 2 Minuten"
- **Visual:** 3-Fragen-Interface (embedded oder Link zu /check)
- **3 Bulletpoints:**
  - ✅ "Kostenlos, ohne Anmeldung"
  - ✅ "Sofort wissen: Bin ich betroffen?"
  - ✅ "Klarer nächster Schritt"
- **CTA:** "Jetzt prüfen" → /check

#### Sektion 4: FREEBIE — GENERATOR
```
COMPONENT: GeneratorSection
REQ-MAP: Lastenheft → "Two-Stage Freebie: Generator Progress-Loop"
```
- **H2:** "Erstellen Sie Ihre ai-transparency.json"
- **Visual:** Wizard-Mockup (Step 0 → Step 1/5 → Download)
- **3 Bulletpoints:**
  - ✅ "5 Fragen → Ihre ai-transparency.json in 2 Minuten"
  - ✅ "Kostenloser Download — keine Anmeldung"
  - ✅ "Anleitung für WordPress, Squarespace, Jimdo inklusive"
- **CTA:** "Jetzt erstellen" → /generate

#### Sektion 5: VALIDATOR
```
COMPONENT: ValidatorSection
REQ-MAP: Lastenheft → "URL-Validator"
```
- **H2:** "Validieren Sie Ihre vorhandene Policy"
- **Input:** URL-Feld für Website-URL
- **CTA:** "Jetzt prüfen"
- **Ergebnis-Box:** Beispiel-Output (VALID/INVALID/NOT_FOUND + 2-Layer-Status)

#### Sektion 6: TRUST & COMPLIANCE
```
COMPONENT: TrustSection
REQ-MAP: Lastenheft → "DSGVO, EU AI Act, RDG-Firewall"
```
- **Design:** bg-slate-900, text-white, Shield-Ästhetik
- **Badges:**
  - 🛡️ "100% DSGVO-konform — Keine Datenspeicherung"
  - 🛡️ "EU AI Act Art. 50(4) — Policy-Layer dokumentiert"
  - 🛡️ "EU Code of Practice on AI Transparency — finalisiert 10.06.2026"
  - 🛡️ "Made in Germany — Hosting in der EU (Frankfurt)"
  - 🛡️ "Open Standard — maschinenlesbar, überprüfbar"
- **RDG-Pflicht:** "Dies ist kein Rechtsrat. Für rechtsverbindliche Compliance-Beurteilung: Rechtsanwalt."

#### Sektion 7: BADGE & PRICING
```
COMPONENT: PricingSection
REQ-MAP: Lastenheft → "Revenue Model"
```
- **3er-Tabelle:**
  | Free | Starter (49 €/Monat) | Pro (99 €/Monat) |
  |---|---|---|
  | Spec-Doku | Monatliche Auto-Checks | Wöchentliche Checks |
  | Generator | Badge + Alert | PDF-Audit-Report (SHA-256) |
  | 1× Validator | — | API-Zugang |
  | — | — | Agency: 299 €/Monat (bis 50 Domains, **V2**) |
- **Badge-Mockup:** SVG mit Hover-Tooltip-Demo (240×80px, Slate/Emerald)
- **Hinweis V2:** "Agency-Plan inkl. Reseller-Dashboard: Verfügbar nach Market-Validation"

#### Sektion 8: FAQ + CTA
```
COMPONENT: FaqCtaSection
REQ-MAP: Lastenheft → "FAQ-Accordion (SEO)"
```
- **FAQ (Accordion, 7 Fragen):**
  1. "Was ist ai-transparency.json?" → Offene JSON-Spezifikation unter `/.well-known/` (analog robots.txt)
  2. "Was deckt das Badge AB?" → Policy-Layer: Ihr KI-Transparenz-Prozess ist dokumentiert und verifiziert
  3. "Was deckt das Badge NICHT AB?" → Content-Layer: Einzelne KI-Texte müssen separat gekennzeichnet werden
  4. "Für wen ist das?" → KMU mit Blog/News-Bereich, die ChatGPT etc. nutzen
  5. "Wie integriere ich das auf meiner Website?" → Anleitung für Managed-Hosting + Zero-Tech-Option `/v/[slug]`
  6. "Was ist der EU Code of Practice on AI-Generated Content?" → Freiwilliger Branchenstandard der EU AI Office, finalisiert 10.06.2026. Stärkt die Erwartung maschinenlesbarer KI-Transparenz-Erklärungen — ai-transparency.json erfüllt genau diesen Gedanken.
  7. "Reicht ai-transparency.json für Art. 50(4)-Compliance?" → Nein — das Tool dokumentiert Ihren Policy-Layer (Prozess-Nachweis). Den Content-Layer (Kennzeichnung einzelner Texte) müssen Sie selbst umsetzen. Für rechtssichere Beurteilung: Anwalt hinzuziehen.
- **CTA:** "Jetzt KI-Transparenz dokumentieren" → /generate

### 4.3 Landingpage Extras

| Extra | Beschreibung |
|---|---|
| **ROI-Rechnung** | "200 Texte × Anwalt 250 €/h = 8.250 € vs. aiclaration 49 €/Monat" |
| **Presse-CTA** | "Presse: Kontaktieren Sie uns für O-Töne zum EU AI Act" |
| **Agency-Formular** | "Sie betreuen mehrere Websites? Agency-Formular für 299 €/Monat-Plan" |

### 4.4 Technische Landingpage-Spezifikation

| Aspekt | Spezifikation |
|---|---|
| **Framework** | Next.js 15 (`output: 'export'`) |
| **Styling** | Tailwind CSS v3 |
| **Icons** | Lucide React |
| **i18n** | DE (V1), kein i18n-Framework nötig |
| **Barrierefreiheit** | WCAG 2.2 AA — alle Kontraste ≥ 4.5:1, Touch-Ziele ≥ 44×44px, Tastatur-Navigation, Form-Labels |
| **Performance** | Lighthouse Score ≥ 95 |
| **SEO** | Meta-Tags, Schema.org, Sitemap (legal routes ausgeschlossen) |

---

## 5. Komponenten-Spezifikation (Generator + Validator)

### 5.1 Betroffenheits-Check Komponente (`/check`)

**Komponente:** `BetroffenheitsCheck.tsx`
**Route:** `/check`
**State:** 3 boolesche Fragen, Navigation zwischen Fragen

**Flow:**
```
Schritt 1: Frage 1 (Ja/Nein)
    ↓
Schritt 2: Frage 2 (Ja/Nein) — nur wenn Fr.1 = Ja
    ↓
Schritt 3: Frage 3 (Ja/Nein) — nur wenn Fr.2 = Ja
    ↓
Ergebnis-Box (basierend auf Kombination)
```

**Ergebnis-Matrix:**

| Q1 (KI?) | Q2 (Online?) | Q3 (Mensch prüft?) | Ergebnis |
|---|---|---|---|
| Nein | — | — | "Kein KI-Einsatz — keine ai-transparency.json nötig" |
| Ja | Nein | — | "Nur intern — nicht betroffen" |
| Ja | Ja | Ja | "Ausnahme trifft zu — kein KI-Transparenz-Dokument nötig" |
| Ja | Ja | Nein | "Betroffen! → Generator" |

### 5.2 Generator-Wizard Komponente (`/generate`)

**Komponente:** `GeneratorWizard.tsx`
**Route:** `/generate`
**Steps:** 6 Steps total (Step 0 = ACK + 5 Fragen)

**Step 0 — Pflicht-Acknowledgment (KEIN Skip möglich):**
```
TEXT: "Ich verstehe: `ai-transparency.json` dokumentiert meinen organisatorischen 
Transparenz-Prozess gemäß EU AI Act Art. 50(4). Die Kennzeichnung jedes einzelnen 
KI-generierten Textes im Content bleibt meine eigene Pflicht und wird durch 
dieses Tool nicht übernommen."

CHECKBOX: "Ich habe verstanden und bin einverstanden" (muss aktiviert sein)
BUTTON: "Weiter" (disabled bis Checkbox aktiviert)
```

**Step 1/5:** Nutzt Ihr Unternehmen KI zur Content-Erstellung?
- [ ] Ja
- [ ] Nein → Hinweis: "Wenn Sie kein KI nutzen, ist keine ai-transparency.json nötig. Trotzdem können Sie eine anlegen, falls sich das ändert."

**Step 2/5:** Welche Content-Typen erstellen Sie mit KI? (Mehrfachauswahl)
- [ ] Blogbeiträge
- [ ] Newsletter
- [ ] PR-Texte / Pressemitteilungen
- [ ] Social Media Beiträge
- [ ] Produktbeschreibungen
- [ ] Sonstiges

**Step 3/5:** Kennzeichnen Sie KI-Inhalte aktuell im Text?
- [ ] Ja, ich nutze inline disclosure (z.B. "Dieser Text wurde mit KI erstellt")
- [ ] Ja, ich nutze Meta-Tags im HTML
- [ ] Nein, aber ich plane es
- [ ] Nein, noch nicht

**Step 4/5:** Prüft ein Mensch den KI-Content vor Veröffentlichung?
- [ ] Ja, immer
- [ ] Ja, teilweise
- [ ] Nein

**Step 5/5:** Kontakt-E-Mail für KI-Transparenz-Anfragen
- Input: E-Mail-Feld mit Validierung
- Helptext: "Diese E-Mail wird öffentlich in der ai-transparency.json angezeigt"

**Download-Step:**
```
DOWNLOAD-BUTTON: "ai-transparency.json herunterladen"
DATEINAME: ai-transparency.json
INHALT:
{
  "version": "1.0",
  "last_updated": "2026-04-08",
  "ai_content_policy": {
    "uses_ai_content": true/false,
    "content_types": [...aus Step 2...],
    "labeling_method": "...aus Step 3...",
    "human_review": true/false,
    "tools_used": [] // optional, vom Nutzer editierbar
  },
  "contact": "...aus Step 5...",
  "legal_basis": "EU AI Act Art. 50(4)"
}
```

**Managed-Hosting-Fallback (Step 5 — wenn Nutzer keinen Serverzugang hat):**
```
INFO-BOX: "Kein Serverzugang? So integrieren Sie ai-transparency.json trotzdem:"
1. WordPress: Nutzen Sie ein Redirect-Plugin oder legen Sie die Datei via File Manager ins WordPress-Root-Verzeichnis
2. Squarespace: Nutzen Sie Einstellungen → Advanced → URL-Redirect
3. Jimdo: Nutzen Sie die "Benutzerdefinierte Datei"-Funktion
ANLEITUNGS-LINK: "Detaillierte Anleitung für Ihr Hosting"
```

### 5.3 Badge-Spezifikation

**SVG-Badge — Pflicht-Spec:**

| Property | Wert |
|---|---|
| **Dimensionen** | 240×80px (Pflicht!) |
| **Farbschema** | Slate (#1e293b) + Emerald (#10b981) |
| **Icon** | Schild + Haken (Lucide: `shield-check`) |
| **Text** | "KI-Transparenz-Prozess dokumentiert ✓" |
| **Schrift** | System-Font, 14px, semibold |
| **Interaktiv** | Klickbar → öffnet `/badge/[slug]` |
| **Hover-Tooltip** | "Dieser Betrieb hat seinen KI-Transparenz-Prozess gemäß EU AI Act Art. 50(4) dokumentiert. Einzelne KI-generierte Inhalte werden vom Betrieb separat im Content gekennzeichnet." |

**Hosted Badge URL (V1):** `https://aiclaration.de/badge/[company-slug]`

### 5.4 Validator-UI Komponente (`/validate`)

**Komponente:** `ValidatorForm.tsx` + `ResultDisplay.tsx`
**Route:** `/validate`

**Input:**
```
URL-FELD: "https://example.com"
PLACEHOLDER: "Ihre Website-URL eingeben"
CTA: "Jetzt prüfen"
```

**ResultDisplay — 2-Layer-Status (Pflicht!):**
```
✅ Policy-Layer: KI-Transparenz-Prozess dokumentiert und verifiziert
⬜ Content-Layer: Kennzeichnung einzelner KI-Texte — Ihre Verantwortung (technisch nicht prüfbar durch dieses Tool)
```

**Zusätzliche Info-Box:**
```
HINWEIS: "Das Badge bestätigt, dass Ihr KI-Transparenz-Prozess dokumentiert ist.
Die Kennzeichnung einzelner KI-generierter Texte im Content obliegt IHRER Verantwortung.
Mehr dazu: [Link]
```

---

## 6. Architektur & Traceability

### 6.1 System-Übersicht (Mermaid)

```mermaid
graph TB
    subgraph "Frontend (Next.js Static Export)"
        LP[Landingpage] --> CHECK[/check<br/>Betroffenheits-Check]
        LP --> GW[Generator-Wizard<br/>/generate]
        LP --> VU[Validator-UI<br/>/validate]
        GW --> DL[Download<br/>ai-transparency.json]
        VU --> VF[Validator-Edge-Function]
        BP[Badge-Page<br/>/badge/[slug]] --> VF
    end

    subgraph "API Route /api/validate (Hetzner VPS, Coolify-managed)"
        VF --> SSRF[SSRF-Protection<br/>Blocklist]
        SSRF --> FETCH[Fetch<br/>.well-known/ai-transparency.json]
        FETCH --> AJV[Ajv JSON-Schema<br/>Validation]
        AJV --> RESP[Response<br/>VALID/INVALID/NOT_FOUND]
    end

    subgraph "Infrastruktur"
        CF[Cloudflare<br/>Proxy + Bot Fight] --> Hetzner EU + Coolify[Hetzner EU + Coolify<br/>EU Region]
        VERIFY[Public Directory<br/>/directory] --> Hetzner EU + Coolify
        STRIPE[Stripe<br/>Payment] --> BW[Bitwarden<br/>Secrets]
        RESEND[Resend<br/>Alerts] --> BW
        BREVO[Brevo<br/>Marketing] --> BW
    end

    VF -.->|SSRF-Fail| RESP
    BP -.->|Badge-Grafik| RESP
    STRIPE -.->|Webhook| VF

    style LP fill:#059669,color:#fff
    style CHECK fill:#7c3aed,color:#fff
    style VF fill:#1e40af,color:#fff
    style CF fill:#f59e0b,color:#000
```

### 6.2 Komponenten-Architektur

```
/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landingpage (8 Sektionen)
│   │   ├── layout.tsx            # Root Layout
│   │   ├── /check
│   │   │   └── page.tsx          # Betroffenheits-Check (3 Fragen)
│   │   ├── /generate
│   │   │   └── page.tsx          # Generator-Wizard (6 Steps)
│   │   ├── /validate
│   │   │   └── page.tsx          # Validator-UI
│   │   └── /badge
│   │       └── /[slug]
│   │           └── page.tsx      # Badge-Verification-Page
│   ├── /components
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── BetroffenheitsCheckSection.tsx
│   │   ├── GeneratorSection.tsx
│   │   ├── ValidatorSection.tsx
│   │   ├── TrustSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FaqCtaSection.tsx
│   │   ├── BetroffenheitsCheck.tsx   # 3 Fragen Logik
│   │   ├── GeneratorWizard.tsx       # 6-Step Wizard
│   │   ├── ValidatorForm.tsx        # URL-Input + Submit
│   │   └── ResultDisplay.tsx         # VALID/INVALID/NOT_FOUND + 2-Layer
│   ├── api/
│   │   └── validate/
│   │       └── route.ts          # Next.js API Route: URL-Fetch + Schema-Validation
│   └── lib/
│       ├── schema.ts             # Ajv JSON-Schema (ai-transparency.json)
│       └── ssrf.ts               # SSRF-Protection Blocklist
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### 6.3 JSON-Schema (ai-transparency.json)

Pflichtfelder — Validierung schlägt fehl wenn fehlend:

```typescript
// /src/lib/schema.ts
const AI_TRANSPARENCY_SCHEMA = {
  "$schema": "https://json-schema.org/draft-07/schema",
  "type": "object",
  "required": ["version", "last_updated", "ai_content_policy", "contact", "legal_basis"],
  "properties": {
    "version": { "type": "string" },
    "last_updated": { "type": "string", "format": "date" },
    "ai_content_policy": {
      "type": "object",
      "required": ["uses_ai_content"],
      "properties": {
        "uses_ai_content": { "type": "boolean" },
        "content_types": {
          "type": "array",
          "items": { "type": "string", "enum": ["marketing_text", "blog_posts", "newsletter", "pr_texts", "social_media", "product_descriptions", "other"] }
        },
        "labeling_method": {
          "type": "string",
          "enum": ["inline_disclosure", "metadata_tag", "ai Generated", "planned", "none"]
        },
        "human_review": { "type": "boolean" },
        "tools_used": { "type": "array", "items": { "type": "string" } }
      }
    },
    "contact": { "type": "string", "format": "email" },
    "legal_basis": { "type": "string" }
  }
};
```

### 6.4 Secret-Vault Mapping (Bitwarden)

| Secret Name | Verwendung | Zugriff |
|---|---|---|
| `STRIPE_SECRET_KEY` | Payment-Processing | Backend/Edge |
| `STRIPE_WEBHOOK_SECRET` | Webhook-Validierung | Backend/Edge |
| `RESEND_API_KEY` | System-Alerts | Backend/Edge |
| `BREVO_API_KEY` | Marketing | Backend/Edge |

---

## 7. API-Spezifikation (URL-Validator)

### 7.1 Validator Edge Function — Flow

```
1. Request: POST /api/validate
   Body: { "url": "https://example.com" }
2. URL-Validierung: Nur http/https erlaubt
3. SSRF-Check: Private IP-Ranges, Loopback, Cloud-Metadata blockiert
4. Fetch: GET https://example.com/.well-known/ai-transparency.json
   - Timeout: 5 Sekunden (hard)
   - Max Response: 50 KB
   - Redirects: max. 2
5. MIME-Type-Check: Content-Type muss application/json sein
6. JSON-Schema-Validation: Ajv (lokal, kein Netzwerk-Call)
7. Response: { status, details, timestamp }
```

### 7.2 Endpoint-Spezifikation

```
POST /api/validate
Content-Type: application/json

// Request
{
  "url": "https://example.com"    // Pflichtfeld, string
}

// Response 200 — Erfolgreich
{
  "status": "VALID",              // Enum: VALID | INVALID | NOT_FOUND | FORMAT_ERROR | SSRF_ERROR
  "details": {
    "version": "1.0",             // Aus JSON extrahiert
    "last_updated": "2026-04-07",
    "uses_ai_content": true,
    "content_types": ["blog_posts", "marketing_text"],
    "contact": "datenschutz@example.de"
  },
  "checked_at": "2026-04-08T10:30:00Z",
  "processing_time_ms": 1250
}

// Response 200 — Fehlerfälle
{
  "status": "NOT_FOUND",          // 404 oder Datei nicht vorhanden
  "details": null,
  "message": ".well-known/ai-transparency.json nicht gefunden",
  "checked_at": "2026-04-08T10:30:00Z",
  "processing_time_ms": 890
}

{
  "status": "INVALID",           // Schema-Validierung fehlgeschlagen
  "details": {
    "errors": [
      { "path": "$.ai_content_policy.uses_ai_content", "message": "Pflichtfeld fehlt" }
    ]
  },
  "checked_at": "2026-04-08T10:30:00Z",
  "processing_time_ms": 1100
}

{
  "status": "FORMAT_ERROR",       // MIME-Type nicht application/json
  "details": null,
  "message": "Content-Type muss application/json sein",
  "checked_at": "2026-04-08T10:30:00Z",
  "processing_time_ms": 450
}

{
  "status": "SSRF_ERROR",         // Private IP oder blockierte URL
  "details": null,
  "message": "Diese URL kann nicht validiert werden",
  "checked_at": "2026-04-08T10:30:00Z",
  "processing_time_ms": 12
}

// Response 400 — Ungültiges Request-Format
{
  "error": "INVALID_REQUEST",
  "message": "url ist ein Pflichtfeld"
}

// Response 429 — Rate-Limit erreicht
{
  "error": "RATE_LIMIT_EXCEEDED",
  "retry_after_seconds": 60
}
```

### 7.3 SSRF-Protection Blocklist

```typescript
// /src/lib/ssrf.ts
const BLOCKED_PATTERNS = [
  /^https?:\/\/localhost/i,
  /^https?:\/\/127\./,
  /^https?:\/\/10\./,
  /^https?:\/\/172\.(1[6-9]|2\d|3[01])\./,
  /^https?:\/\/192\.168\./,
  /^https?:\/\/169\.254\./,   // Link-local / Cloud metadata (AWS, Azure, GCP, Hetzner)
  /^https?:\/\/0\./,
  /^https?:\/\/\[::1\]/,
  /^https?:\/\/metadata\./i,
  /^https?:\/\/.+\.local$/i,
  /^https?:\/\/localhost:/,
];
```

---

## 8. Error Catalog

### 8.1 Validator-Fehler

| Error Code | HTTP Status | Auslöser | Benutzerfreundliche Meldung |
|---|---|---|---|
| `INVALID_REQUEST` | 400 | URL fehlt oder kein String | "Bitte geben Sie eine gültige URL ein" |
| `INVALID_URL_FORMAT` | 400 | URL syntaktisch ungültig | "Bitte geben Sie eine vollständige URL ein (mit https://)" |
| `SSRF_ERROR` | 200 | Private IP, Loopback, Metadata | "Diese URL kann nicht validiert werden — bitte eine öffentliche URL eingeben" |
| `NOT_FOUND` | 200 | 404 oder Datei fehlt | ".well-known/ai-transparency.json nicht gefunden — haben Sie die Datei bereits angelegt?" |
| `FORMAT_ERROR` | 200 | MIME-Type ≠ application/json | "Die Datei ist nicht als JSON formatiert — Content-Type muss application/json sein" |
| `INVALID_SCHEMA` | 200 | Ajv-Validierung fehlgeschlagen | "Ihre ai-transparency.json entspricht nicht dem Standard — folgende Felder fehlen: ..." |
| `TIMEOUT` | 200 | Fetch > 5 Sekunden | "Die Website ist nicht erreichbar — bitte versuchen Sie es später erneut" |
| `TOO_LARGE` | 200 | Response > 50 KB | "Die ai-transparency.json Datei ist zu groß — maximal 50 KB erlaubt" |
| `REDIRECT_LIMIT` | 200 | Mehr als 2 Redirects | "Zu viele Weiterleitungen — bitte URL direkt auf die JSON-Datei prüfen" |
| `RATE_LIMIT_EXCEEDED` | 429 | > 10 Requests/Min/IP | "Zu viele Anfragen — bitte warten Sie 60 Sekunden" |
| `INTERNAL_ERROR` | 500 | Unerwarteter Fehler | "Ein technischer Fehler ist aufgetreten — bitte versuchen Sie es erneut" |

### 8.2 Generator-Fehler (Edge Cases)

| Error | Auslöser | Meldung |
|---|---|---|
| Kein KI-Einsatz | Nutzer wählt "Nein" bei Generator-Frage 1 | "Wenn Sie kein KI für Content nutzen, ist keine ai-transparency.json nötig. Sie können trotzdem eine erstellen." |
| Managed Hosting | Nutzer hat keinen Serverzugang | Anleitung für Redirect-Plugin / Subdomain-Workaround anzeigen |
| Ungültige E-Mail | E-Mail nicht valide in Step 5 | "Bitte geben Sie eine gültige E-Mail-Adresse ein" |

### 8.3 Stripe-Fehler

| Error Code | Auslöser | Benutzerfreundliche Meldung |
|---|---|---|
| `PAYMENT_FAILED` | Stripe Checkout fehlgeschlagen | "Zahlung konnte nicht durchgeführt werden — bitte prüfen Sie Ihre Zahlungsdaten" |
| `SUBSCRIPTION_INACTIVE` | Subscription gekündigt/abgelaufen | "Ihr Badge-Plan ist nicht mehr aktiv — bitte verlängern Sie" |
| `WEBHOOK_SIGNATURE_INVALID` | Stripe Webhook-Validierung fehlgeschlagen | (intern — kein User-Feedback nötig) |

---

## 9. Qualitätssicherung & Testing Strategy

### 9.1 Teststrategie

| Testtyp | Tool | Scope | Mindestabdeckung |
|---|---|---|---|
| **Unit Tests** | Vitest | Komponenten, Schema-Validation | 90% |
| **Integration Tests** | Edge Function Mock | Validator E2E | Alle 10 Szenarien |
| **Security Audit** | npm audit | Dependencies | 0 Critical/High |
| **Performance** | Lighthouse CI | Web Vitals, TTFB | ≥ 95 |
| **Accessibility** | axe-core | WCAG 2.2 AA | 0 Violations |

### 9.2 Validierungs-Testfälle (10 Szenarien)

| # | Szenario | Input | Erwartet |
|---|---|---|---|
| 1 | Korrekte Policy — Blog | `uses_ai_content: true`, `content_types: ["blog_posts"]`, alle Pflichtfelder | VALID ✅ |
| 2 | Korrekte Policy — PR-Texte | PR-Agentur, `human_review: true`, alle Pflichtfelder | VALID ✅ |
| 3 | Korrekte Policy — Newsletter | SaaS, `tools_used: ["ChatGPT", "Claude"]` | VALID ✅ |
| 4 | Korrekte Policy — Agentur (multi) | 3 content_types | VALID ✅ |
| 5 | Kein KI-Einsatz | `uses_ai_content: false` | VALID ✅ |
| 6 | Fehlend: uses_ai_content | Pflichtfeld leer | INVALID ❌ (Schema-Error) |
| 7 | Fehlend: legal_basis | Kein Art.-50-Bezug | INVALID ❌ (Schema-Error) |
| 8 | Fehlend: contact | Kein Ansprechpartner | INVALID ❌ (Schema-Error) |
| 9 | Datei nicht vorhanden | 404 auf /.well-known/ | NOT FOUND ❌ |
| 10 | Falscher MIME-Type | text/html statt application/json | FORMAT ERROR ❌ |

### 9.3 SSRF-Protection Tests

| # | URL | Erwartet |
|---|---|---|
| 1 | `https://example.com/.well-known/ai-transparency.json` | VALID ✅ |
| 2 | `https://localhost/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 3 | `https://127.0.0.1/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 4 | `https://10.0.0.1/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 5 | `https://172.16.0.1/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 6 | `https://192.168.1.1/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 7 | `https://metadata.google.internal/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |
| 8 | `https://169.254.169.254/.well-known/ai-transparency.json` | SSRF_ERROR ❌ |

### 9.4 Abnahme-Checkliste

- [ ] Alle 10 Validierungs-Testfälle bestanden
- [ ] Alle 8 SSRF-Protection-Tests bestanden
- [ ] Lighthouse Score ≥ 95 (Performance, A11y, Best Practices, SEO)
- [ ] **WCAG 2.2 AA:** Alle Kontraste ≥ 4.5:1, Touch-Ziele ≥ 44×44px, Tastatur-Navigation
- [ ] Betroffenheits-Check: Alle 4 Ergebnis-Kombinationen korrekt
- [ ] Generator: Step 0 ACK-Pflicht funktioniert (kein Skip möglich)
- [ ] Generator: 5-Step-Wizard funktioniert ohne Login
- [ ] Generator: Download der ai-transparency.json funktioniert
- [ ] Generator: Managed-Hosting-Fallback-Anleitung sichtbar
- [ ] Validator: URL-Eingabe → korrekter Status-Code
- [ ] Validator: **2-Layer-Status** wird korrekt angezeigt
- [ ] Badge: SVG wird korrekt gerendert (240×80px, Slate/Emerald)
- [ ] Badge: Hover-Tooltip zeigt Policy-Layer-Erklärung
- [ ] Badge: Klick öffnet Verification-Page
- [ ] RDG-Disclaimer auf allen relevanten Seiten
- [ ] Cloudflare Bot Fight Mode aktiviert
- [ ] robots.txt: AI-Crawler blockiert (GPTBot, Claude-Web, ia_archiver)
- [ ] Bitwarden-Secrets konfiguriert (kein .env im Repo)
- [ ] Stripe Webhook Signatur-Validierung implementiert
- [ ] Resend Alert bei Fehler konfiguriert
- [ ] Domain aiclaration.de auf Hetzner EU + Coolify ge pointing

---

## 10. Deployment & Operations

### 10.1 Deployment-Architektur

```
GitHub (main branch)
  └── GitHub Actions
        ├── npm install + build (Static Export)
        ├── Vitest (Unit Tests)
        └── Hetzner EU + Coolify Deploy (auto-deploy on push)
              └── Hetzner EU + Coolify EU (fra1)
                    ├── Static Files (CDN)
                    ├── Edge Function (Validator)
                    └── Custom Domain (Cloudflare Proxy)
```

### 10.2 Domain & DNS

- **Domain:** `aiclaration.de` (gepoint auf Hetzner EU + Coolify)
- **DNS:** Cloudflare Proxy (DSGVO + Bot Protection)
- **/.well-known/ai-transparency.json:** Immer auf `aiclaration.de` erreichbar

### 10.3 Rate Limiting

- Max. 10 Validator-Requests / IP / Minute (Hetzner EU + Coolify Edge Middleware)
- Free-Plan: 1 Check gesamt (Cookie-basiert, kein Login)
- Paid-Plan: Automatische Checks via Hetzner EU + Coolify Cron

### 10.4 Paranoid Mode (5 Schutzschichten — Pflicht V1)

1. **Meta-Tags:** `<meta name="robots" content="noindex,nofollow,noarchive">` auf allen Legal-Routen (/impressum, /datenschutz, /agb)
2. **E-Mail-Obfuskation:** Betreiber-E-Mail nie im Klartext im Source-Code
3. **Cloudflare (Pflicht vor Launch):** Bot Fight Mode + Email Address Obfuscation
4. **Sitemap:** /impressum, /datenschutz, /agb explizit ausschließen
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

## 11. Anti-Gravity Quality Gate

| Check | Status |
|---|---|
| **Vollständigkeit:** Alle 10 V1-Scope-Anforderungen aus Lastenheft gemappt? | ✅ (S1.4) |
| **V2 Scope:** Klar als V2 gekennzeichnet (nicht in V1 enthalten)? | ✅ (S1.5) |
| **Anti-Scope-Creep:** 9 explizit nicht in V1/V2 dokumentiert? | ✅ (S1.6) |
| **Two-Stage Freebie:** Betroffenheits-Check + Generator Progress-Loop? | ✅ (S2) |
| **Generator Step 0:** Pflicht-ACK ohne Skip? | ✅ (S5.2) |
| **2-Layer-Status:** Immer sichtbar im Validator-Result? | ✅ (S5.4) |
| **Badge-Spec:** 240×80px, Slate/Emerald, Hover-Tooltip? | ✅ (S5.3) |
| **Stateless:** Kein Backend-Server, keine DB in V1? | ✅ |
| **SSRF-Protection:** Private IPs + Cloud-Metadata blockiert? | ✅ |
| **RDG-Firewall:** 5 strukturelle Maßnahmen implementiert? | ✅ |
| **WCAG 2.2 AA:** Alle Kontraste ≥ 4.5:1, Touch ≥ 44×44px? | ✅ (Pflicht in Testing) |
| **1-Person-Wartbarkeit:** Scope realistisch für Solo-Dev? | ✅ |
| **Paranoid Mode:** 5 Schutzschichten aktiv? | ✅ (S10.4) |

---

---

## Privacy-by-Architecture

> Referenz: [[00_System/18_Privacy_by_Architecture_Manifest]]
> Stand: 2026-06-19 | Gilt für: aiclaration V1 (Generator + Validator + Badge)

| Pflicht | Status | Begründung |
|---|---|---|
| **Browser-First** — Kerndaten bleiben im Browser, kein Upload | ✅ | Generator läuft vollständig client-seitig (Next.js Static Export). Die 5 Wizard-Fragen erzeugen die ai-transparency.json im Browser — kein Server sieht die Eingaben. Download ist lokal. Validator sendet nur die URL, nie Inhalte der Kundenseite. |
| **Account-Layer-Trennung** — Free-Tier vollständig anonym | ✅ | Stage 1 (Betroffenheits-Check) + Stage 2 (Generator) + Stage 3 (Validator): alle ohne Login, ohne Tracking-Cookie, ohne E-Mail-Pflicht. Erst Badge-Aktivierung (Paid) erfordert Stripe-E-Mail + Slug — und das ist strukturell getrennt vom Free-Flow. |
| **Strukturierte Eingabe** — Keine Freitexte in KI-Prompts | ✅ | Alle 5 Generator-Fragen sind Multiple-Choice oder strukturierte Felder (E-Mail, Boolean). Kein Freitext-Feld landet in einem LLM. Kein Datei-Upload im gesamten V1-Scope (explizit Anti-Scope, S1.6). |
| **KI-nur-in-Pipeline** — Kein LLM im Tool-Betrieb | ✅ | Das Produkt selbst enthält keinen KI-Aufruf. Output (ai-transparency.json) ist deterministisch aus Nutzereingaben generiert (Template-Substitution). KI ist ausschließlich im Entwicklungsprozess (Claude Code) — nicht im Produktionspfad. |
| **EU-Only-Stack** — Keine US-Cloud für personenbezogene Daten | ✅ | Hetzner Frankfurt fra1 (Hosting + Edge Function), Bitwarden EU (Secrets), Resend (E-Mail transaktional, EU-Server), Brevo (Marketing, EU-Verarbeitung, AVV automatisch). Stripe: Zahlungsdienstleister, verarbeitet nur Zahlungsdaten — keine Nutzungsdaten. Cloudflare Proxy: nur Metadaten (IP, Bot-Schutz), keine Inhaltsdaten. |

### Anti-Patterns (explizit ausgeschlossen)
- ❌ Open-Source-Self-Hosted (kein Support, keine Updates, Solo-Founder-inkompatibel)
- ❌ Öffentliches Standards-Verzeichnis mit personenbezogenen Firmendaten (statisches JSON, keine Anzeige E-Mail/Inhalt)
- ❌ KI-Analyse von Kundendaten (kein LLM im Tool, kein Datei-Upload)

---

## SEO/AEO-Strategie

> Gilt für: LP-V0 (Landingpage), Mindest-Keywords: 10 (LP-V0) | Ziel: Tool-V1 Niveau (20+)
> Stand: 2026-06-19

### Primäre Keywords (Top-20 Longtail)

| # | Keyword | Suchintention | Priorität |
|---|---|---|---|
| 1 | EU AI Act Art. 50 Kennzeichnung | Informational/Compliance | ⭐⭐⭐ |
| 2 | KI Kennzeichnungspflicht 2026 | Informational/Deadline | ⭐⭐⭐ |
| 3 | KI-generierte Inhalte kennzeichnen Pflicht | Informational | ⭐⭐⭐ |
| 4 | AI Act Compliance Tool kostenlos | Transactional | ⭐⭐⭐ |
| 5 | EU AI Act KMU Pflichten 2026 | Informational | ⭐⭐⭐ |
| 6 | ai-transparency.json Generator | Transactional | ⭐⭐⭐ |
| 7 | KI Transparenz Nachweis Tool | Transactional | ⭐⭐ |
| 8 | EU AI Act Bußgeld Art. 99 | Informational | ⭐⭐ |
| 9 | KI Policy Generator kostenlos | Transactional | ⭐⭐ |
| 10 | AI Act August 2026 Frist | Informational | ⭐⭐ |
| 11 | KI Inhalt Kennzeichnung Anleitung | Informational | ⭐⭐ |
| 12 | AI Act Betroffenheitscheck KMU | Transactional | ⭐⭐ |
| 13 | well-known ai-transparency.json Standard | Navigational | ⭐⭐ |
| 14 | KI Transparenz Dokumentation Deutschland | Informational | ⭐ |
| 15 | EU AI Act Self-Service Tool | Transactional | ⭐ |
| 16 | AI Act Policy Layer Nachweis | Informational | ⭐ |
| 17 | KI Texte deklarieren EU Recht | Informational | ⭐ |
| 18 | Künstliche Intelligenz Kennzeichnungspflicht DACH | Informational | ⭐ |
| 19 | Machine-readable AI declaration JSON | Technical | ⭐ |
| 20 | EU AI Act Compliance Badge Website | Transactional | ⭐ |

### Reserve-Keywords (5)
- "GPAI Code of Practice Kennzeichnung", "AI Act Art. 50 Ausnahme redaktionell", "KI Siegel Website", "AI Transparenz Siegel", "ChatGPT Content Kennzeichnungspflicht"

### Themen-Cluster (6)

| Cluster | Pillar-Seite | Sub-Seiten / FAQ-Fragen |
|---|---|---|
| **1. EU AI Act Art. 50 — Was müssen KMU tun?** | `/check` (Betroffenheits-Check) | "Bin ich betroffen?", "Was ist Art. 50(4)?", "Welche Ausnahmen gibt es?" |
| **2. ai-transparency.json — Standard & Technik** | `/spec` (Spec-Dokumentation) | "Was ist ai-transparency.json?", "Wie implementiere ich die Datei?", "WordPress/Squarespace Anleitung" |
| **3. KI-Kennzeichnung — Umsetzung & Nachweis** | `/generate` (Generator) | "Wie erstelle ich die JSON?", "Policy-Layer vs. Content-Layer", "Managed-Hosting-Fallback" |
| **4. Validator — Selbst-Check & Verifikation** | `/validate` (Validator) | "Wie prüfe ich meine Policy?", "Was bedeutet VALID/INVALID?", "Badge aktivieren" |
| **5. EU AI Act Frist & Bußgelder** | LP (Hero + Problem-Sektion) | "August 2026 Deadline", "Bußgeld bis 15 Mio. €", "Compliance-Vermutung CoP" |
| **6. Kostenvergleich: Anwalt vs. Tool** | LP (Pricing-Sektion) | "Anwalt 5.000 € vs. 49 €/Monat", "ROI-Rechnung", "Free-Tier reicht für KMU?" |

### Sprachstrategie
- **DE-Only** (V1): Alle Inhalte Deutsch. Keine i18n-Infrastruktur in V1.
- Ausnahme: Technische Begriffe (ai-transparency.json, `/.well-known/`) bleiben EN.

### Ranking-Ziel (messbar)
- **6 Monate nach Launch:** Top 5 für "ai-transparency.json Generator" (nahezu kein Wettbewerb, Blue Ocean)
- **12 Monate:** Top 10 für "KI Kennzeichnungspflicht 2026" (höherer Wettbewerb durch IHK/Kanzleien)
- **Conversion-Ziel:** ≥ 5% Visit → E-Mail (Multi-Bet-Validation Erfolgs-KPI)

### AEO-Schema-Anforderung
- **FAQ-Schema** (JSON-LD) auf LP: mindestens 5 der oben genannten FAQ-Cluster-Fragen
- **HowTo-Schema** auf `/generate`: "Wie erstelle ich eine ai-transparency.json in 5 Schritten?"
- **SoftwareApplication-Schema** auf LP: Tool-Beschreibung + Betriebssystem (Web) + Preis (Free)

---

> **✅ Vollständigkeits-Check:** Alle Anforderungen aus Lastenheft und 3b_Tools_Tech sind im Pflichtenheft reflektiert. Die 6 identifizierten Gaps (Betroffenheits-Check, Generator Step 0 ACK, Badge-Spec, 2-Layer-Status, Agency V2, V1 Scope Vollständigkeit) sind geschlossen. Das Pflichtenheft beschreibt den ai-transparency.json Validator (nicht den alten KI-Text-Detektor). Privacy-by-Architecture + SEO/AEO ergänzt 2026-06-19.

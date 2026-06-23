---
id: ID2604071725
name: aiclaration
status: validated
audit_status: passed
profit_potential: 5
founder_fit: 4
market_size: 5
competition: 5
time_to_revenue: 4
---

> **Nächster Schritt:** [[2_Lokales_Research|2_Research]] → [[3_Validierung|3_Validierung]] → [[4_Pflichtenheft|4_Pflichtenheft]]
> **Status:** [[5_ClaudeCode_State|5_State]] · **Regeln:** [[Rules|Verfassung]]
> **⚠️ Repositioniert 2026-04-07** – Neues Konzept: ai-transparency.json Standard statt KI-Text-Detektor. Standard-Name: Englisch für IANA-Kompatibilität.
> **🌐 Domain 2026-04-08:** Brand: `aiclaration` (.de/.eu/.com frei) — Standard-Dateiname bleibt `ai-transparency.json`
> **📋 Scorecard:** [[0_Ideen_Scorecard|0_Scorecard]] — 20/20 ✅
> **🛡️ Audits:** [[_Audit_Report_Gatekeeper|Gatekeeper]]
> **🔄 Optimiert 2026-04-08** – Adoption-Coalition, Content-Labeling Add-on, Directory-First Growth

---

## Vision & Pain Point

Ab August 2026 gilt EU AI Act Art. 50(4): Jedes Unternehmen das KI-generierten Text online publiziert, muss diesen kennzeichnen. Bußgelder: bis 15 Mio. € oder 3% des weltweiten Jahresumsatzes (Art. 99 Abs. 4).

Das Problem ist nicht die Pflicht selbst — das Problem ist **der Nachweis**: Wie beweist ein Unternehmen gegenüber Regulatoren, Kunden und Partnern, dass es eine funktionierende KI-Transparenz-Richtlinie hat? Ein Anwalt kostet 5.000–15.000 € für ein Gutachten. Nichts tun = Bußgeld-Risiko.

**Unsere Lösung:** Wir definieren `ai-transparency.json` — den offenen Standard für maschinenlesbare KI-Transparenz-Erklärungen im Web. Analog zu `robots.txt` (Crawler-Regeln), `security.txt` (Sicherheitskontakte) und `ads.txt` (Werbe-Compliance): Eine einfache JSON-Datei unter `/.well-known/ai-transparency.json`, die öffentlich, überprüfbar und audit-fähig dokumentiert, wie ein Unternehmen KI-Inhalte handhabt.

**Das Ergebnis:** Datei anlegen → bei uns validieren → verifizierten Badge auf die Website → dokumentierter, öffentlich prüfbarer Nachweis des KI-Transparenz-Prozesses. *(Hinweis: "Nachweis gegenüber Regulatoren" wird nicht garantiert — wir dokumentieren den Prozess, keine Rechtswirkung)*

> **⚠️ Wichtige Positionierungs-Klarstellung (RDG + Missverständnis-Prävention):**
> `ai-transparency.json` ist ein **Policy-Layer** (Nachweis des Prozesses) — kein **Content-Layer** (Kennzeichnung einzelner Texte).
> Art. 50(4) erfordert BEIDE Ebenen: (1) Jeder KI-generierte Artikel muss im Text selbst als KI-generiert markiert sein. (2) Das Unternehmen muss nachweisen, dass es einen funktionierenden Prozess dafür hat.
> Unser Tool löst Ebene 2. Ebene 1 obliegt dem Unternehmen selbst (Content-Management-System, Redaktionsprozess).
> **Kommunikation:** Nie "mit ai-transparency.json sind Sie compliant" — immer "ai-transparency.json dokumentiert Ihren Compliance-Prozess. Für vollständige Compliance: Einzelne KI-Texte zusätzlich kennzeichnen."

---

## Mono-Persona (Primär)

**"Online-Marketing-Leiterin bei deutschem Mittelständler (50–500 MA) mit Blog/News-Bereich"**
- Nutzt ChatGPT/Copilot/Claude täglich für Content
- Weiß, dass der AI Act 2026 kommt — weiß nicht wie sie Konformität nachweist
- Hat Anwalts-Angebot (5.000 €) für Gutachten abgelehnt
- Kann JSON-Datei auf dem Webserver ablegen (Webmaster-Level-Kompetenz)
- LinkedIn-suchbar: "Online Marketing Manager" + "Deutschland" = 50.000+ Profile

**Sekundär (B2B2B-Skalierung): Webagenturen**
- Eine Agentur betreut 20–100 Kunden-Websites — muss für ALLE AI Act-Konformität liefern
- Agency-Plan (299 €/Monat) = bis 50 Domains, White-Label-Badge, Reseller-Margin
- Agentur zahlt 299 € → stellt Kunden je 20 €/Monat in Rechnung → Marge 701 €/Monat
- DACH hat 12.000+ Webagenturen → 1% = 120 Agenturen × 299 € = 35.880 € MRR

---

## Produkt-Architektur: 3 Schichten

### Schicht 1 — Open Standard (kostenlos, IETF-kompatibel)
Wir publizieren die offene Spezifikation für `ai-transparency.json` auf aiclaration.de/spec. GitHub-Repo (open source, forkbar). Einreichung als `/.well-known/` URI bei IANA (RFC 5785) + Vorschlag bei W3C Community Group.

Beispiel-Struktur:
```json
{
  "version": "1.0",
  "last_updated": "2026-04-07",
  "ai_content_policy": {
    "uses_ai_content": true,
    "content_types": ["marketing_text", "blog_posts"],
    "labeling_method": "inline_disclosure",
    "human_review": true,
    "tools_used": ["ChatGPT", "Claude"]
  },
  "contact": "datenschutz@example.de",
  "legal_basis": "EU AI Act Art. 50(4)"
}
```

### Schicht 2 — Generator + Validator + Labeling-Hilfe (kostenlos, Lead-Funnel)
- **Generator-Wizard:** 5 Fragen → `ai-transparency.json` wird generiert + zum Download angeboten
  - Frage 1: Nutzt Ihr Unternehmen KI zur Content-Erstellung? (Ja/Nein)
  - Frage 2: Welche Content-Typen? (Blog, Newsletter, PR, Social, Sonstiges — Mehrfachauswahl)
  - Frage 3: Kennzeichnen Sie KI-Inhalte im Text? (Ja / Nein / In Planung)
  - Frage 4: Prüft ein Mensch den KI-Content vor Veröffentlichung? (Ja / Nein)
  - Frage 5: Kontakt-E-Mail für KI-Transparenz-Anfragen? (Eingabe)
- **Validator:** URL eingeben → Tool prüft `/.well-known/ai-transparency.json` auf Korrektheit
- **Managed-Hosting-Fallback:** Für WordPress/Squarespace/Jimdo-Nutzer ohne Serverzugang: Anleitung zur Einbindung via Redirect-Plugin oder Subdomain-Workaround.
- **Content-Labeling Snippet (neu, V1):** Copy-Paste HTML-Schnipsel für inline disclosure:
  ```html
  <!-- Dieser Text enthält KI-generierte Inhalte gemäß EU AI Act Art. 50(4) -->
  ```
  → Kein Tool, kein Service — nur ein Schnipsel den man in seine Website einfügt. Kostenlos, für alle nutzbar, auch ohne unser Tool.
- Vollständig stateless. Kein ML/KI. Reines JSON-Schema-Matching. Trivial zu bauen.

### Schicht 3 — Verified Badge (bezahlt, recurring)
- Wir **hosten** die `ai-transparency.json` auf `aiclaration.de/v/[company-slug]`
- **Slug-Zuweisung V1:** Nach Stripe-Payment → Betreiber legt Slug manuell an (E-Mail mit Slug-Bestätigung an Kunden). Kein automatisierter Account-Flow in V1.
- Website verlinkt zu unserer gehosteten Version (statt self-hosted)
- Vorteile: unveränderbar, versioniert, SHA-256-timestamp-gesichert, sofort vertrauenswürdig
- **Badge-Spec:** Klickbares SVG-Siegel (240×80px), Slate/Emerald-Farbschema, Icon: Schild + Haken, Text: "KI-Transparenz-Prozess dokumentiert ✓" → öffnet Verification-Page mit Policy-Details.
- **Verzeichnis-Prozess:** Nach Slug-Anlage → automatischer Eintrag in statisches Verzeichnis (`aiclaration.de/directory`) via nächstem Hetzner EU + Coolify-Deploy.
- **Hohe Stickiness:** einmal eingebaut + in Unternehmens-Richtlinien referenziert = dauerhafter Link auf unsere Domain

---

## Architektur & Security

- **Frontend:** Next.js Static Export (kein SSR) — Landingpage, Generator-Wizard, Validator-UI
- **Backend:** Serverless Edge Function (Hetzner EU + Coolify EU) — HTTP-Fetch der Ziel-URL + JSON-Schema-Validation
- **Secret Management:** Bitwarden CLI (EU) — KEINE .env-Dateien → [[3b_Tools_Tech|Tech-Stack]]
- **Fremd-APIs:** Keine. Validator = URL-Fetch + lokales JSON-Schema-Matching.
- **SSRF-Protection:** Validator-Edge-Function blockt private IP-Ranges, Loopback + Cloud-Metadata-Endpoints
- **Hosted-JSON V1:** Statische Dateien auf Hetzner EU + Coolify — manuell nach Stripe-Payment angelegt. Kein Datenbank-Speicher in V1.

---

## Regulatorische Basis — Art. 50(4) ist breit anwendbar

Art. 50(4) AI Act gilt **nicht** nur für High-Risk-KI-Systeme. Er erfasst jede KI die Text *"zum Zweck der Information der Öffentlichkeit über Themen von öffentlichem Interesse"* generiert und online publiziert. Exception: wenn eine natürliche Person redaktionell verantwortlich ist und den Inhalt überprüft hat.

**Betroffene Inhalte:** Unternehmensblogs, PR-Texte, Newsletter, Pressemitteilungen — sofern KI-generiert ohne vollständige menschliche Redaktion und zum Zweck der öffentlichen Information.

**Die Compliance-Frage ist nicht "bin ich betroffen?" (ja) sondern "wie weise ich nach?"** — genau das lösen wir.

---

## Competitive Landscape — Warum Blue Ocean 5/5

| Anbieter | Kategorie | Warum KEIN Konkurrent |
|---|---|---|
| GPT Detector, Turnitin, Originality.AI | Text-Detection | Empfänger-Tools (Plagiat-Check bei Lesern) — kein Siegel, kein Standard |
| OpenAI C2PA Content Credentials | Bild-Metadaten | Nur für Bilder/Videos, nicht für Website-Policies |
| ai.txt / robots.txt-Erweiterungen | Crawler-Regeln | Regelt ob KI crawlen darf — nicht ob KI-Content ausgewiesen wird |
| OneTrust, TrustArc, Cookiebot | Privacy/DSGVO | Decken AI Act Art. 50 explizit nicht ab, andere Compliance-Domäne |
| EU AI Office | Regulierungsbehörde | Kein SaaS, kein Badge, keine kommerzielle Lösung |

**Kein einziger Anbieter** stellt heute einen öffentlich verifizierbaren, maschinenlesbaren `/.well-known/`-Standard für EU AI Act Art. 50-Compliance aus — weder kommerziell noch open source.

---

## Moat: 5 Schutzschichten

1. **Standard-Moat:** Wir definieren `ai-transparency.json` bevor jemand anderes es tut. Unternehmen die unsere Spec implementieren werden keine "alternative JSON-Benennung" adaptieren.
2. **Timing-Moat:** AI Act Art. 50 gilt ab Aug 2026. Launch April/Mai 2026 = 3–4 Monate First-Mover.
3. **Network-Moat:** Öffentliches Verzeichnis aiclaration.de/directory aller verifizierten Firmen. Je mehr Einträge, desto wertvoller das Siegel.
4. **Institutioneller Moat:** IANA-Registrierung + W3C-Einreichung. Institutionelle Adoption ist für Konkurrenten nicht replizierbar.
5. **Coalition-Moat (NEU):** 10 Founding Members die das Format öffentlich adoptieren. Macht den Standard "too big to fail" bevor IANA greift. Wettbewerber müssen gegen eine Coalition antreten, nicht nur gegen uns.

---

## Adoption-Strategie: Directory-First + Coalition

> **Kern-Erkenntnis:** Ein Standard ist nur so viel wert wie seine Adoption. Ohne Adoption = wertlos. Deshalb: **Directory und Coalition ZUERST**, nicht nach dem Launch.

### Phase 0 — Pre-Launch Coalition (parallel zu V1-Build)

**10 Founding Members gewinnen — VOR public Launch:**
- 10 Unternehmen (KMU oder Agenturen) die frühzeitig adoptieren
- Angebot: **Lifetime Pro Plan (0 € statt 99 €/Monat)** + Featured auf Landingpage
- Gegenleistung: Logo auf Landingpage + Case Study + öffentliches Statement
- **Kommunikation:** "Diese Unternehmen vertrauen auf ai-transparency.json als Industry Standard"
- **Effekt:** Social Proof VOR Launch. Pressemitteilung: "X Unternehmen nutzen bereits ai-transparency.json"

**Warum das funktioniert:**
- Für Founding Members: Kostenlos + öffentliche Sichtbarkeit + "wir waren dabei" — kein finanzielles Risiko für Early Adopter
- Für uns: Coalition BEVOR der Launch startet. Die Coalition IST der Beweis dass das Format ernst genommen wird.
- **Begründung 0 €:** Chicken-and-Egg-Standard-Adoption — Netzwerkeffekt > kurzfristige MRR. Ohne Coalition kein Standard, ohne Standard kein Produkt.

> **⚠️ Operatives Risiko — Keine Customer-Calls (Vault-Policy, Audit 2026-06-19):** 10 Unternehmen ohne persönlichen Erstkontakt zu gewinnen ist ein steiles Ziel. Empfohlene Ausweich-Taktik ohne Calls: (1) LinkedIn-Direktnachricht mit fertigem Onboarding-Link ("2 Klicks, fertig eingebunden") — so wenig Friction wie möglich. (2) IHK/Branchenverband-Forum-Beitrag statt Einzelansprache. (3) Heruntersetzen auf 3 Founding Members als MVP-Coalition wenn 10 nicht erreichbar. Kern-Erkenntnis: kein Call nötig wenn der Aufwand für den Founding Member nahe null ist.

### Phase 1 — Launch + Directory

**Launch 2026-04/05:**
- Pressemitteilung: "ai-transparency.json — der neue Standard für KI-Transparenz"
- IHK-Presseticket oder Gründerzeit-Artikel
- LinkedIn-Post über Founding Members (mit Logos)
- Ziel: 50 Einträge im Directory bis Ende Mai 2026

**Directory = Social Proof Engine:**
- Jeder neue Eintrag macht das Siegel wertvoller
- FOMO: "XYZ ist schon im Directory — wir noch nicht?"
- Badge auf Website = Link auf unsere Domain = Traffic = SEO

### Phase 2 — IANA + W3C (nach Launch)

**Einreichung starten (Woche 1–2):**
- GitHub-Repo als Grundlage für IANA-Review
- Spec-Dokumentation auf aiclaration.de/spec
- Ziel: RFC 5785 `/.well-known/` Registrierung

**Falls IANA scheitert:**
- Coalition bleibt bestehen — der Standard existiert trotzdem
- Wir haben bereits 50+ adopting Unternehmen = too big to ignore

---

## Content-Labeling Add-on (NEU, V1)

> **Kern-Problem das wir lösen:** Policy-Layer zu haben ohne Content-Layer ist halb gelöst. Unternehmen wissen nicht WIE sie einzelne Texte kennzeichnen.

### Das Problem

Art. 50(4) erfordert:
1. **Policy-Layer** (✅ unser Tool) — Prozess dokumentieren
2. **Content-Layer** (❌ fehlt) — Jeden einzelnen Text kennzeichnen

Die meisten Unternehmen haben keine Ahnung wie sie "inline disclosure" umsetzen sollen. Das ist der aufwändige Teil — und der Teil der bei Nicht-Umsetzung zu Bußgeldern führt.

### Unsere Lösung: Content-Labeling Snippet (kostenlos, für alle nutzbar)

**Kein Tool, kein Service, keine Integration nötig.**

Wir stellen einen HTML-Schnipsel bereit den man in jede Website einfügen kann:

```html
<!-- Dieser Text enthält KI-generierte Inhalte gemäß EU AI Act Art. 50(4) -->
```

**Und ein Beispiel für Blog-Posts:**

```html
<p class="ai-disclosure">Dieser Blogbeitrag wurde mit KI-Unterstützung erstellt.</p>
```

**plus CSS:**

```css
.ai-disclosure {
  font-size: 0.75rem;
  color: #64748b;
  border-left: 3px solid #e2e8f0;
  padding-left: 1rem;
  margin-top: 2rem;
}
```

**Warum das in V1 gehört:**
- Differenzierung: Kein Konkurrent bietet das an
- Sofort-Nutzen: Für Unternehmen die noch gar keinen Content-Layer haben
- Lead-Capture: "Hier ist Ihr Snippet — aber wenn Sie es automatisieren wollen, nutzen Sie unser Tool"
- Es löst das echte Problem, nicht nur das dokumentierte

**Kommunikation (RDG-sicher):**
> "Dieser Snippet hilft Ihnen bei der Umsetzung des Content-Layers. Für rechtsverbindliche Beratung zur Kennzeichnung: Rechtsanwalt."

---

## Freebie-Strategie

### Top-of-Funnel (kostenlos, SEO, 3 Fragen, <2 Min.)
"Bin ich als Unternehmen von EU AI Act Art. 50 betroffen?" → Ja/Nein + Erklärung → direkte Weiterleitung zum Generator.

### Middle-of-Funnel (kostenlos, Lead, Progress-Loop)
`ai-transparency.json` Generator mit sichtbarem Fortschritt:
- Schritt 1/3: JSON-Datei erstellt (Download) + Content-Labeling Snippet angeboten
- Schritt 2/3: Implementiert auf Website (Anleitung + Check)
- Schritt 3/3: Verifiziert + Badge aktiviert → **natürlicher Upgrade-Trigger zum Paid-Plan**
- **Acknowledgment-Placement:** Pflicht-Checkbox ("Ich verstehe: Policy-Layer ≠ Content-Layer") erscheint in Schritt 3 (vor Badge-Aktivierung) — NICHT als Gate vor Schritt 1. Friction-Reduktion für Free-User-Einstieg.
- **Rückkehr-Trigger (Free-Plan):** Nach Policy-Änderung → erneuter Validator-Check nötig → 1 kostenloser Re-Check bei Änderung der KI-Tool-Nutzung.

> **⚠️ Managed-Hosting-Friction (bekanntes Risiko, Audit 2026-06-19):** Geschätzt 60–70% der DACH-KMU-Websites laufen auf Strato, IONOS, 1&1, All-Inkl., Jimdo, Squarespace — ohne direkten Webserver-Zugang zum Root-Verzeichnis. Das Ablegen der `/.well-known/ai-transparency.json` erfordert Workarounds (Redirect-Plugin, Subdomain), die für die Buyer Persona eine echte Barriere sind.
>
> **Empfehlung V1.5 — Zero-Tech-Option:** `aiclaration.de/v/[slug]` AUCH im Free-Tier als gehostete URL anbieten (nicht erst im Paid-Plan). Nutzer ohne Serverzugang können diese URL als Nachweis verwenden — kein Self-Hosting nötig. Der Paid-Plan-Mehrwert bleibt: monatliche Auto-Checks, Alert, Badge. Entscheidung ausstehend: Wird V1 direkt damit geliefert oder als V1.5 nach Markttest?

---

## Revenue Model

| Plan | Preis | Leistung |
|---|---|---|
| Free | 0 € | Spec-Doku + JSON-Generator + Content-Labeling Snippet + einmaliger Validator-Check |
| Pro | 99 €/Monat | Wöchentliche Prüfung + PDF-Audit-Report (SHA-256) + API-Zugang + Badge + Alert bei Policy-Änderung |
| Agency | 299 €/Monat | Bis 50 Domains + White-Label-Badge + Reseller-Dashboard (V2) |

---

## Compliance (Produkt selbst)

- **DSGVO:** Kein Nutzer-Content gespeichert. Validator macht nur HTTP-Fetch externer URLs. Stateless. Kein Tracking, keine Cookies. Datenschutzerklärung + Impressum auf Landingpage.
- **RDG-Firewall (Pflicht auf jeder Seite):** *"Dies ist kein Rechtsrat. `ai-transparency.json` ist eine technische Selbstauskunft. Für rechtsverbindliche Compliance-Beurteilung: Rechtsanwalt hinzuziehen."*
- **EU AI Act:** Eigene Konformität durch öffentliche Spec-Dokumentation + menschliche Redaktion sichergestellt.
- **AVV mit Kunden:** ❌ Kein individueller Auftragsverarbeitungsvertrag mit Kunden. *(Entscheidung 2026-04-08)* Mitigation: V1 ist stateless. ToS und Datenschutzerklärung regeln dass Kunden für den Inhalt ihrer `ai-transparency.json` selbst verantwortlich sind.

---

## Kommunikations-Architektur (Pflicht — Policy-Layer-Klarheit)

> **Ziel:** 100% ausschließen, dass Kunden `ai-transparency.json` mit vollständiger AI-Act-Compliance verwechseln.

### Verbotene Begriffe — niemals im gesamten Produkt verwenden

❌ "compliant" / "konform"
❌ "AI Act Zertifikat" / "Zertifizierung"
❌ "sicher vor Bußgeldern"
❌ "AI Act erfüllt"
❌ "vollständige Compliance"

### Pflicht-Formulierungen — immer stattdessen

✅ "KI-Transparenz-Prozess dokumentiert"
✅ "Compliance-Prozess nachweisbar"
✅ "Policy-Layer verifiziert"
✅ "Dokumentierter Nachweis Ihres Transparenz-Prozesses"

### 5 strukturelle Maßnahmen (nicht verhandelbar, V1-Pflicht)

**1. Badge-Name schließt Vollständigkeit sprachlich aus**
Niemals "KI-Act-Compliant-Badge". Immer: "KI-Transparenz-Prozess dokumentiert ✓"

**2. Generator Step 0 — Pflicht-Acknowledgment (kein Skip)**
Vor dem ersten Wizard-Schritt, Pflicht-Checkbox ohne die es nicht weitergeht:
> *"Ich verstehe: `ai-transparency.json` dokumentiert meinen organisatorischen Transparenz-Prozess gemäß EU AI Act Art. 50(4). Die Kennzeichnung jedes einzelnen KI-generierten Textes im Content bleibt meine eigene Pflicht und wird durch dieses Tool nicht übernommen."*

**3. Validator-Ergebnis zeigt immer explizit 2-Layer-Status**
```
✅ Policy-Layer: KI-Transparenz-Prozess dokumentiert und verifiziert
⬜ Content-Layer: Kennzeichnung einzelner KI-Texte — Ihre Verantwortung (technisch nicht prüfbar durch dieses Tool)
```

**4. Badge Hover-Tooltip auf Kunden-Website**
Eingebettetes SVG-Badge zeigt beim Hover:
> *"Dieser Betrieb hat seinen KI-Transparenz-Prozess gemäß EU AI Act Art. 50(4) dokumentiert. Einzelne KI-generierte Inhalte werden vom Betrieb separat im Content gekennzeichnet."*

**5. Onboarding-E-Mail nach Registrierung**
Erste E-Mail enthält zwingend:
- ✅ Was das Badge abdeckt (Policy-Layer)
- ⬜ Was der Kunde selbst sicherstellen muss (Content-Layer: Inline-Kennzeichnung jedes KI-Textes)
- Link zum Content-Labeling Snippet (kostenloser Mehrwert)

---

## Email-Policy

- **Resend:** System-Alerts (API-Fehler, Uptime-Monitoring, Badge-Ablauf-Warnungen)
- **Brevo:** Marketing/Newsletter für Free→Paid-Conversion + Agency-Outreach

---

## Scope — V1 IN SCOPE (stateless, <12 Wochen)

- `ai-transparency.json` Spezifikation publizieren (Doku auf aiclaration.de/spec)
- **Pre-Launch Coalition:** 10 Founding Members gewinnen (Pro 99 €/Monat gelockt + Featured)
- JSON-Generator-Wizard (5 definierte Fragen → Download, kein Login)
- **Content-Labeling Snippet** (HTML/CSS Schnipsel für inline disclosure — kostenlos für alle)
- URL-Validator (URL eingeben → prüft `/.well-known/ai-transparency.json`, serverless)
- Managed-Hosting-Fallback-Anleitung (WordPress/Squarespace/Jimdo ohne Serverzugang)
- Verified-Badge-Registrierung (Stripe, Basis-Plan, Hosted-JSON + manueller Slug-Prozess)
- Öffentliches Verzeichnis verifizierter Unternehmen (statische JSON-Liste, Hetzner EU + Coolify-Deploy)
- Two-Stage Freebie (Betroffenheits-Check 3 Fragen + Generator Progress-Loop)
- Landingpage mit Hero-H1, ROI-Rechnung, FAQ-Accordion (SEO), Presse-CTA, Agency-Formular
- Founding Member Logos auf Landingpage
- **WCAG 2.2 AA:** Pflicht-Anforderung — alle Kontraste ≥ 4.5:1, Touch-Ziele ≥ 44×44px

## Sofort-Aktion (Woche 1–2, parallel zu V1-Build)

- **Founding Members gewinnen** — 10 Unternehmen kontaktieren (LinkedIn, IHK, Netzwerk) → Pro 99 €/Monat gelockt anbieten
- **IANA `/.well-known/ai-transparency.json` Einreichung starten**

## Scope — V2 (nach Market-Validation)

- Agency-Dashboard (Multi-Domain-Verwaltung, White-Label)
- Automatische Weekly-Checks + Email-Alert
- PDF-Audit-Report (SHA-256 Timestamp)
- API-Zugang für programmatische Integration

## ❌ EXPLIZIT NICHT IN V1/V2 (Anti-Scope-Creep Firewall)

- KI-Text-Detection / Plagiats-Prüfung (altes Konzept — komplett gestrichen)
- Watermarking-API oder -Algorithmus (technisches Armsrennen, gestrichen)
- Rechtsgutachten oder Compliance-Zertifizierung (RDG-Firewall: kein Rechtsrat)
- Nutzer-Daten-Speicherung / Login / Accounts in V1 (stateless-Prinzip)
- Browser-Extension oder Desktop-App
- Konkurrenten-Monitoring oder Social-Media-Scanning
- EU-weiter Launch in V1 (DACH-only, keine Multi-Language)
- Integration in bestehendes Compliance-SaaS
- Blockchain / NFT-Nachweis
- **Anwalt oder Rechtsberatung** (keine Rechtsdienstleistung — wir sind Technologie-Anbieter)

---

## ⚠️ Bekannte Geschäftsrisiken (Stand: 2026-06-19)

> Diese Risiken sind bekannt, bewertet und bewusst akzeptiert. Sie sind kein K.O. — aber müssen im Implementation-Vault und beim Go-to-Market aktiv gemanaged werden.

### Risiko 1 — Art. 50(4)-Auslegungsambiguität (HOCH)

**Sachverhalt:** Art. 50(4) EU AI Act verpflichtet Betreiber von KI-Systemen, deren Outputs als KI-generiert auszuweisen. Weder der AI Act noch der EU CoP (finalisiert 10.06.2026) definieren `ai-transparency.json` als offiziell anerkanntes Compliance-Nachweis-Format. Das Format ist aiclarations eigene technische Spezifikation.

**Konsequenz:** Ein KMU das unser Tool kauft, hat einen dokumentierten Prozess-Nachweis — aber keine Garantie, dass dieser Nachweis vor der Bundesnetzagentur oder nationalen AI-Aufsichtsbehörden als hinreichend gilt.

**Mitigation (bereits implementiert):**
- RDG-Firewall auf jeder Seite: "kein Rechtsrat, technische Selbstauskunft"
- Badge-Name und alle Kommunikation: "Prozess dokumentiert" — nie "compliant"
- Step-0-ACK im Generator: Nutzer bestätigt explizit, dass Policy-Layer ≠ vollständige Compliance

**Was sich ändern kann (positiv):** IANA-Registrierung + CoP-Adoption durch Unternehmen → de-facto-Standard → Regulatoren übernehmen Referenz. Das ist der Wett-Kurs auf den wir setzen.

**Was trotzdem gilt:** Das Produkt löst ein echtes Problem (Dokumentation des Prozesses) — unabhängig davon ob es gerichtlich als Nachweis durchgeht. Der Nutzer ist besser gestellt als ohne das Tool.

### Risiko 2 — Managed-Hosting-Friction

→ Dokumentiert in Freebie-Strategie oben. Mitigation: Zero-Tech-Option `/v/[slug]` im Free-Tier (Entscheidung ausstehend).

### Risiko 3 — Coalition-Akquise ohne Customer-Calls

→ Dokumentiert in Phase 0 Coalition oben. Mitigation: 3-statt-10-MVP-Schwelle, LinkedIn-Low-Friction-Onboarding.

---

## Testbarkeit (JSON-Validator Szenarien)

Mindestens 10 definierte Szenarien für automatisierte Tests:

| # | Szenario | Input | Erwartet |
|---|---|---|---|
| 1 | Korrekte Policy — Blog | Unternehmens-Blog, inline disclosure | VALID ✅ |
| 2 | Korrekte Policy — PR-Texte | PR-Agentur, human_review: true | VALID ✅ |
| 3 | Korrekte Policy — Newsletter | SaaS, tools_used befüllt | VALID ✅ |
| 4 | Korrekte Policy — Agentur (multi) | 3 content_types | VALID ✅ |
| 5 | Korrekte Policy — kein KI-Einsatz | uses_ai_content: false | VALID ✅ |
| 6 | Fehlend: uses_ai_content | Pflichtfeld leer | INVALID ❌ |
| 7 | Fehlend: legal_basis | Kein Art.-50-Bezug | INVALID ❌ |
| 8 | Fehlend: contact | Kein Ansprechpartner | INVALID ❌ |
| 9 | Datei nicht vorhanden | 404 auf /.well-known/ | NOT FOUND ❌ |
| 10 | Falscher MIME-Type | text/html statt application/json | FORMAT ERROR ❌ |

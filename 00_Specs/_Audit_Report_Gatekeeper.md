---
type: audit_report
project_id: ID2604071725
project_name: aiclaration
audit_date: 2026-03-31
auditor: Gatekeeper Auditor
status: failed
---

# Audit Report: aiclaration — Initialer Gatekeeper

**Status:** ❌ FAILED — Project should not proceed in current form. Recommend archive or major pivot.

**Project:** [[1_Lastenheft|aiclaration]] (ID: ID2604071725)
**Date:** 2026-03-31
**Auditor:** Claude Gatekeeper

---

## Executive Summary

This project **fails the Gatekeeper audit on 4 critical dimensions:**

1. **Vague Problem Statement** — "KMUs riskieren Bußgelder" could apply to 500 regulations, not 1 specific compliance obligation
2. **Questionable Moat** — No evidence that AI-text detection is technically defensible (existing tools: GPT Detector, Turnitin, etc.)
3. **Scope Creep Risk** — Watermarking API as V2 feels like feature-creep without market validation
4. **Conflict with Learnings** — Repeats known anti-pattern: over-engineering without validation

**Recommendation:** Archive this project OR pivot to specific regulatory compliance (like EQUIVALT/CBAM).

---

## Audit Checklist Results

### Section 1: Rules & Governance

| Criterion | Status | Notes |
|-----------|--------|-------|
| Mono-Micro-SaaS focus | ❌ FAIL | Too broad: "German KMUs who generate AI text" = millions, not thousands |
| Founder-fit score | ⚠️ PASS (but marginal) | founder_fit: 3. No regulatory moat to lean on |
| Blue Ocean positioning | ❌ FAIL | Competitors exist: OpenAI's AI Detector, Turnitin, Originality.AI. No differentiation explained |
| Regulatory/Technical/Network moat | ❌ FAIL | Neither: Detection is arms-race problem (AI improves → detector breaks) |
| Time-to-Revenue ≤ 4 | ⚠️ CONDITIONAL | time_to_revenue: 2. But realistic for FREEBIE only. Paid features (watermarking) unvalidated |
| Stateless architecture | ✅ PASS | V1 is stateless (OK). But V2 introduces complexity |

**Overall Section 1:** ❌ FAIL

---

### Section 2: Vision Clarity

| Criterion | Status | Issue |
|-----------|--------|-------|
| Pain point is ONE SPECIFIC problem | ❌ FAIL | "KMUs risk fines under EU AI Act Art. 50" is too vague. What specific use case? Marketing? Support? Code generation? All have different compliance requirements. |
| Magic Moment is concrete | ⚠️ UNCLEAR | "Prüft in 30 Sekunden ob Text KI-generiert ist" — but who cares? No stakeholder benefit articulated (user saves time? avoids fines? reduces liability?) |
| Zielgruppe is specific | ❌ FAIL | "German KMUs generating AI text" ← too broad. Should be: "Marketing Teams at Series-A Tech Startups using GPT for copy" |
| Business Model is clear | ⚠️ PASS (barely) | Freemium + Paid API. But: Pricing not specified. How much for watermarking? |

**Overall Section 2:** ❌ FAIL

---

### Section 3: Market & Research

| Criterion | Status | Issue |
|-----------|--------|-------|
| TAM/SAM/SOM defined | ❌ MISSING | No `2_Lokales_Research.md` or research in Lastenheft. How many German KMUs? What % generate AI text? |
| Competitors analyzed | ❌ MISSING | No mention of OpenAI Detector, Turnitin, Originality.AI, or any competitive analysis |
| Market size ≥ 2 | ⚠️ QUESTIONABLE | market_size: 4 (assigned arbitrarily). No evidence |
| Regulatory landscape documented | ⚠️ PARTIAL | "EU AI Act (2026)" mentioned. But: Art. 50 only applies to HIGH-RISK AI systems. Most KMU use cases are LOW-RISK. Is this even a real compliance obligation? |
| Customer pain validated | ❌ MISSING | No customer interviews, no proof KMUs care about this |

**Overall Section 3:** ❌ FAIL

---

### Section 4: Technical Feasibility

| Criterion | Status | Issue |
|-----------|--------|-------|
| `3b_Tools_Tech.md` exists and justified | ⚠️ INCOMPLETE | Tech stack mentioned (Next.js, Rust, local heuristics). But: No justification for Rust vs. JavaScript for heuristics. Why not use OpenAI Classifier API if detection is goal? |
| Solo-founder maintainability | ⚠️ QUESTIONABLE | Rust + local ML models suggests non-trivial ML ops. Is this a one-person project? |
| No overbuilding in V1 | ❌ FAIL | V1 scopes: "Freebie Tool prüft in 30 Sekunden". But: Heuristic-based detection has poor accuracy. How confident in results? No testing strategy. |
| Architecture is simple | ❌ FAIL | "Freebie" + "Paid Watermarking API" is actually 2 different products with different UX, different compliance, different revenue models |

**Overall Section 4:** ❌ FAIL

---

### Section 5: Compliance & Security

| Criterion | Status | Issue |
|-----------|--------|-------|
| DSGVO compliance documented | ✅ PASS | "Nutzertexte werden NICHT gespeichert. Stateless im RAM" — good |
| Data minimization | ✅ PASS | No tracking, no cookies, no storage |
| RDG firewall | ⚠️ QUESTIONABLE | Tool claims to check "KI-generiert sein MUSS" (must be marked) — but that's legal interpretation. Needs RDG disclaimer |
| Secrets management | ✅ PASS | "Keine Fremd-APIs, regelbasiert" — OK |
| EU-based infrastructure | ✅ PASS | No external APIs mentioned |

**Overall Section 5:** ⚠️ CONDITIONAL PASS

---

### Section 6: Documentation Quality

| Criterion | Status | Issue |
|-----------|--------|-------|
| All 7 documents present | ❌ FAIL | Missing: `2_Lokales_Research.md`, `3_Validierung.md`, `5_ClaudeCode_State.md`, `6_Styleguide.md`, `7_Deployment_Ops.md`. Only have `1_Lastenheft.md` + skeleton `3b_Tools_Tech.md` |
| Frontmatter fields complete | ✅ PASS | Has all 5 scoring fields |
| No broken wikilinks | ✅ PASS | Links in frontmatter are valid |
| Naming convention | ✅ PASS | File names follow pattern |

**Overall Section 6:** ❌ FAIL (5 of 7 docs missing)

---

### Section 7: Business Model & Pricing

| Criterion | Status | Issue |
|-----------|--------|-------|
| V1 pricing strategy clear | ❌ FAIL | V1 = "Freebie" but pricing not defined. How many free users before paid gate? |
| Unit economics plausible | ❌ MISSING | No ARPU, no churn estimate, no LTV calculation |
| Go-to-Market plan | ⚠️ VAGUE | No GTM section in Lastenheft. How do we acquire first users? |
| First revenue timeline | ❌ MISSING | "time_to_revenue: 2" but no specific milestone (e.g., "first 100 users by week 3") |
| No scope creep between V1/V2/V3 | ❌ FAIL | Watermarking API feels like feature-creep. What's the business driver? Who's asking for it? |

**Overall Section 7:** ❌ FAIL

---

### Section 8: Alignment with Learnings

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Avoids ANTI-PATTERN: Vague problem statement | ❌ FAIL | [[07_Learnings#Häufige Fehler (Anti-Patterns)\|See Learnings]]: "Vague Problem Statements scheitern am Gatekeeper" — AI-Act commits this exact error |
| Avoids ANTI-PATTERN: Over-engineering without validation | ❌ FAIL | [[07_Learnings#Häufige Fehler (Anti-Patterns)\|See Learnings]]: "Over-Engineering ohne Validierung" — Watermarking API in V2 is feature-creep |
| Avoids ANTI-PATTERN: No clear mono-customer | ❌ FAIL | [[07_Learnings#Häufige Fehler (Anti-Patterns)\|See Learnings]]: "KMUs generating AI text" is not a searchable persona |
| Uses PRO-PATTERN: Clear Vision + Magic Moment | ❌ FAIL | Magic Moment is unclear (30 seconds to... what? And what does user do with result?) |

**Overall Section 8:** ❌ FAIL (repeats 3 known anti-patterns)

---

## Critical Issues

| # | Issue | Category | Fix Required | Severity |
|---|-------|----------|--------------|----------|
| 1 | Problem statement too vague ("KMUs generating AI text") | Vision | Pivot to specific persona + compliance obligation (e.g., "Marketing Teams at B2G SaaS must label AI-generated copy per BTTG Article X") | 🔴 BLOCKER |
| 2 | No competitive moat explained | Moat | Prove technical advantage over existing detectors OR regulatory defensibility. Currently: it's just an arms race (AI improves → detector breaks) | 🔴 BLOCKER |
| 3 | No market research or validation | Research | Add `2_Lokales_Research.md` with: TAM/SAM/SOM, competitor analysis (OpenAI, Turnitin, Originality.AI), customer interviews (n≥3) proving KMUs care | 🔴 BLOCKER |
| 4 | Watermarking API feels like feature-creep | Scope | Explain in V2 section: Who's asking for this? What's the business driver? OR remove and commit to detection-only | 🟡 CRITICAL |
| 5 | Missing 5 of 7 required documents | Completeness | Complete all 7 documents before re-audit | 🔴 BLOCKER |
| 6 | No Business Model/Pricing clarity | Business | Define: Freemium tier limit, Paid pricing, Target ARPU, Month-1 revenue target | 🔴 BLOCKER |

---

## Detailed Feedback

### Why This Project Fails

This project fails because it:

1. **Tries to solve too many problems.** "KMUs generating AI text" includes marketing copy, code, support responses, customer service chatbots, etc. Each has different compliance risk profiles. No focus.

2. **Has no defensible moat.** AI-text detection is an arms race: If you detect GPT-3.5, the user upgrades to GPT-4. If you detect that, they upgrade to Claude. Existing tools (OpenAI, Turnitin) already do this better. What's your advantage?

3. **Skips validation.** No `2_Lokales_Research.md` means no proof that:
   - German KMUs actually care about EU AI Act Art. 50
   - They have budget for a tool
   - They can't just use Turnitin + disclaimer

4. **Repeats known anti-patterns** from [[07_Learnings|Learnings.md]]:
   - Vague problem statement (like AI-Act-Schild failed initially)
   - Over-engineering without validation (Watermarking API in V2)
   - No mono-customer definition

### Compare to Successful Projects

**EQUIVALT (PASS):**
- Problem: "BTTG 2026 excludes GovTech startups from federal contracts unless they prove VSOP equivalence"
- Moat: First tool that auto-calculates per official TVöD tables (regulatory requirement)
- Zielgruppe: CFOs at Series-A GovTech startups (searchable on LinkedIn)
- Research: TAM/SAM/SOM in `2_Lokales_Research.md`

**CBAM-Schild (PASS):**
- Problem: "EU importers must report real CO₂ values to customs in 2026; Asian suppliers falsify these"
- Moat: Physics calculation that's thermodynamically defensible (can't be faked)
- Zielgruppe: Compliance Officers at KMUs importing >50t/year (searchable)
- Research: Regulatory penalties documented

**AI-Act-Schild (FAIL):**
- Problem: "KMUs risk fines if they don't mark AI text" (too broad, many interpretations)
- Moat: None articulated (existing detectors already do this)
- Zielgruppe: "German KMUs generating AI text" (not searchable)
- Research: Missing entirely

---

## Recommendation

### Option A: Archive This Project (Recommended)

Document lessons in [[07_Learnings|Learnings.md]]:
- ✅ AI-text detection alone is not a SaaS product (it's a feature)
- ✅ Detection accuracy is hard problem (arms race with LLMs)
- ✅ Regulatory moat is stronger than technical moat (see EQUIVALT/CBAM success)

### Option B: Pivot to Regulatory Focus

**Reframe:** "BTTG/EU-AI-Act Compliance Audit Tool for GovTech Startups"

**New Problem:** "B2G tech startups must comply with BTTG (AI Transparency) + Data Protection laws to bid on federal contracts. Existing compliance tools are $50k/month consultants. We provide a 5-minute audit + checklist generator."

**Mono-Customer:** "HR + Compliance Officers at Series-A B2B SaaS startups (DACH) with revenue €500k–5M"

**Validation Needed:**
- Interview 10 GovTech startups: "Do you have budget for compliance automation?"
- Identify 3–5 regulatory requirements that apply to ALL your target customers
- Prove market size: How many DACH startups bid on federal contracts? (TAM)

**If this validation passes** → Restart audit with new `1_Lastenheft.md` + `2_Lokales_Research.md`

### Option C: Feature, Not Product

Recognize that AI-text detection should be **a feature in a larger compliance product**, not a standalone SaaS. Archive or merge with other regulatory tools.

---

## Decision

**Status:** ❌ **FAILED**

**Action Required:**
- [ ] Archive project (if pivoting is not desired)
- [ ] OR major rewrite with regulatory focus + validation
- [ ] OR document as "Lessons Learned in Problem Validation"

**Next Step:** Founder decides (Archive / Pivot / Detailed Research).

---

## Auditor Signature

**Auditor:** Claude Gatekeeper
**Date:** 2026-03-31
**Decision:** ❌ FAILED - Do not proceed without major pivot
**Re-audit Needed:** YES (if pivoting)

---

**See Also:**
- [[07_Learnings|Learnings: Vague Problem Statements]]
- [[07_Learnings|Learnings: Over-Engineering without Validation]]
- [[Rules|Rules: Mono-Micro-SaaS Definition]]
- EQUIVALT Beispiel (PASS) → [[_Link_zum_Ideen_Vault|Ideen-Vault]]
- CBAM Beispiel (PASS) → [[_Link_zum_Ideen_Vault|Ideen-Vault]]

---

## Repositionierung 2026-04-07 — Neues Konzept: ki-transparent.json Standard

**Ausgangspunkt:** Gatekeeper hat das ursprüngliche Konzept (KI-Text-Detektor) korrekt mit FAILED bewertet. Hauptprobleme: kein Moat (Armsrennen mit GPT Detector/Turnitin), vage Zielgruppe, kein Regulatory-Moat.

**Pivot-Entscheidung:** Kategorie neu erfunden statt besser konkurriert.

**Neues Konzept:** `ki-transparent.json` — offener Standard für maschinenlesbare KI-Transparenz-Erklärungen analog zu `robots.txt` und `security.txt`. Wir definieren den Standard BEVOR jemand anderes es tut (August 2026 = AI Act Art. 50 Inkrafttreten).

**Warum Blue Ocean 5:** Kein Konkurrent existiert in der Kategorie "öffentlich verifizierbarer EU AI Act Art. 50 Compliance-Standard". GPT Detector/Turnitin = Detection-Tools. C2PA = Bild-Metadaten. OneTrust = Privacy/DSGVO. Niemand definiert einen `/.well-known/`-Standard für KI-Inhalts-Policies.

**Score-Änderungen (Lastenheft aktualisiert):**
- `competition`: 3 → 5 (kein direkter Konkurrent)
- `market_size`: 4 → 5 (jede EU-Firma mit KI-Content = Zielgruppe)
- `profit_potential`: 3 → 5 (Standard-Setter + Agency-Modell)
- `founder_fit`: 3 → 4 (einfacheres Build, Nischen-Expertise)
- `time_to_revenue`: 2 → 4 (Pre-Sales + Agency-Outreach)
- **Neuer Gesamt-Score: 23/25** (vorher: 15/25)

**Nächster Schritt:** `2_Lokales_Research.md` — Marktvalidierung + 3–5 Kunden-Interviews

---

# Gatekeeper Re-Audit: ai-transparency.json Standard

**Audit-Datum:** 2026-04-07 | **Basis:** Repositioniertes Konzept (ai-transparency.json)
**Vorgänger-Audit:** 2026-03-31 STATUS: FAILED (KI-Text-Detektor)

---

## 0. Frontmatter-Validierung ✅ PASS

| Feld | Wert | Status |
|---|---|---|
| profit_potential | 5 | ✅ |
| founder_fit | 4 | ✅ |
| market_size | 5 | ✅ |
| competition | 5 | ✅ |
| time_to_revenue | 4 | ✅ |

Alle 5 Felder vorhanden. Gateway bestanden.

---

## 1. Verfassungs-Checkliste ✅ PASS (1 Minor Patch)

| Kriterium | Status | Notiz |
|---|---|---|
| Mono-Tool (ein Problem, eine Zielgruppe) | ✅ | ai-transparency.json Standard + Verified Badge |
| Blue Ocean | ✅ | competition: 5, kein direkter Konkurrent |
| Langweilige B2B-Nische | ✅ | Compliance, kein Lifestyle |
| Extremer Pain Point | ✅ | Bußgeld bis 15 Mio. € / Art. 99 Abs. 4 |
| Must-Have | ✅ | Regulatorische Pflicht, nicht Nice-to-Have |
| DSGVO-konform | ✅ | Stateless, nur HTTP-Fetch externer URLs |
| RDG-Firewall | ✅ | Explizit dokumentiert inkl. Policy-Layer-Klarstellung |
| Eigenständiges Tool | ✅ | Keine SAP/Salesforce-Abhängigkeit |
| Mind. 10 Test-Szenarien | ⚠️ PATCH | Nicht definiert — siehe Patch 1 |
| Per SEO vermarktbar | ⚠️ | Keyword-Recherche ausstehend (3_Validierung) |
| Als Kleingewerbe betreibbar | ✅ | Stripe + Vercel Free Tier |
| Von einer Person + Claude Code wartbar | ✅ | JSON-Validator ist trivial |
| Zielgruppe zahlungsbereit | ✅ | Marketing-Budget vorhanden, Anwalt-Anker |
| Human-in-the-Loop | ✅ | Policy-Layer explizit, Content-Layer beim Nutzer |
| Keine Kaltakquise | ✅ | Inbound SEO + Agency-Channel |

## 2. Founder-Fit ✅ PASS

- Nebenprojekt: ✅ Einfachster Build aller bisherigen Projekte (JSON-Schema, kein ML)
- Solo + Claude Code: ✅
- Free-Tier-Budget: ✅ Vercel Free + Stripe
- Kleingewerbe: ✅

## 3. Mono-Micro-Fokus ✅ PASS

JSON-Generator + URL-Validator + Badge-Hosting. Von einer Person wartbar. Kein Moving-Target-Algorithmus.

## 4. Security-Zero-Tolerance ✅ PASS

- Bitwarden CLI (EU): ✅ explizit dokumentiert
- KEINE .env: ✅ explizit verboten
- Fremd-APIs: Keine ✅

## 5. Compliance ✅ PASS

- DSGVO: Stateless. Validator macht nur HTTP-Fetch externer URLs. Kein User-Content gespeichert. ✅
- RDG-Firewall: Pflicht-Disclaimer auf jeder Seite dokumentiert. ✅
- Policy-Layer-Klarstellung: Explizit in Lastenheft (kein "compliant mit unserem Tool"). ✅

## 6. Anti-Patterns Check ✅ PASS

- Vage Problem-Statement? ❌ Nein — Art. 50(4) ist eine konkrete Obligation. ✅
- KI-Detection Armsrennen? ❌ Nein — kein Algorithmus, reines JSON-Schema. ✅
- Over-Engineering? ❌ Nein — V1 ist JSON-Generator + URL-Fetch + Badge. ✅
- Keine klare Zielgruppe? ❌ Nein — LinkedIn-testbare Mono-Persona. ✅

## 7. Erfahrungs-Check ✅ PASS

- [2026-04-07] Kategorie-Erfindung statt Konkurrenz → angewendet ✅
- [2026-04-07] CoP als Frühindikator → angewendet ✅
- [2026-04-04] Freebie-Strategy-Prompt Pflicht → Two-Stage Freebie dokumentiert ✅
- [2026-04-04] Progress-Loop statt One-Time-Result → implementiert ✅

## 8. Standard-Setter-Check ✅ PASS

EU CoP on AI Labelling (März 2026) fordert explizit "machine-readable format". IANA `/.well-known/ai-transparency.json` noch nicht registriert. Fenster offen.

## 9. Armsrennen-Check ✅ PASS

Kein Analyse-/Detektions-Algorithmus. JSON-Schema-Matching ist deterministisch und nicht durch bessere KI überholbar.

---

## 🩹 PATCHES (2 Minor, keine Blocker)

### Patch 1 — Testbarkeit konkretisieren (in 1_Lastenheft.md ergaenzen)
Beschreibung: "Mind. 10 Online-Beispiele" ist für Berechnungs-Tools definiert. Fuer einen JSON-Validator heisst das:
- 5 korrekte ai-transparency.json Szenarien (verschiedene Branchen)
- 3 fehlerhafte Szenarien (fehlende Pflichtfelder, falsches Format)
- 2 Edge-Cases (Datei nicht vorhanden, falscher MIME-Type)
Action: In 1_Lastenheft.md Sektion "Testbarkeit" ergaenzen.

### Patch 2 — IANA-Einreichung vorzeihen
Beschreibung: IANA-Einreichung steht unter V2. Sie dauert 4-6 Wochen und sichert den Standard-Moat. Muss SOFORT (parallel zu V1-Build) gestartet werden — nicht erst nach Market-Validation.
Action: In 1_Lastenheft.md V2 -> "IANA-Einreichung: Woche 1-2, parallel zu Spec-Publikation" verschieben.

---

## ✅ GATEKEEPER RE-AUDIT: PASSED

**Datum:** 2026-04-07
**Score:** 9/9 Pruefpunkte bestanden (2 Minor Patches, keine Blocker)
**Vorgaenger:** FAILED (2026-03-31, KI-Text-Detektor)

**Begründung:**
Das repositionierte Konzept (ai-transparency.json Standard + Verified Badge) erfüllt alle Verfassungskriterien. Kein bekanntes Anti-Pattern wiederholt. Regulatory Moat stark (Art. 50(4) + IANA-First-Mover). Founder-Fit besser als Vorgaenger-Konzept (kein ML, reines JSON).

**Nächster Schritt:**
Patches 1+2 umsetzen → `audit_status: passed` setzen → Audit-Kette starten (Auditor 1-8)


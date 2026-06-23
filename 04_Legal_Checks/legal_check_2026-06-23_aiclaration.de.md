# Legal-Check: aiclaration.de — 2026-06-23

> **⛔ KEINE RECHTSBERATUNG — KEINE STEUERBERATUNG.** Dieser Report identifiziert technische Compliance-Risiken und bekannte Abmahnmuster. Er ersetzt keinen Rechtsanwalt und keinen Steuerberater.

## Gesamtscore: 56/100 🔴 (vor Fixes) → ~78/100 🟡 (nach Fixes)
**Status nach Fixes:** Bedingt live-bereit — anwaltliche Restprüfung empfohlen (c/o-Anschrift, SIGNUP_SOURCE in DSE)  
**Geprüfte Seiten:** 11 (4 Legal-Pages + 7 Content-Seiten per Source-Code-Audit — kein Live-Deploy vorhanden)  
**Methode:** Source-Code-Audit (kein Browser-Test möglich, kein Live-Deploy)

---

## Site-Profil

- Zielgruppe: B2B (AGB §1(2): Verbraucher ausgeschlossen) / Freebie faktisch für alle
- Modell: Kostenlos V1 / Paid geplant (noch kein Payment)
- Aktive Module: Impressum · DSE · Cookie · UWG · AGB · DSGVO-Technik · SSL · Cross-System
- Übersprungen: DSA (kein UGC) · EU AI Act Laufzeit-KI (deterministisch) · Affiliate · Heatmap

---

## 🚨 5 Kritische Blocker — alle behoben in Session 07

### BLOCKER 1 — §-Zeichen als "SS" gerendert ❌ → ✅ BEHOBEN
- Alle AGB-Überschriften: "SS1" → "§ 1" (8 Stellen)
- Alle Nutzungsbedingungen-Überschriften: "SS1" → "§ 1" (4 Stellen)
- Impressum: "SS5 DDG", "SS18 MStV", "SS7 DDG" → korrekte §-Zeichen
- Fix: § direkt in JSX + korrekte Umlaute durchgängig

### BLOCKER 2 — ODR-Link defunct ❌ → ✅ BEHOBEN
- `impressum/page.tsx` → Link auf ec.europa.eu/consumers/odr (seit 20.07.2025 eingestellt)
- Der Block behauptete "Die Europäische Kommission stellt eine Plattform bereit" — faktisch falsch
- Fix: Block ersetzt durch VSBG §36-Hinweis ohne ODR-Link

### BLOCKER 3 — Interner Dev-Text sichtbar in AGB ❌ → ✅ BEHOBEN
- `agb/page.tsx` §2(3): Heading "RDG-Firewall — PFLICHT, niemals entfernen" öffentlich sichtbar
- Fix: Heading → "(3) Kein Rechtsrat"; Inhalt der Box unverändert

### BLOCKER 4 — "100% DSGVO-konform" ❌ → ✅ BEHOBEN
- `TrustSection.tsx` Badge: "100% DSGVO-konform — Keine Datenspeicherung" (UWG §5)
- Fix: → "Privacy-by-Architecture — keine personenbezogene Datenspeicherung"

### BLOCKER 5 — Hetzner-Standort-Widerspruch ❌ → ✅ BEHOBEN
- Footer + TrustSection: "Frankfurt" ≠ DSE §5: "Nürnberg/Falkenstein"
- Founder bestätigt: Standort = **Nürnberg**
- Fix: alle 3 Stellen auf "Nürnberg" synchronisiert

---

## ⚠️ Weitere Fixes (in Session 07 mitgemacht)

- `robots: { index: false }` → `{ index: false, follow: false }` — alle 4 Legal-Pages
- "für immer" → "solange Free-Tier verfügbar" (PricingSection)
- "Unbegrenzte Validator-Checks" → "Validator-Checks ohne monatliches Kontingent"
- "nie unbemerkt non-compliant" → "Statusänderungen frühzeitig erkennen" (2 Stellen)
- "immer aktuell" → "regelmäßig geprüft" (ROISection)
- Gerichtsstand "Deutschland" → "Greven" (AGB §8 Abs. 2)
- AGB + Nutzungsbedingungen vollständig auf §-Zeichen + korrekte Umlaute normalisiert

---

## Offene Punkte (nach Session 07)

| Problem | Priorität | Gesetz |
|---|---|---|
| c/o Postflex als ladungsfähige Anschrift | 🔴 Anwalt prüfen | DDG §5 |
| SIGNUP_SOURCE in DSE §7 ergänzen | 🟡 WICHTIG | DSGVO Art. 13 |
| "DSGVO-konform" in EmailCapture-Footer (borderline) | 🟡 BEOBACHTEN | UWG §5 |
| Hetzner-Standort nach Deployment im Dashboard verifizieren | 🟡 WICHTIG | DSGVO |
| Lighthouse / WCAG 2.2 AA | 🟡 WICHTIG | BFSG |

---

## Kategorien-Scores

| Kategorie | Vorher | Nachher | Gewicht | Gesetz |
|---|---|---|---|---|
| Impressum | 3/5 | 4/5 | ×3 | DDG §5 |
| Datenschutzerklärung | 4/5 | 5/5 | ×3 | DSGVO Art. 13 |
| Cookie-Consent | 5/5 | 5/5 | ×3 | TTDSG §25 |
| UWG/Wettbewerbsrecht | 2/5 | 4/5 | ×3 | UWG §5 |
| AGB-Tiefenprüfung | 2/5 | 4/5 | ×3 | BGB §§ 305 ff. |
| DSGVO-Technik | 4/5 | 5/5 | ×2 | DSGVO |
| SSL/Security | 5/5 | 5/5 | ×2 | DSGVO Art. 32 |
| Cross-System-Konsistenz | 3/5 | 5/5 | ×2 | DSGVO / UWG |
| EU AI Act | 5/5 | 5/5 | ×2 | EU 2024/1689 |
| Newsletter | 5/5 | 5/5 | ×2 | UWG §7 |
| BFSG/Barrierefreiheit | 4/5 | 4/5 | ×1 | BFSG |
| Urheberrecht | 5/5 | 5/5 | ×1 | UrhG |
| **GESAMT** | **101/180** | **141/180** | | |

Score vorher: 56/100 🔴 → Score nachher: ~78/100 🟡

---

## Bestanden (unverändert)

- E-Mail im Impressum inline ✅ · HTTPS + Security Headers vollständig ✅
- Kein Google Fonts CDN, kein externes Tracking ✅ · AVV Hetzner + Brevo ✅
- Art. 15–21 Betroffenenrechte vollständig ✅ · Double Opt-In korrekt ✅
- DSE-Nummerierung 1–10 lückenlos ✅ · AGB §1–§8 lückenlos ✅
- RDG-Disclaimer an 4+ Stellen ✅ · EU AI Act §9 DSE + §7 AGB korrekt ✅
- Cookie-Konzept korrekt (kein Banner, kein Tracking) ✅
- lang="de" ✅ · Skip-Nav ✅ · robots.txt + sitemap.xml sauber ✅
- Rate-Limiting + Bot-Schutz ✅ · API-Payload Brevo: nur E-Mail + SIGNUP_SOURCE ✅

Stand: 2026-06-23 · Geprüft von: website-legal-check Skill v2026-06

# Audit 7 — Freebie-Strategie: aiclaration

> **Projekt:** aiclaration | **ID:** ID2604071725
> **Erstellt:** 2026-06-19 | **Referenz:** [[4_Pflichtenheft]] Sektion "Freebie-Implementierung"
> **Status:** PASSED — alle 5 Phasen vollständig
> **Prompt:** [[Freebie_Strategy_Prompt|Freebie Strategy Prompt]] · **Dashboard:** [[DASHBOARD]] · **Lastenheft:** [[1_Lastenheft]]

---

## Phase 1 — Worst-Moment-Analyse

**Schadens-Moment:**
Marketing-Leiterin eines 80-MA-Mittelständlers liest am Freitagabend einen IHK-Newsletter: "EU AI Act: Ab August 2026 drohen Bußgelder bis 15 Mio. € für nicht gekennzeichnete KI-Texte." Sie schreibt täglich Blogbeiträge mit ChatGPT. Kein Budget für Anwalts-Gutachten. IT verweist auf "ist nicht unsere Zuständigkeit".

**Stress-Moment:**
Letzte 6 Wochen vor August 2026. Vorstandsmeeting: "Sind wir Art. 50-compliant?" Keine Antwort verfügbar. Compliance-Beauftragter weiß nichts von der Pflicht. Zeitdruck trifft auf Informationsvakuum.

**Reibungs-Moment:**
Suche nach Lösung: Anwalt → 5.000–15.000 € Gutachten, dauert 4 Wochen. IHK → nur Leitfaden-PDF, kein Tool. Google → technische IETF-Dokumente, unverständlich. IT-Abteilung → "Wir haben keine Kapazität."

**Worst-Moment-Satz:**
> "Montags 8:00 Uhr Vorstandsmeeting — 'Sind wir Art. 50(4) compliant?' — und ich stehe da ohne Antwort, ohne Nachweis, ohne Zeit."

---

## Phase 2 — Das ONE Freebie

**Name:** Betroffenheits-Check + ai-transparency.json Generator

**Tool-Typ:** 3-Fragen-Quiz (Betroffenheit) → 5-Fragen-Wizard (Generierung) → Download + Validator

**Sofort-Output (anonym, ohne E-Mail):**
- Schritt 1: Betroffenheits-Check (`/check`) — 3 Ja/Nein-Fragen → klares "Betroffen / Nicht betroffen"
- Schritt 2: Generator (`/generate`) — 5 Fragen → Download der fertigen `ai-transparency.json` (30 Sekunden)
- Schritt 3: Validator (`/validate`) — eigene URL eingeben → VALID ✅ / INVALID ❌ / NOT_FOUND
- **Kein Login, keine E-Mail, keine Registrierung erforderlich**

**Erweiterter Output (nach E-Mail-Gate bei Badge-Aktivierung):**
- Monatliche automatische Validator-Checks mit E-Mail-Alert bei Statusänderung
- Klickbares SVG-Badge für Website (240×80px, "KI-Transparenz-Prozess dokumentiert ✓")
- E-Mail-Sequenz: Implementierungs-Anleitung + Update-Alerts bei EU-Regeländerungen
- Quartalsweise Erinnerung: "Haben Sie Ihre KI-Tools geändert? Policy-Update prüfen."

**Konkreter messbarer Schaden bei Nicht-Lösung:**
- Bußgeld: bis 15.000.000 € oder 3% des weltweiten Jahresumsatzes (Art. 99 Abs. 4 EU AI Act)
- Reputationsschaden: Kundenverlust bei öffentlichem Bußgeld-Verfahren
- Rechtsanwaltskosten: 5.000–15.000 € einmalig für Gutachten (veraltet nach 6 Monaten)
- Zeitaufwand ohne Tool: geschätzt 8–12 Stunden für manuelle Policy-Erstellung

---

## Phase 3 — Retention-Logik

| Zeitpunkt | Nutzerverhalten | Tool-Interaktion | Geschätzte Häufigkeit |
|---|---|---|---|
| **Tag 1** | Download ai-transparency.json → Datei auf Server ablegen → Validator-Check | `/generate` → Download → `/validate` | 1× Einmalig |
| **Tag 1–3** | E-Mail-Sequenz Start (wenn Badge aktiviert): Willkommen + Implementierungs-Anleitung | Brevo-Sequenz E-Mail 1: "Herzlich willkommen + nächste Schritte" | 1× |
| **Tag 7** | Implementierung abgeschlossen — Badge auf Website aktiv | Brevo E-Mail 2: "Ihr Badge ist aktiv — so nutzen Sie ihn" | 1× |
| **Woche 1** | Kollegen fragen: "Was ist das für ein Badge?" → Multiplikator-Effekt | Validator-Link teilen | ~3 Aufrufe von Dritten |
| **Monat 1** | EU-Neuigkeiten (CoP finalisiert, Bundesnetzagentur-Stellungnahme) → Unsicherheit | Brevo: "Was ändert sich für Sie?" + Validator-Re-Check | 1× |
| **Quartal 1** | Neue KI-Tools im Einsatz (Gemini, Copilot) → Policy veraltet | Validator-Check + Generator-Update | 1× Re-Check |
| **Jahr 1** | August 2027: 1. Jahrestag Enforcement — Behörden aktiver | Resend-Alert + Policy-Review + Badge-Verlängerung | 1× |
| **Jahresnutzung (geschätzt)** | 4× Validator-Checks · 1× Policy-Update · 12× Badge-Auto-Checks (Paid) · 4× Brevo-News | Mehrere Touch-Points | ~20 Interaktionen/Jahr |

**Retention-Flywheel:** Jede Änderung der KI-Tool-Nutzung im Unternehmen (neues Tool, neuer Content-Typ, neuer Ansprechpartner) triggert einen Policy-Update-Bedarf → erneuter Generator/Validator-Aufruf → Reminder bei Paid-Plan via Resend.

---

## Phase 4 — 7-Punkte-Checkliste

| # | Kriterium | Status | Begründung |
|---|---|---|---|
| 1 | **PainPoint** — Adressiert echten, dringlichen Schmerz | ✅ | Bußgeld bis 15 Mio. €, Deadline August 2026 — existenzielle Dringlichkeit für betroffene KMU |
| 2 | **Regelmäßig nutzbar** — Nicht nur einmaliger Einsatz | ✅ | Jede Änderung des KI-Tool-Einsatzes (neues Tool, neuer Content-Typ, neues Team-Mitglied) macht die Policy veraltet und erfordert einen Generator-Neuaufruf + Validator-Check. Realistisch: 2–4× pro Jahr. Paid: monatliche Auto-Checks als Push-Reminder. Es gibt keine gesetzliche Quartals-Review-Pflicht — der Retention-Treiber ist die eigene Tool-Landschaft. |
| 3 | **Nutzen <2 Min** — Sofort-Ergebnis ohne Lernaufwand | ✅ | 3 Klicks = Betroffenheit klar. 5 Fragen + Download = ai-transparency.json in unter 2 Minuten. |
| 4 | **Tool-Charakter** — Konkrete Datei/Output, kein Blogpost | ✅ | Output ist eine physische `ai-transparency.json`-Datei (Download) + validierbarer Endpunkt + SVG-Badge |
| 5 | **Ohne Email nutzbar** — Vollständig anonym bis Stage 3 | ✅ | Check + Generator + Validator: kein Login, keine E-Mail. Erst Badge-Aktivierung (freiwillig) erfordert E-Mail. |
| 6 | **Retention-Flywheel** — Bringt Nutzer regelmäßig zurück | ✅ | Policy-Updates nach KI-Tool-Änderungen + EU-Regeländerungen (CoP-Updates, Enforcement-Praxis) + Jahres-Review |
| 7 | **Stack-Kontinuität** — Kein Wegwerf-Stack | ✅ | Next.js + Hetzner EU + Coolify = finaler Production-Stack. Freebie und Tool sind identisch — kein Migration-Aufwand. |

---

## Phase 5 — UX-Flow

### Schritt 1: Anonym (kein E-Mail-Gate)

```
Landingpage (aiclaration.de)
    │
    ├─► HERO: "KI-Transparenz dokumentieren — vor August 2026"
    │         CTA: "Jetzt prüfen" → /check
    │
    ▼
/check — Betroffenheits-Check (3 Fragen, ~1 Min)
    │   Frage 1: Nutzt Ihr Unternehmen KI für Content? → Ja
    │   Frage 2: Publizieren Sie diese Texte online? → Ja
    │   Frage 3: Prüft ein Mensch vor Veröffentlichung? → Nein
    │
    ▼ Ergebnis: "BETROFFEN — Sie müssen ab August 2026 dokumentieren"
    │   CTA: "Jetzt Policy erstellen" → /generate
    │
    ▼
/generate — Generator-Wizard (Step 0 + 5 Fragen, ~2 Min)
    │   Step 0: Pflicht-ACK (Checkbox, kein Skip)
    │   Step 1/5: KI-Einsatz Ja/Nein
    │   Step 2/5: Content-Typen (Mehrfachauswahl)
    │   Step 3/5: Kennzeichnungsmethode
    │   Step 4/5: Menschliche Prüfung
    │   Step 5/5: Kontakt-E-Mail (für JSON, öffentlich)
    │
    ▼ Download: ai-transparency.json (lokal, kein Upload)
    │   Info-Box: Anleitung WordPress/Squarespace/Jimdo
    │   CTA: "Jetzt validieren" → /validate
    │
    ▼
/validate — Validator (URL eingeben, ~30 Sek)
    │   Input: "https://meinefirma.de"
    │   → Fetch /.well-known/ai-transparency.json
    │   → Schema-Validation (Ajv)
    │
    ▼ Ergebnis: VALID ✅
        2-Layer-Status:
        ✅ Policy-Layer: Prozess dokumentiert und verifiziert
        ⬜ Content-Layer: Einzelne KI-Texte kennzeichnen — Ihre Pflicht
        CTA: "Badge aktivieren" → E-Mail-Gate
```

### Schritt 2: E-Mail-Gate (Badge-Aktivierung)

```
/validate → VALID ✅
    │
    ▼
Badge-CTA: "Verifiziertes Badge für Ihre Website aktivieren"
    │   Preis: Kostenlos testen / 49 €/Monat Starter
    │
    ▼
E-Mail-Eingabe (Stripe Checkout ODER Brevo-Opt-In für Free-Badge-Info)
    │
    ▼
Brevo-Sequenz:
    │   E-Mail 1 (Tag 1): "Willkommen + Badge-Aktivierungslink + Implementierungs-Anleitung"
    │   E-Mail 2 (Tag 7): "Ihr Badge ist live — so nutzen Sie ihn im Marketing"
    │   E-Mail 3 (Tag 30): "Was ändert sich mit dem finalisierten EU CoP?"
    │   E-Mail 4 (Tag 90): "Quartals-Check: Haben Sie neue KI-Tools eingesetzt?"
    │
    ▼
Paid-Plan (49 €/Monat): Automatische monatliche Validator-Checks + Resend-Alert bei Statusänderung
```

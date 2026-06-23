---
type: audit_prompt
id: AUDIT_LP_IMPL
title: Landingpage Implementation Audit (Phase 1a Gate)
version: 1.0
created: 2026-04-11
applies_to: alle Tool-Landing-Pages nach Phase 1a
trigger: Lokal laufende Landingpage + Freebie + /api/subscribe fertig gebaut
---

> **Einordnung:** Dieser Audit läuft **im Implementation-Vault** — nicht im Ideen-Vault.
> **Voraussetzung:** `npm run dev` läuft, Landingpage ist unter `localhost:3000` erreichbar.
> **Gate:** Erst nach PASS darf Phase 1b (Live-Deploy) starten.
> **Quelle:** [[4_Pflichtenheft|4_Pflichtenheft]] · [[6_Styleguide|6_Styleguide]]

---

# Landingpage Implementation Audit — Phase 1a Gate

**ROLLE:** Du bist ein unabhängiger Qualitätsprüfer. Deine Aufgabe ist es, die gebaute Landingpage gegen die Spezifikationen in `00_Specs/4_Pflichtenheft.md` und `00_Specs/6_Styleguide.md` zu prüfen. Du weichst nicht ab, du schönredest nicht, du gibst kein PASS wenn etwas fehlt.

**VORBEDINGUNG:**

Prüfe vor dem Start:
1. Ist `npm run dev` gestartet und `localhost:3000` erreichbar?
2. Existiert `00_Specs/4_Pflichtenheft.md`?
3. Existiert `00_Specs/6_Styleguide.md`?

Falls nicht → **ABBRUCH**: Starte `npm run dev` und stelle sicher dass alle Spec-Dateien vorhanden sind.

---

## Prüfkatalog

Gehe jeden Punkt durch. Markiere mit ✅ PASS oder ❌ FAIL + Befund.

---

### A — Platzhalter & Copy (Non-Negotiable)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| A1 | Keine `[PLATZHALTER]` mehr im sichtbaren UI | Browser: Seite komplett durchscrollen, DevTools → Ctrl+F → `[` |
| A2 | H1 enthält das Haupt-Keyword aus `2_Lokales_Research.md` | Vergleiche H1-Text mit Keyword-Cluster in Research |
| A3 | Subline beschreibt den Magic Moment konkret (Zeit + Ergebnis) | Enthält Zeitangabe + konkretes Output-Versprechen |
| A4 | CTA-Button-Text ist aktiv formuliert (kein "Weiter", kein "OK") | z.B. "Jetzt kostenlos testen", "Quick-Check starten" |
| A5 | FAQ-Sektion: mind. 4 Einträge vorhanden | Zählen |
| A6 | ROI-Kalkulation / Wert-Sektion vorhanden | Scrolltest |

---

### B — Footer & Legal (Blocking)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| B1 | Copyright-Zeile: `© [JAHR] [FOUNDER_NAME] · [TOOL_NAME]` | Footer inspizieren — kein `[TOOL_NAME]` als alleiniger Rechteinhaber |
| B2 | Footer-Links: Impressum · Datenschutz · AGB vorhanden und verlinkt | Alle 3 Links klicken — keine 404 |
| B3 | RDG-Disclaimer vollständig sichtbar im Footer (kein Collapsed/Toggle) | Immer sichtbar, nicht hinter Accordion |
| B4 | RDG-Text enthält: kein Rechtsgutachten + finale Bewertung beim Nutzer | Wortlaut prüfen gegen `00_Specs/4_Pflichtenheft.md` → RDG-Disclaimer |
| B5 | "Ein Tool von [FOUNDER_NAME] · [MASTER_DOMAIN]" vorhanden | Footer-Text |
| B6 | KI-Hinweis vorhanden falls Tool KI-Features nutzt (EU AI Act Art. 50) | Nur wenn LLM zur Laufzeit aktiv ist |

---

### C — Freebie-Funktionalität (Blocking)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| C1 | Stufe 1 (anonym): Eingabe möglich ohne E-Mail | Formular ausfüllen, kein E-Mail-Feld erforderlich für Teilergebnis |
| C2 | Stufe 1: Teilergebnis wird sofort angezeigt (nicht erst nach E-Mail) | Output sichtbar nach Submit |
| C3 | Stufe 2 (E-Mail-Gate): Vollständiges Ergebnis erst nach E-Mail-Eingabe | Vollbild/PDF/Dashboard erscheint erst nach E-Mail |
| C4 | Teilergebnis enthält den "Magic Moment" aus `4_Pflichtenheft.md` | Vergleiche Output-Beispiel in Spec |
| C5 | Kein Upload von persönlichen/sensiblen Dateien als Freebie-Mechanik | Kein Datei-Upload-Button im Hauptflow |
| C6 | Testfall aus `4_Pflichtenheft.md` → Validierungskriterien liefert erwartetes Ergebnis | Testfall manuell durchführen, Ergebnis vergleichen |

---

### D — Email Capture / API (Blocking)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| D1 | POST /api/subscribe: 201 bei gültiger E-Mail | `curl -X POST localhost:3000/api/subscribe -H "Content-Type: application/json" -d '{"email":"test@test.de","source":"tool_result"}'` |
| D2 | POST /api/subscribe: 422 bei ungültigem E-Mail-Format | `curl` mit `"email":"kein-email"` |
| D3 | POST /api/subscribe: 409 bei Doppel-Registrierung | Gleiche E-Mail zweimal senden |
| D4 | Consent-Text beim CTA-Button sichtbar ("Mit Klick akzeptieren Sie...") | Text unter E-Mail-Feld |
| D5 | AGB- und Datenschutz-Link im Consent-Text vorhanden | Links klicken |
| D6 | Abmelde-Hinweis vorhanden ("Abmeldung jederzeit möglich") | Im Consent-Text oder Subline |

---

### E — Design & Brand (Wichtig)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| E1 | Primärfarbe aus `6_Styleguide.md` korrekt verwendet | DevTools → Computed Style auf CTA-Button vs. Styleguide-Token |
| E2 | Schriftart aus `6_Styleguide.md` geladen (kein Fallback-Font sichtbar) | DevTools → Fonts |
| E3 | Logo / Tool-Name in Navigation vorhanden | Scrollto top |
| E4 | Navigation enthält: Tool-Name + FAQ | Keine Unter-Seiten die noch nicht existieren verlinkt |
| E5 | Hero-Badge vorhanden (Regulierung + Deadline) | Über der H1 |

---

### F — WCAG 2.2 AA (Blocking)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| F1 | Kontrast Text/Hintergrund ≥ 4.5:1 für Fließtext | Chrome DevTools → Accessibility → Contrast |
| F2 | Kontrast CTA-Button ≥ 4.5:1 (Text auf Button-Farbe) | DevTools oder [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/) |
| F3 | Focus-Ring bei Tab-Navigation sichtbar (kein `outline: none` ohne Ersatz) | Tab durch die Seite drücken |
| F4 | Alle `<img>` haben `alt`-Attribut (auch dekorative mit `alt=""`) | DevTools → Elements → img tags |
| F5 | Kein horizontaler Scroll bei 375px Viewport | DevTools → 375px → horizontaler Scroll? |
| F6 | Touch-Targets ≥ 44×44px für alle Buttons/Links | DevTools → 375px → visuell prüfen |

---

### G — Performance & Buildqualität (Wichtig)

| # | Prüfpunkt | Wie prüfen |
|---|-----------|------------|
| G1 | `npm run build` fehlerfrei (Exit 0, keine TypeScript-Fehler) | Terminal: `npm run build` |
| G2 | `npm run lint` fehlerfrei (keine ESLint-Fehler) | Terminal: `npm run lint` |
| G3 | Keine Console-Errors im Browser bei Pageload | DevTools → Console → Seite neu laden |
| G4 | Keine Console-Warnings für fehlende Keys / undefined Props | Console auf Warnings prüfen |
| G5 | LCP < 2.5s (lokal) | Chrome DevTools → Lighthouse → Performance |

---

## Auswertung

Zähle nach Prüfung:

| Kategorie | Blocking? | Ergebnis |
|-----------|-----------|----------|
| A — Copy | Nein | _/6 |
| B — Footer & Legal | **JA** | _/6 |
| C — Freebie | **JA** | _/6 |
| D — Email Capture | **JA** | _/6 |
| E — Design & Brand | Nein | _/5 |
| F — WCAG | **JA** | _/6 |
| G — Performance | Nein | _/5 |
| **Gesamt** | | _/40 |

---

## Verdict

### ✅ PASS — Phase 1b kann starten
- Alle Blocking-Kategorien (B, C, D, F): 100% ✅
- Nicht-Blocking: ≥ 80% ✅ (≥ 13/16)

### 🟡 CONDITIONAL — Fixes nötig, dann erneut prüfen
- Alle Blocking-Kategorien bestanden, aber
- Nicht-Blocking: < 80% (< 13/16)
- Benenne konkret welche Punkte gefixed werden müssen.

### ❌ FAIL — Phase 1b gesperrt
- Mindestens 1 Blocking-Kategorie hat einen FAIL
- Phase 1b (Live-Deploy) darf nicht starten bis alle Blocking-Punkte behoben sind

---

## Output-Format

```markdown
## Landingpage Audit — [TOOL_NAME] · [DATUM]

### Ergebnis: [✅ PASS / 🟡 CONDITIONAL / ❌ FAIL]

### Blocking-Status
- B (Footer & Legal): [✅ 6/6 / ❌ X/6 — Befund]
- C (Freebie):        [✅ 6/6 / ❌ X/6 — Befund]
- D (Email Capture):  [✅ 6/6 / ❌ X/6 — Befund]
- F (WCAG):           [✅ 6/6 / ❌ X/6 — Befund]

### FAILs (nur relevante)
#### [Kürzel + Nummer] — [Prüfpunkt]
- **Befund:** [Was genau fehlt oder falsch ist]
- **Fix:** [Konkrete Maßnahme — Datei, Zeile, was zu ändern ist]

### Gesamt: [X]/40 · Blocking: [alle ✅ / X FAILs]
```

---

> **Nach PASS:** Eintrag in `VAULT_LOG.md`:
> `## [YYYY-MM-DD] audit | [Tool-Name] — Landingpage Phase 1a PASSED ([X]/40)`
>
> **Nach FAIL:** Phase 1b ist gesperrt. Fixes umsetzen, Audit erneut ausführen.

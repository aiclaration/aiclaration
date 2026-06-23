# 2. Lokales Research – KI-Transparenz-Standard (ki-transparent.json)

> **Stand:** 2026-04-07 | **Aktualisiert:** 2026-06-19 (Wettbewerbs-Scan nachgerüstet + CoP-Finalisierung)
> **Quellen:** artificialintelligenceact.eu, destatis.de, digital-strategy.ec.europa.eu, iptc.org, eprivacy.eu, iana.org, haufe.de, legalnodes.com, jonesday.com, twobirds.com, kirkland.com, kennedyslaw.com, omr.com, iab.com
> **Kontext:** Basierend auf [[1_Lastenheft]] – Offener Standard + Verified Badge für EU AI Act Art. 50(4) Compliance. Repositionierung von KI-Text-Detektor zu Infrastruktur-Standard.
> **Basis:** [[1_Lastenheft|← 1_Lastenheft]] · **Weiter:** [[3_Validierung|3_Validierung →]]

---

## Wettbewerbs-Scan (Stand: 2026-06-19)

### Durchgeführte Suchen
- [x] `"EU AI Act Code of Practice AI Labelling" finalized 2026` → CoP am 10.06.2026 finalisiert (IPTC, enterprise-dna, EC Digital Strategy)
- [x] `"AI Kennzeichnung" Software Tool Deutschland Anbieter 2026` → IHK-Leitfäden, Wettbewerbszentrale-Leitfaden — kein kommerzielles Self-Service-Tool gefunden
- [x] `"AI transparency declaration" Tool SaaS DACH Vergleich` → Aporia, Reco, OneTrust — alle ohne Art. 50-Spezifik
- [x] `"AI Kennzeichnung" Anbieter Preis Vergleich 2026` → Capterra-Listings ohne Art. 50-Tool; keine spezifischen Anbieter
- [x] `"ai-transparency.json" OR "well-known ai transparency" standard 2026` → kein /.well-known/-Standard gefunden; ATS Framework (ähnlicher Ansatz, aber kein Konkurrent — siehe Kat. C)

### Kategorie A: Branchenverbands-Tools
- **IHK Köln** — ihk.de/koeln — Informationsseite KI-Verordnung — kostenlos — kein Self-Service-Tool, nur Leitfaden
- **Wettbewerbszentrale** — wettbewerbszentrale.de — Leitfaden "Kennzeichnung KI-generierter Inhalte" (Feb 2026, PDF) — kein Tool
- **Kein Verband** bietet ein technisches Art. 50 Compliance-Tool an (Stand: Juni 2026)

### Kategorie B: Integrierte Branchen-ERP/SaaS (mit KI-Kennzeichnungs-Modul)
- Keine ERP/SaaS-Lösung mit Art. 50 Modul identifiziert (Stand: Juni 2026)
- Aleph Alpha, Langdock — DSGVO-konforme KI-Plattformen, kein Kennzeichnungs-Nachweis-Feature

### Kategorie C: Spezialisierte Self-Service-Tools
- **IAB AI Transparency and Disclosure Framework** — iab.com — Branchenstandard Werbebranche (Jan 2026) — kein /.well-known/-Standard, kein EU Art. 50 Bezug, kein DACH-Fokus — **kein direkter Konkurrent**
- **ATS Framework v1.0** (Authorship Transparency Statement) — GitHub/Zenodo — JSON-Schema für Content-Authorship-Angaben — kein /.well-known/-Pfad, kein Art. 50 Compliance-Nachweis, kein Tool (nur Spec, kein Badge) — **konzeptionell ähnlich, kein Konkurrent**
- **Aporia** — AI Risk Assessment für Enterprise — kein Art. 50 spezifisch — mehrere Tausend €/Jahr
- **Reco** — AI Governance für SaaS-Umgebungen — kein Art. 50 Compliance-Tool

### Kategorie D: Beratungs-/Service-Angebote
- **Rechtsanwälte** (ki-kanzlei.de, lausen.com, Jones Day, Kennedy's Law): Leitfäden + Gutachten, 5.000–15.000€ einmalig, veraltet nach 6 Monaten
- **OneTrust AI Governance** — mehrere Tausend €/Jahr, kein Art. 50(4) spezifisch (Fokus: DSGVO/Privacy)
- **TrustArc** — ähnlich OneTrust, kein Art. 50

### Fazit-Satz
> Der Markt ist **leer** für das spezifische Use Case: maschinenlesbares `/.well-known/ai-transparency.json` als Self-Service Art. 50(4) Compliance-Nachweis für KMU. Marktführer: **keiner**. Realistische Lücke: DACH-KMU mit Online-Präsenz und KI-Text-Output, die Art. 50 Compliance per maschinenlesbarem Standard nachweisen wollen — ab 49€/Monat, 10–50× günstiger als jede Alternative.

---

## Executive Summary (2026-Perspektive)

Ab **2. August 2026** ist EU AI Act Art. 50 vollständig anwendbar. Für Unternehmen die KI-Text publizieren bedeutet das: Kennzeichnungspflicht — oder Bußgeld bis 15 Mio. € / 3% Weltumsatz.

Die EU-Kommission hat selbst erkannt, dass Unternehmen **technische Umsetzungshilfe** brauchen: Sie veröffentlichte im Januar 2026 einen Draft Code of Practice (CoP) on AI Labelling and Transparency, zweite Version März 2026, Finalisierung für Juni 2026 geplant. Der CoP ist **freiwillig** — aber wer ihn unterzeichnet, muss technisch nachweisen wie er Compliance umsetzt.

**Entscheidender Marktmoment:** Der CoP schafft Nachfrage nach einem standardisierten technischen Nachweis-Mechanismus. `ki-transparent.json` ist genau dieser Mechanismus — einfach wie robots.txt, öffentlich überprüfbar, maschinenlesbar. Wir kommen 4 Monate vor dem Enforcement-Datum.

Was sich 2023–2026 verändert hat:
- 2023: AI Act verhandelt, Art. 50 noch vage
- 2024: AI Act in Kraft, konkrete Bußgeldrahmen festgeschrieben
- 2025: KI-Nutzung in deutschen Unternehmen von 12% auf 20% gestiegen (+8 Prozentpunkte)
- Jan/Mär 2026: EU CoP Drafts publiziert → Unternehmen realisieren: sie brauchen einen Nachweis

---

## Historische & Evolutionäre Einordnung

**Ursprung des Konzepts:**
Das `/.well-known/`-Verzeichnis wurde 2010 durch RFC 5785 (IETF) standardisiert. Es ermöglicht Webservern, standardisierte Metadaten an einem vorhersehbaren Pfad bereitzustellen. Bekannte Implementierungen: `/.well-known/acme-challenge/` (Let's Encrypt), `/.well-known/security.txt` (koordinierte Sicherheitsmeldungen), `/.well-known/openid-configuration` (OIDC). Das IANA-Registry wurde zuletzt am 2026-03-19 aktualisiert — das System ist aktiv.

**3 Schlüsselereignisse:**
1. **2018 – DSGVO in Kraft:** Compliance-Siegel-Markt entsteht. ePrivacy, TrustArc und Co. zeigen: Unternehmen zahlen für vertrauenswürdige Compliance-Signale.
2. **August 2024 – EU AI Act in Kraft:** Art. 50 festgeschrieben. 24-monatige Übergangsfrist = Enforcement ab August 2026.
3. **Januar/März 2026 – EU CoP Drafts:** Kommission veröffentlicht zwei Entwürfe. Das Dokument verlangt explizit "machine-readable format" für AI-Content-Markierung → technischer Standard-Bedarf ist offiziell dokumentiert.

---

## PESTEL+ Analyse

### Politisch
- AI Act ist EU-Recht, gilt direkt in allen 27 Mitgliedsstaaten ohne nationale Umsetzungsgesetze
- Enforcement in Deutschland: wahrscheinlich Bundesnetzagentur oder neue KI-Aufsichtsbehörde (noch nicht final bestimmt, Stand April 2026)
- CoP-Unterzeichner erhalten Compliance-Vermutung — erheblicher Anreiz zur freiwilligen Teilnahme
- Deutsche Behörden (BSI, BNetzA) haben Tradition darin, technische Standards zu adoptieren/empfehlen

### Ökonomisch
- **Wer verdient:** Compliance-Dienstleister, Rechtsanwälte (5.000–15.000€/Gutachten), technische Zertifizierer, SaaS-Anbieter für AI-Compliance-Dokumentation
- **Wer verliert:** Unternehmen ohne Compliance (Bußgelder). Consultants die manuelle Prozesse verkaufen (verdrängt durch Automatisierung).
- **Marktgröße:** 20% von 2,6 Mio. deutschen Unternehmen = 520.000 KI-nutzende Firmen (Destatis 2024). Davon geschätzt 300.000+ mit Online-Präsenz die KI-Text publizieren. EU-weit: mehrere Millionen.
- **Zahlungsbereitschaft:** ePrivacy-Siegel kostet mehrere Tausend Euro/Jahr. Unser Modell ab 49€/Monat ist 10–50x günstiger bei vergleichbarer Funktion.

### Sozial
- KI-generierte Inhalte untergraben Vertrauen wenn nicht gekennzeichnet — gesellschaftlicher Druck für Transparenz wächst
- Labelling wird Wettbewerbsvorteil: Unternehmen die freiwillig transparent sind, gewinnen Kundenzutrauen
- "Badge Psychology": Sichtbare Compliance-Signale auf Websites erhöhen Vertrauen (analoge Wirkung zu SSL-Schloss, Gütesiegeln)

### Technologisch
- Art. 50 Abs. 1 verlangt explizit "machine-readable format" für KI-Content-Markierungen
- C2PA (Content Authenticity Initiative) addressiert Bild/Video-Metadaten — kein Web-Policy-Standard
- `ai.txt` und `llms.txt` sind 2026 noch nicht IANA-registriert — das Fenster für `ki-transparent.json` steht offen
- IANA Well-Known URI Registry: offen für Einreichungen, Designated Expert Review genügt, keine kostenpflichtige Behörde

### Environmental
- Minimalinvasive Lösung: Eine JSON-Datei pro Domain, keine server-intensive Verarbeitung
- Stateless Validator = minimaler Energieverbrauch
- Verglichen mit ML-basierten Detektoren: vernachlässigbarer CO₂-Abdruck

### Legal (Kernpunkt)
**Art. 50(4) EU AI Act — vereinfacht:**
Betreiber von KI-Systemen, die Texte generieren, die der Information der Öffentlichkeit über Angelegenheiten von öffentlichem Interesse dienen, müssen sicherstellen, dass die Ausgaben als künstlich erzeugt oder manipuliert gekennzeichnet sind. **Ausnahme:** wenn die Ausgaben einer menschlichen Überprüfung unterzogen wurden und eine natürliche Person die redaktionelle Verantwortung trägt.

**Bußgeldrahmen (Art. 99 Abs. 4):** bis zu 15.000.000 € oder bis zu 3% des weltweiten Jahresumsatzes — je nachdem welcher Betrag höher ist. Für KMU: reduzierte Schwellen, aber keine Ausnahme von der Pflicht.

**Code of Practice:** ✅ **Finalisiert am 10. Juni 2026** (EU AI Office, Quelle: IPTC). Titel: "Code of Practice on Transparency of AI-Generated Content". Freiwillig, aber Unterzeichner erhalten Compliance-Vermutung (starker Anreiz). Der CoP empfiehlt explizit: digitally-signed Metadaten, Wasserzeichen, optional Fingerprinting/Logging. `ki-transparent.json` ist kompatibel als maschinenlesbarer Implementierungs-Mechanismus. **Update-Relevanz:** Der finalisierte CoP erhöht den Umsetzungsdruck ab sofort — Unternehmen haben keine "warten bis CoP fertig ist"-Ausrede mehr.

**RDG-Hinweis:** Wir bieten keine Rechtsberatung. Unser Tool ist technische Selbstauskunft.

### Psychologisch
- "Compliance-Angst": Unternehmen fürchten Bußgelder, wollen aber keine aufwändigen Prozesse → Nachfrage nach einfachen, günstigen Lösungen ist hoch
- "First Mover Shame": Unternehmen die als erste compliant sind, kommunizieren das aktiv → Wettbewerbsdruck auf andere → Adoption-Kaskade
- Anker-Effekt: Anwaltskosten (5.000 €) als Referenzpreis machen 49 €/Monat extrem attraktiv

---

## First Principles & Mechanik

**Fundamentale Wahrheiten:**
1. Regulatoren können nicht alle Websites manuell prüfen → sie brauchen maschinenlesbare Signale
2. Unternehmen wollen Compliance mit minimalem Aufwand beweisen → einfachste Lösung gewinnt
3. Wer einen Standard definiert und deployed, hat strukturellen Vorteil gegenüber Nachahmern
4. Vertrauen entsteht durch Sichtbarkeit + Überprüfbarkeit, nicht durch Selbstaussage allein

**Technische Mechanik:**
- RFC 8615 (Update zu RFC 5785): Definiert `/.well-known/` als Standard-Pfad für Metadaten auf Webservern
- JSON: maschinenlesbar, von Regulatoren und Suchmaschinen parsebar, für jeden Webmaster verständlich
- Validator: HTTP GET auf `https://[domain]/.well-known/ki-transparent.json` → JSON-Schema-Validierung (serverless Edge Function, kein ML)
- Badge: SVG-Embed mit Link zu Verification-Page auf ki-transparent.de/v/[slug]
- SHA-256 Timestamp: Kryptografische Unveränderlichkeit des Compliance-Nachweises für Audit-Zwecke

---

## Anatomie der Schmerzen

**Silent Suffering:** Compliance-Verantwortliche in KMUs wissen dass der AI Act kommt, wissen nicht wie sie nachweisen dass sie konform sind. Sie "hoffen dass der Anwalt recht hat" oder ignorieren das Problem bis Enforcement beginnt.

**Systemische Reibung:** Der offizielle Code of Practice ist 40+ Seiten, formuliert für Großunternehmen und Rechtsexperten. Ein KMU mit 5-köpfigem Marketingteam kann daraus keine umsetzbare Handlung ableiten.

**Workaround-Indikator:** Unternehmen setzen aktuell auf:
- Manuelle Disclaimer in Einzelartikeln ("Dieser Text wurde mit KI erstellt") — nicht maschinenlesbar, inkonsistent
- Datenschutzerklärung-Ergänzungen — nicht spezifisch, nicht überprüfbar
- Rechtsanwalt-Gutachten — teuer, veraltet nach 6 Monaten, statisch
- Nichtstun und hoffen — die verbreitetste "Strategie"

→ Alle Workarounds sind teuer, manuell, nicht maschinenlesbar oder riskant. `ki-transparent.json` löst alle vier Probleme gleichzeitig.

---

## Risikoprofil

**Missbrauchspotenzial ("Compliance-Washing"):** Unternehmen könnten `ki-transparent.json` befüllen ohne wirklich compliant zu sein. Mitigation: Wir verifizieren technische Implementierung + Vollständigkeit, nicht Wahrheitsgehalt (das ist Anwalts-/Behörden-Aufgabe). RDG-Firewall schützt.

**Kompetenz-Falle:** Zu einfache Tools verführen dazu, echte Compliance-Analyse zu überspringen. Mitigation: Explizite Empfehlung "Vor Nutzung: Rechtsanwalt konsultieren" auf jeder Seite.

**Schwarzer Schwan — BSI/Google übernimmt:** Wenn eine mächtigere Institution einen konkurrierenden Standard publiziert, könnten wir verdrängt werden. Wahrscheinlichkeit: gering (Regulierungsprozesse dauern Jahre), zeitlicher Puffer: mindestens 3–5 Jahre. IANA-Registrierung als defensiver Schachzug.

**Rechtliches Risiko:** Wettbewerber oder Behörden könnten argumentieren wir behaupten Compliance-Nachweis zu erbringen. Mitigation: Klare RDG-Firewall, "technische Selbstauskunft", kein "rechtssicherer Nachweis" in Kommunikation.

---

## Steelmanning: Die Polaritäten

**Stärkstes Argument DAFÜR:**
Der Markt braucht zwingend einfache, standardisierte, maschinenlesbare Compliance-Signale für AI Act Art. 50. Die EU-Kommission hat das mit dem Code of Practice bestätigt. Wir liefern die technische Infrastruktur die der CoP beschreibt — zu einem Bruchteil der Anwaltskosten, innerhalb von 5 Minuten. Wer den Standard zuerst definiert und deployed, wird De-facto-Referenz. ePrivacy hat bewiesen: der Compliance-Siegel-Markt ist real und zahlungsbereit.

**Stärkstes Argument DAGEGEN:**
Art. 50(4) hat eine weit gefasste Ausnahme für "menschliche redaktionelle Kontrolle" — viele Unternehmen könnten argumentieren sie sind gar nicht betroffen. Wenn Behörden diese Ausnahme großzügig auslegen, schrumpft der adressierbare Markt erheblich. Außerdem: Wer bestimmt ob `ki-transparent.json` als "Nachweis" gilt? Ohne behördliche Anerkennung bleibt es zunächst ein Marketing-Signal.

**Der Schwarze Schwan:**
Google oder BSI publizieren eigenen Standard für KI-Transparenz auf Websites, der sofort breite Adoption erzwingt → unser Standard wird von einer mächtigeren Institution verdrängt.

---

## Second & Third Order Effects

**In 5 Jahren (2031):**
- `ki-transparent.json` ist EU-weit adoptiert (wenn erfolgreich) → SEO-Signal für Suchmaschinen ("transparente KI-Nutzung")
- Regulatoren nutzen öffentliche Validator-Tools um Websites automatisch zu prüfen → unser Standard wird zur Enforcement-Infrastruktur
- Neue Compliance-Kategorien (AI Act Art. 13 für High-Risk) verlangen ähnliche Standards → Expansion unseres Portfolios

**In 10 Jahren (2036):**
- Entweder: `ki-transparent.json` ist wie robots.txt — universell, selbstverständlich
- Oder: Standard wurde von W3C/IANA formalisiert, von Browsern nativ unterstützt → massiver Exit-Wert als Acquisition-Target

**Einfluss auf Arbeitsmarkt:**
- Compliance-Anwälte für AI Act werden nachgefragter und teurer → unser Tool als günstige Ergänzung
- Neue Rolle "AI Compliance Manager" in größeren Unternehmen → Enterprise-Kunden für Pro-Plan

---

## Buyer Persona & Journey

### Primäre Persona: "Sarah, 38 — Online-Marketing-Leiterin Mittelstand"
- **Unternehmen:** 100–300 MA, B2B oder B2C mit Content-Marketing, Umsatz 10–50 Mio. €
- **Tools:** ChatGPT Plus, Copilot, Claude — täglich für Content
- **Pain:** Legal-Abteilung hat gefragt wie Compliance nachgewiesen wird. Keine Antwort.
- **Budget:** Kann 50–200 €/Monat ohne Procurement genehmigen
- **LinkedIn-suchbar:** "Online Marketing Manager" + "Deutschland" = 50.000+ Profile

**Journey:**
1. **Awareness:** t3n/Heise-Artikel "AI Act gilt ab August" oder Anwalt-Rechnung
2. **Consideration:** Google "AI Act Art. 50 Kennzeichnung wie" → findet ki-transparent.de
3. **Freebie:** "Bin ich betroffen?" Check → Generator → JSON-Download
4. **Decision:** "Jetzt verifizieren + Badge aktivieren" → Stripe-Checkout
5. **Retention:** Monatliche Prüfungs-Email, Policy-Änderungs-Alert

**Einwände & Antworten:**
- "Reicht das als Nachweis?" → "Technische Selbstauskunft — der erste Schritt. Anwalt für rechtliche Bewertung."
- "Kann ich das nicht selbst machen?" → "Ja, Spec ist open source — aber wer verifiziert + hosted + alertet?"
- "Brauche ich nicht erst einen Anwalt?" → "Empfohlen. Aber Anwalt braucht trotzdem eine technische Lösung."

### Sekundäre Persona: "Thomas, 45 — Geschäftsführer Webagentur (12 MA)"
- Betreut 40 Kunden-Websites, muss ALLEN AI Act-Konformität anbieten
- Agency-Plan (299 €/Monat) = 50 Domains, White-Label-Badge, Reseller-Margin
- Stellt Kunden 20 €/Monat in Rechnung → persönliche Marge 501 €/Monat netto
- Kaufentscheidung: rational, preisbewusst, entscheidet ohne lange Ausschreibung

---

## Synthese & Handlungsableitung

**Finale Marktbewertung:** Der Markt ist real, der Timing-Vorteil ist kritisch, der Regulierungsdruck ist dokumentiert. Die EU-Kommission hat mit dem Code of Practice bestätigt: Unternehmen brauchen technische Implementierungshilfe für Art. 50. Wir sind diese Implementierungshilfe.

**TAM/SAM/SOM:**
- TAM (Deutschland): ~300.000 Unternehmen × 49 €/Monat = 176 Mio. €/Jahr
- SAM (DACH, frühe Adopter in 2 Jahren): 30.000 × 49 € = 17,6 Mio. €/Jahr
- SOM (Jahr 1, realistisch): 500 Kunden × 70 € Ø-ARPU = 35.000 €/MRR = 420.000 €/Jahr

**3 konkrete Handlungsempfehlungen:**

1. **Jetzt Standard definieren (Woche 1–2):** `ki-transparent.json` Spezifikation publizieren, GitHub-Repo öffnen, ki-transparent.de registrieren. IANA-Einreichung vorbereiten (4–6 Wochen, kostenlos). Vor dem Enforcement-Datum sein = unwiederholbarer Timing-Vorteil.

2. **Agency-Kanal als erstes validieren (Woche 3–4):** 20 DACH-Webagenturen direkt kontaktieren (LinkedIn/XING). Eine Agentur mit 50 Kunden = 50 Badge-Implementierungen. Erster Agency-Deal vor Tool-Launch validiert das Geschäftsmodell.

3. **EU CoP als Rückenwind nutzen:** EU Code of Practice (finale Version Juni 2026) explizit referenzieren. Unternehmen die CoP unterzeichnen wollen, brauchen eine technische Implementierung — wir sind die einfachste. Partnergespräch mit EU AI Office aufnehmen (kostet nichts, Reputationsgewinn enorm).

**Validierungsmaßnahmen (vor V1 Launch):**
- 5 Kunden-Interviews: "Wie löst du das Problem heute?"
- 3 Agency-Gespräche: "Würdest du 299 €/Monat für 50-Domain-Management zahlen?"
- 1 Anwalt-Review: Einordnung `ki-transparent.json` als technische Selbstauskunft (nicht Rechtsberatung)

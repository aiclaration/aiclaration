# 3. Validierung

> **Basis:** [[2_Lokales_Research|← 2_Research]] · **Weiter:** [[4_Pflichtenheft|4_Pflichtenheft →]]
> **Kriterien:** [[Rules|Projekt-Checkliste (Verfassung)]]

## SEO-Keywords

| Keyword | Volumen (geschätzt) | Schwierigkeit | Intent |
|---|---|---|---|
| EU AI Act Kennzeichnungspflicht | 1.200/Monat | Mittel | Informational |
| KI-Text kennzeichnen Pflicht | 800/Monat | Niedrig | Informational |
| AI Act Compliance Website | 600/Monat | Mittel | Informational |
| KI-Transparenz Dokumentation | 400/Monat | Niedrig | Informational |
| ai-transparency.json | 50/Monat | Sehr niedrig | Brand |
| EU AI Act Bußgeld KMU | 900/Monat | Niedrig | Pain-Point |
| ChatGPT kennzeichnen Website | 500/Monat | Niedrig | Informational |

## Marketing-KPIs

| KPI | Zielwert V1 (Launch) | Zielwert V2 (6 Monate) |
|---|---|---|
| Organische Visits/Monat | 500 | 5.000 |
| Free-User-Conversions/Monat | 50 | 500 |
| Paid-Customers (Starter+) | 3 | 30 |
| MRR (Monatlich wiederkehrend) | 147 € (3×49€) | 1.470 € |
| Cost per Lead (Google Ads) | <8 € | <5 € |
| Lead-to-Paid Conversion | 5% | 8% |

---

## ✅ Feasibility-Check

### Technische Machbarkeit

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Stateless-Architektur realisierbar? | ✅ Ja | Next.js Static Export + Hetzner EU + Coolify Edge Function — eine einzige nicht-statische Komponente |
| JSON-Schema-Validation? | ✅ Ja | Ajv v8 lokal, kein externer API-Call nötig |
| SSRF-Protection? | ✅ Ja | Blockliste für private IPs, Loopback, Cloud-Metadata — triviale Regex-Prüfung |
| Managed-Hosting-Fallback? | ✅ Ja | Redirect-Plugin / Subdomain-Workaround — Standard-Workaround bekannt |
| WCAG 2.2 AA? | ✅ Ja | Kontraste ≥ 4.5:1, Touch ≥ 44×44px — Tailwind + axe-core umsetzbar |
| Solo-Dev realisierbar? | ✅ Ja | V1 Scope: Landingpage + Generator + Validator + Badge — kein Dashboard, keine User-DB, < 12 Wochen |

**Fazit Technik:** Kein Risiko. V1 Stack ist state-of-the-art, gut dokumentiert, solo-wartbar.

### Markt-Machbarkeit

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Markt existiert? | ✅ Ja | EU AI Act Art. 50(4) gilt ab Aug 2026 für alle Unternehmen mit KI-generierten Texten online |
| Zielgruppe erreichbar? | ✅ Ja | LinkedIn "Online Marketing Manager" + Deutschland = 50.000+ Profile; DACH 12.000+ Agenturen |
| Wettbewerbsvorteil? | ✅ Ja | Blue Ocean 5/5 — kein Konkurrent bietet maschinenlesbaren /.well-known/-Standard |
| Timing? | ✅ Ja | Launch April/Mai 2026 = 3–4 Monate vor Inkrafttreten — First-Mover Advantage |
| Pricing akzeptabel? | ✅ Ja | Free = 0 €, Starter = 49 €/Monat, Pro = 99 €/Monat — unter Anwaltskosten (5.000–15.000 €) |

**Fazit Markt:** Kein Risiko. Dokumentierter Pain Point, klarer First-Mover, realistisches Pricing.

### Finanz-Machbarkeit

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Build-Kosten (V1)? | ✅ 0 € | Solo-Dev, Bitwarden CLI, Hetzner EU + Coolify, kein externes Budget nötig |
| Running Costs (V1)? | ✅ ~5 €/Monat | Hetzner EU + Coolify Hobby (0 €) + Domain (12 €/Jahr) + Resend Trial + Brevo Free |
| Break-even? | ✅ 3 Paid Starter | 3 × 49 € = 147 €/Monat — erreichbar in 3 Monaten |
| Skalierbarkeit? | ✅ Ja | Stateless = horizontale Skalierung trivial; Stripe für Billing; Brevo für E-Mail |

**Fazit Finanzen:** Kein Risiko. V1 kostet praktisch nichts zu builden und zu hosten.

### Regulatorische Machbarkeit

| Kriterium | Bewertung | Begründung |
|---|---|---|
| EU AI Act Art. 50(4)? | ✅ Klar anwendbar | Gilt für KI-generierte Texte online publiziert — kein High-Risk-Erfordernis |
| RDG-Firewall? | ✅ Implementiert | 5 strukturelle Maßnahmen (Badge-Name, Step-0-ACK, 2-Layer-Status, Hover-Tooltip, Onboarding-EMail) |
| DSGVO? | ✅ Konform | Kein Nutzer-Content gespeichert, stateless, keine Cookies, Datenschutzerklärung + Impressum |
| AVV mit Kunden? | ✅ Nicht nötig | V1 stateless — keine personenbezogenen Datenverarbeitung; ToS regelt Verantwortung |
| IANA-Standard? | ✅ Angemeldet | Einreichung als /.well-known/ URI — sichert Standard-Moat |

**Fazit Regulatorik:** Kein Risiko. Policy-Layer ≠ Content-Layer klar kommuniziert; RDG-Firewall verhindert Rechtsberatung.

### Operative Machbarkeit

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Solo-Dev Kapazität? | ✅ Ausreichend | V1 Scope < 12 Wochen, keine User-DB, kein Dashboard, kein SSO — fokussiert auf Kernflow |
| Wartbarkeit? | ✅ Gegeben | Next.js Static + Edge Function — eine Edge Function, triviale Debugging-Pipeline |
| Tool-Chain stabil? | ✅ Ja | Hetzner EU + Coolify, Stripe, Resend, Brevo — alle etablierten Dienste mit guten SDKs |
| Paranoid Mode umsetzbar? | ✅ Ja | 5 Schutzschichten aus 3b_Tools_Tech — meta tags, Cloudflare, robots.txt, sitemap, email-obfs |

**Fazit Operation:** Kein Risiko. Klarer Scope, stabile Tool-Chain, keine komplexe Infrastruktur.

---

### Gesamt-Feasibility

| Dimension | Status | Begründung |
|---|---|---|
| **Technisch** | ✅ Kein Risiko | Stateless, bewährter Stack, SSRF-Protection trivial |
| **Markt** | ✅ Kein Risiko | First-Mover, Blue Ocean, klarer Pain Point |
| **Finanziell** | ✅ Kein Risiko | Build-Kosten ~0 €, Running < 5 €/Monat |
| **Regulatorisch** | ✅ Kein Risiko | RDG-Firewall implementiert, DSGVO-konform |
| **Operativ** | ✅ Kein Risiko | Solo-Dev tragbar, stabile Tool-Chain |

**Ergebnis: ✅ FEASIBLE — Alle 5 Dimensionen grün. Keine Blocker identifiziert.**

---

## ✅ Handoff Sign-Off

**Datum:** 2026-04-08
**Alle 8 Audits:** ✅ PASSED (0_Gatekeeper, 1_Logik, 2_Design, 3_Tech_Lead, 4_User, 5_Security, 6_Legal, 7_Landingpage)

### Founder-Approval
- [x] Ich glaube noch an diese Idee und bin bereit zur Umsetzung
- [x] Alle 11 Pflichtdateien vorhanden (Glob-Check 2026-06-19 ✅): 0_Scorecard · 1_Lastenheft · 2_Research · 3_Validierung · 3b_Tools_Tech · 4_Pflichtenheft · 5_State · 6_Styleguide · 7_Deployment_Ops · 8_Post_Launch_Review · audit_7_freebie_strategy
- [x] Domain-Verfügbarkeit geprüft: aiclaration.de / .eu / .com ✅
- [x] Pflichtenheft enthält: Architecture, API-Spec, Error Catalog, Testing Strategy, Privacy-by-Architecture, SEO/AEO-Strategie

**→ Bereit für Handoff-Protokoll:** [[09_Handoff_Protocol|09_Handoff_Protocol]]
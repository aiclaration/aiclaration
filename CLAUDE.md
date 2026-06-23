# aiclaration Implementation-Vault

## Vault-Zweck
IMPLEMENTATION - Code + Dokumentation zusammen.

## WICHTIG: V1 Build-Reihenfolge (PFLICHT - nicht ueberspringen!)

### Phase 1: Landingpage + E-Mail-Capture (IMMER ZUERST)
1. Landingpage mit Hero, Benefit-Sektionen, FAQ, CTA bauen
2. Freebie-UI einbauen (vereinfacht oder Mock - noch NICHT die echte Engine)
3. /api/subscribe: Brevo Double-Opt-In implementieren
4. Auf Hosting-Platform deployen (laut 00_Specs/7_Deployment_Ops.md)
5. Ziel: erste 100 E-Mails sammeln - BEVOR das Kern-Tool gebaut wird

### Phase 2: Kern-Tool / Engine
- Voraussetzung: Berechnungsformeln + Algorithmen in 00_Specs/4_Pflichtenheft.md VOLLSTAENDIG
- Erst dann Engine/WASM/Core-Logik implementieren
- In bestehende Landingpage integrieren

### Phase 3: Billing + Auth + V2-Features
- Erst nach validiertem Interesse (E-Mail-Liste + erste Zahler)

## Session-Ende-Protokoll (PFLICHT - AUTOMATISCH - ohne Aufforderung)

BEVOR jede Antwort abgeschlossen wird, die eine Session beendet oder abschliessend wirkt:

1. **DASHBOARD.md aktualisieren** — Checkboxen abhaken, Sessions-Tabelle erganzen, Status anpassen
2. **02_Sessions/YYYY-MM-DD_session-N.md anlegen** — Was wurde getan, was steht noch aus
3. **src/lib/types.ts pruefen** — Typen muessen die aktuelle Implementierung widerspiegeln

Diese drei Schritte sind NICHT OPTIONAL. Sie werden OHNE Aufforderung ausgefuehrt.
Der Nutzer fragt NICHT danach — sie passieren automatisch am Session-Ende.

## Regeln
1. **BEI JEDER SESSION: Lese zuerst DASHBOARD.md** - dort steht genau was als naechstes zu tun ist
2. 00_Specs/ ist READ-ONLY (nie direkt bearbeiten)
3. 00_Specs/4_Pflichtenheft.md ist AUTHORITATIVE - alle Specs, Algorithmen, Formeln
4. 00_Specs/6_Styleguide.md ist AUTHORITATIVE - alle Farb-Tokens
5. Nach jeder Session: 02_Sessions/YYYY-MM-DD_session-N.md anlegen
6. Neue Architektur-Entscheidungen: 01_Decisions/ADR-XXX.md
7. KEIN .env in Git - nur Bitwarden CLI

## Dashboard lesen (Pflicht!)
DASHBOARD.md zeigt die aktuelle Phase + Checkbox-States. Checkboxen abhaken wenn fertig - Status bleibt erhalten.

## Links
- Ideen-Vault: [[_Link_zum_Ideen_Vault]]
- V1 Specs: [[4_Pflichtenheft]]
- Dashboard: [[DASHBOARD]]
- Deployment: [[7_Deployment_Ops]]
- Tech-Stack: [[3b_Tools_Tech]]
- Sessions: [[_template_session]] · [[01_Decisions/00_Index|ADR-Register]]
- Secrets: [[bitwarden-cli-setup]]

Erstellt: 2026-06-19

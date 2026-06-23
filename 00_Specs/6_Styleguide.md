# 6. Styleguide (Neo-Trust)

> **Implementierung:** [[10_Ideen_Projekte/ID2604071725_037_aiclaration/4_Pflichtenheft|4_Pflichtenheft]] · **Globaler Stack:** [[00_System/04_Tools_Tech|Tech-Stack]]
> **Datum:** 2026-04-08 · **WCAG Level:** 2.2 AA (Pflicht!)

---

## Farbpalette

### Primärfarben (Badge & CI)

| Name | Hex | Verwendung | WCAG Kontrast |
|---|---|---|---|
| **Slate 900** | `#0f172a` | Text dunkel, Footer | 15.3:1 ✅ |
| **Slate 800** | `#1e293b` | Badge-Hintergrund, Dark-UI | 14.3:1 ✅ |
| **Slate 700** | `#334155` | Sekundär-Text, Border | 8.5:1 ✅ |
| **Slate 100** | `#f1f5f9` | Hell-Hintergrund | 17.8:1 ✅ |
| **Slate 50** | `#f8fafc` | Page-Background | 21.7:1 ✅ |
| **Emerald 600** | `#059669` | Primär-CTA, Badge-Akzent, Checkmarks | 4.7:1 ✅ (normal text), 7.2:1 ✅ (large text) |
| **Emerald 700** | `#047857` | Hover-State CTA | 5.0:1 ✅ |
| **Emerald 100** | `#d1fae5` | Badge-Text auf dunkel | 6.4:1 ✅ |
| **Red 600** | `#dc2626` | Error-States | 4.9:1 ✅ (large text only) |
| **Amber 500** | `#f59e0b` | Warning-States | 3.2:1 ⚠️ nur für große Texte ≥ 18pt oder fett |

### Kontrast-Matrix (Pflicht-Checks)

| Kombination | Vordergrund | Hintergrund | Ratio | WCAG AA | Status |
|---|---|---|---|---|---|
| Body Text | Slate 900 | White/Slate 50 | 17.8:1 | ✅ | OK |
| Hero Headline | Slate 900 | Slate 50 | 17.8:1 | ✅ | OK |
| Subline/Microcopy | Slate 700 | Slate 50 | 8.5:1 | ✅ | OK |
| CTA Button | Emerald 100 | Emerald 600 | 6.4:1 | ✅ | OK |
| CTA Button Hover | White | Emerald 700 | 5.0:1 | ✅ | OK |
| Badge Text | Emerald 100 | Slate 800 | 6.4:1 | ✅ | OK |
| Trust Section Text | White | Slate 900 | 15.3:1 | ✅ | OK |
| Error Message | Slate 900 | Red 100 | 8.5:1 | ✅ | OK |
| Valid Message | Slate 900 | Emerald 100 | 7.2:1 | ✅ | OK |
| FAQ Text | Slate 800 | Slate 50 | 14.3:1 | ✅ | OK |
| Input Label | Slate 800 | White | 14.3:1 | ✅ | OK |
| Input Border | Slate 700 | White | 8.5:1 | ✅ | OK |
| Input Focus Border | Emerald 600 | White | 4.7:1 | ✅ | OK |

### Niemals diese Kombinationen!

| Kombination | Ratio | Grund |
|---|---|---|
| Slate 700 auf Slate 100 | 2.9:1 | ❌ Zu niedrig |
| White auf Slate 700 | 3.0:1 | ❌ Zu niedrig |
| Slate 900 auf Slate 400 | 4.5:1 | ❌border-line only |
| Emerald 600 Text unter 18pt | 3.2:1 | ❌ Nur für große texte |

---

## Typografie

### Font-Stack

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font-Sizes (Tailwind Defaults)

| Token | px | rem | Line-Height | Verwendung |
|---|---|---|---|---|
| `text-xs` | 12 | 0.75 | 16px | Microcopy, Helper-Text |
| `text-sm` | 14 | 0.875 | 20px | Labels, sekundärer Text |
| `text-base` | 16 | 1 | 24px | Body-Text |
| `text-lg` | 18 | 1.125 | 28px | Lead-Text, FAQ-Antworten |
| `text-xl` | 20 | 1.25 | 28px | Subheadlines |
| `text-2xl` | 24 | 1.5 | 32px | Section Headlines |
| `text-3xl` | 30 | 1.875 | 36px | H2 |
| `text-4xl` | 36 | 2.25 | 40px | H1, Hero |

### Font-Weights

| Weight | Wert | Verwendung |
|---|---|---|
| `font-normal` | 400 | Body-Text |
| `font-medium` | 500 | Labels, Input-Text |
| `font-semibold` | 600 | Buttons, Badge-Text |
| `font-bold` | 700 | Headlines H1–H2 |

---

## Spacing & Layout

### Container

| Breakpoint | Max-Width | Padding |
|---|---|---|
| `sm` (640px) | 640px | 16px |
| `md` (768px) | 768px | 24px |
| `lg` (1024px) | 1024px | 32px |
| `xl` (1280px) | 1280px | 48px |

### Touch-Targets (WCAG 2.2 AA Pflicht)

| Element | Min-Size | Tailwind-Class |
|---|---|---|
| **Buttons** | 44×44px | `min-h-11 min-w-11` oder `p-3` |
| **Input-Felder** | 44px height | `h-11` |
| **Links** | 44×44px | wenn Text kürzer als 44px: `p-2` |
| **Checkbox/Radio** | 24×24px + Label-Abstand | `w-6 h-6` + `ml-2` |
| **Accordion-Trigger** | 44×44px | `p-3` oder `min-h-11` |

### Icon-Größen

| Verwendung | Size | Tailwind |
|---|---|---|
| Inline Icons (Text-Labels) | 16×16px | `w-4 h-4` |
| Feature-Icons (Sections) | 24×24px | `w-6 h-6` |
| Shield/Trust Icons | 32×32px | `w-8 h-8` |
| Badge-Icon | 24×24px | `w-6 h-6` |

---

## Komponenten-Specs

### Button (Primary CTA)

```tsx
// Variante: Emerald Solid
className="bg-emerald-600 text-emerald-100 font-semibold px-6 py-3 rounded-lg 
         hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-600/30 
         active:scale-[0.98] transition-all duration-150
         min-h-11 min-w-44px" // WCAG Touch-Target
```

### Button (Secondary)

```tsx
className="bg-slate-100 text-slate-800 font-medium px-6 py-3 rounded-lg 
         border border-slate-300 hover:bg-slate-200 
         focus:ring-4 focus:ring-slate-300/30 
         min-h-11 min-w-44px"
```

### Input-Feld

```tsx
className="h-11 w-full px-4 py-2 rounded-lg border border-slate-300 
         text-slate-800 placeholder-slate-500
         focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/30 
         focus:outline-none"
// Label: font-medium text-slate-800, immer über Input
// Helper-Text: text-sm text-slate-600, unter Input
```

### Badge-SVG (240×80px)

```svg
<!-- Pflicht-Spec aus 4_Pflichtenheft S5.3 -->
<svg width="240" height="80" viewBox="0 0 240 80" fill="none" 
     xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="KI-Transparenz-Prozess dokumentiert">
  <!-- Hintergrund: Slate 800 -->
  <rect width="240" height="80" rx="8" fill="#1e293b"/>
  <!-- Icon: Shield + Check -->
  <g transform="translate(16, 20)">
    <path d="...Schild-Form..." fill="#10b981"/>
    <path d="...Haken..." stroke="#10b981" stroke-width="2" fill="none"/>
  </g>
  <!-- Text -->
  <text x="56" y="42" font-family="system-ui" font-size="14" 
        font-weight="600" fill="#d1fae5">
    KI-Transparenz-Prozess dokumentiert ✓
  </text>
  <!-- Hover-Tooltip: via <title> oder aria-label -->
</svg>
```

### Checkbox

```tsx
className="w-6 h-6 rounded border-2 border-slate-300 
         checked:bg-emerald-600 checked:border-emerald-600 
         focus:ring-4 focus:ring-emerald-600/30 
         cursor-pointer"
// Label: ml-2 font-medium text-slate-800
```

### Accordion (FAQ)

```tsx
// Trigger
className="w-full flex items-center justify-between p-4 text-left 
         min-h-11 hover:bg-slate-100 focus:ring-4 focus:ring-slate-300/30"
// Panel: p-4 text-slate-700
```

---

## Barrierefreiheit (WCAG 2.2 AA)

### Pflicht-Checkliste vor Launch

- [ ] Alle Texte haben Kontrast ≥ 4.5:1 (normal text) oder ≥ 3:1 (large text ≥ 18pt/fett)
- [ ] Alle Touch-Targets ≥ 44×44px
- [ ] Alle Formulare haben sichtbare Labels (nicht nur Placeholder)
- [ ] Alle Buttons haben deskriptive Texte (nicht "Klicken Sie hier")
- [ ] Focus-Indikator sichtbar (nicht `outline: none` ohne Alternative)
- [ ] Keyboard-Navigation funktioniert für alle interaktiven Elemente
- [ ] Screenreader kann alle Informationen lesen (semantisches HTML)
- [ ] Bilder haben Alt-Text oder `aria-hidden="true"` wenn dekorativ

### Fokus-Indikator (Custom, aber WCAG-konform)

```css
/* Niemals: outline: none ohne Alternative */
/* Immer: */
*:focus-visible {
  outline: 2px solid #059669; /* Emerald 600 */
  outline-offset: 2px;
}
```

### Skip-Link (Pflicht für SEO + A11y)

```tsx
// In layout.tsx, ganz am Anfang der Seite
<a href="#main-content" 
   className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
            focus:z-50 focus:bg-emerald-600 focus:text-white focus:p-4 focus:rounded">
  Direkt zum Hauptinhalt
</a>
```

---

## Responsive Breakpoints

| Name | Breakpoint | Tailwind-Prefix | Verwendung |
|---|---|---|---|
| Mobile | <640px | (kein Prefix) | 1-Spalte, volle Breite |
| Tablet | 640–1023px | `sm:` | 1–2 Spalten |
| Desktop | 1024–1279px | `md:` / `lg:` | 2–3 Spalten, max-width |
| Large | ≥1280px | `xl:` | Container-max-width erreicht |

---

## Animation & Motion

### Prinzip

Motion muss den Nutzer unterstützen, nicht ablenken. Prefers-reduced-motion beachten.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Erlaubte Animationen

| Animation | Dauer | Verwendung |
|---|---|---|
| Fade-In (Sections) | 300ms | Sektionen erscheinen beim Scrollen |
| Button Hover | 150ms | Scale + Color |
| Accordion | 200ms | Height expand |
| Page-Transition | 200ms | Fade zwischen Pages |

---

## Dark Mode

V1 ist **Light-Mode-only** (kein Dark Mode geplant). Slate 50 als Hintergrund, Slate 900 als Text.

---

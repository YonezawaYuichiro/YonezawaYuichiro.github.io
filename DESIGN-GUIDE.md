# DESIGN-GUIDE.md

## Design Philosophy

Follows this core aesthetic principles: **clean, minimal, content-first**. The design should never compete with the content-everything exists to serve readability.

Inspired by [AstroPaper](https://github.com/satnaing/astro-paper).

---

## Unified CSS Class System

All styles are defined in `@src/styles/global.css`. No inline `<style>` allowed in components.

### Typography Classes
| Class | Description |
|-------|-------------|
| `title-xl` | Page title (clamp 1.5–1.9rem, 800) |
| `title-lg` | Section title (clamp 1.35–1.6rem, 700) |
| `title-md` | Subsection (1.05rem, 700) |
| `body` | Body text (1rem, 1.95 line-height) |
| `body-sm` | Small text (0.875rem, muted) |
| `body-xs` | Tiny text (0.78rem, muted) |
| `label` | Uppercase mono label (metadata headings) |
| `mono` | Code/text (JetBrains Mono) |
| `measure` | Caps a text block at `--measure` (34em) |

### Layout Classes
| Class | Description |
|-------|-------------|
| `container-narrow` | Max-width 780px (reading columns) |
| `container-wide` | Max-width 980px (grids, hero) |
| `gap-1` to `gap-4` | Gap scale |

### Component Classes
| Class | Description |
|-------|-------------|
| `section-block` | Section wrapper (5.5rem vertical padding) |
| `section-block--tinted` | Sunken-surface variant, used to alternate sections |
| `section-head` | Eyebrow + title + lead grouping |
| `section-eyebrow` | Mono accent label with leading rule |
| `section-lead` | Muted intro sentence under a section title |
| `block-head` / `block-title` / `block-rule` | Sub-block heading with trailing hairline |
| `timeline` / `timeline-item` | Vertical rule + dot chronology list |
| `cert-timeline-*` | Date / label / note grid rows |
| `skill-chip` + `skill-lv1`–`skill-lv4` | Skill badge with level bar |
| `skill-legend` | Level key, ordered highest proficiency first |
| `note-box` | Accent-edged callout |
| `project-card` + `project-card-arrow` | Clickable project summary card |
| `contact-row` | Channel row with hover arrow |
| `about-fact` | Pill for short profile facts |
| `tag` | Pill-shaped neutral badge |
| `btn` / `btn-primary` / `btn-icon` | Buttons |
| `link` | Text link with underline |

### Layout Section Classes
| Class | Description |
|-------|-------------|
| `navbar` | Sticky top navigation (`is-scrolled` adds the border) |
| `nav-links` | Nav link list |
| `nav-link` | Nav link (`is-active` set by scroll-spy) |
| `hero` / `hero-inner` / `hero-portrait` | Landing block |
| `page-shell` / `page-main` | Page skeleton |
| `footer` / `footer-inner` | Site footer |

### Prose Classes
| Class | Description |
|-------|-------------|
| `prose` | Main content wrapper |
| `prose h1/h2/h3` | Heading styles |
| `prose p` | Paragraph styling |
| `prose ul/ol` | List styling with accent markers |
| `prose code` | Inline code styling |
| `prose pre` | Code block with border |
| `prose img` | Image styling |
| `prose blockquote` | Quote styling |
| `prose hr` | Horizontal divider |

---

## Layout

### Single-Page Structure (Primary)
- **Sticky navbar** with scroll-spy; the bottom border only appears once scrolled.
- **Hero** — full-width, two columns (text + portrait), collapses to stacked on mobile.
- **Sections** alternate between plain background and `--surface-sunken`. Rhythm comes from
  the change of surface, not from stacking more 1px rules.
- Reading sections use `container-narrow` (780px); grids use `container-wide` (980px).

### Spacing (Generous)
- Section vertical padding: 5.5rem desktop / 4rem mobile
- Section head to content: 2.75rem
- Sub-block head to content: 1.1rem

### Reading measure (Japanese)
- Body copy is capped at `--measure` (34em). Japanese text at 780px full width is too long
  a line to scan comfortably — always wrap prose in `.measure` or `.section-lead`.

---

## Color

### Principles (AstroPaper-inspired)
- **Monochromatic base:** Let content breathe. No competing colors.
- **Accent = function:** Use accent only for hover states, active links, and subtle highlights.
- **One accent color per theme:** Never use multiple accent colors together.

### Theme System
- Themes configured in `src/config/themes.ts` - unified THEMES object with `isDark` flag
- Each theme defines 6 tokens: `background`, `foreground`, `accent`, `muted`, `border`, `surface`
- **`surface` must differ from `background`.** If they are equal, every card dissolves into the
  page and the whole design reads as flat.
- Derived tokens are computed in `global.css` via `color-mix`, so new themes need no extra setup:
  `--surface-sunken` (section tint), `--accent-soft` (accent wash), `--accent-line` (hairline
  accent), `--border-subtle` (faint divider)
- Users select active light/dark themes via `src/config/site.ts` (`THEME_CONFIG.themeLight`, `THEME_CONFIG.themeDark`)

### Skill level colors (the only multi-hue exception)
Skill proficiency is the one place with four hues. They are kept low-saturation and applied as a
3px bar + 7% tint — never as a saturated fill, which would out-shout every other element.
Defined per theme as `--lv-color` on `.skill-lv1`–`.skill-lv4`.

### Contrast (non-negotiable)
- Text must pass WCAG AAA contrast in both light and dark modes.
- Minimum 7:1 contrast ratio for body text.

---

## Typography

### Font Stack
- **Body/Headings:** Inter (via @fontsource/inter), followed by an explicit Japanese stack
  (Hiragino Kaku Gothic ProN → Hiragino Sans → Noto Sans JP → Yu Gothic → Meiryo).
  Inter carries no Japanese glyphs; without this the browser silently falls back and the
  kana/kanji stop matching the Latin text.
- **Code/Tags/Metadata:** JetBrains Mono (via @fontsource/jetbrains-mono)
- `font-feature-settings: "palt"` on body for Japanese proportional kerning; disabled on
  mono/label classes where tabular alignment matters.
- No external web fonts—self-host via fontsource packages

### Hierarchy
- **Hero name:** clamp 2.1–3.1rem, weight 800
- **Section heading (h2):** clamp 1.35–1.6rem, weight 700, paired with a mono eyebrow
- **Body text:** 1rem, line-height 1.95 (Japanese needs more leading than Latin)
- **Never dim text with `opacity`.** Use `var(--text-muted)` so contrast stays predictable.

---

## UI Components

### Flat Design
- **NO drop shadows.** Ever.
- NO heavy gradients. The only gradient is the hero's accent wash at ~10% alpha.
- Separation = 1px solid border OR subtle background variation.
- Depth comes from **layered surfaces** (`--surface-sunken` < `--background` < `--surface`),
  not from elevation.
- **Border-radius:** 0.5rem buttons/chips, 0.65rem cards, 100px pills.
- Backdrop blur is allowed on exactly two elements: the sticky navbar and the modal backdrop.

### Links
- Underline with 4px offset.
- Hover: color shifts to accent, full opacity.
- Transition: 0.2s ease.

### Buttons
- Flat, no shadows.
- Hover: subtle border/color change.
- Icon buttons use 50% border-radius.

### Icons
- Outline style (Lucide/Tabler style).
- stroke-width: 1.5px.
- Sizes: 24px (standard).

---

## Accessibility

- **Focus rings:** Visible 2px solid accent outline for keyboard navigation.
- **Reduced motion:** Respect `prefers-reduced-motion` media query.
- **Alt text:** Required for all images.

---

## Implementation Notes

- **No `<style>` in `.astro` files.** All styles in global.css or via Tailwind classes.
- **Tailwind v4:** Uses `@tailwindcss/vite` plugin (no `tailwind.config.js`).
- Tailwind utilities allowed for layout, but prefer unified CSS classes.
- Use CSS variables (e.g., `var(--foreground)`, `var(--accent)`) for theming.

---

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro           (.navbar, .nav-link, scroll-state + scroll-spy)
│   │   └── Footer.astro           (.footer, .footer-inner)
│   ├── sections/
│   │   ├── Hero.astro             (.hero, .hero-portrait)
│   │   ├── About.astro            (.timeline, .cert-timeline-*, .about-fact)
│   │   ├── SkillsSection.astro    (.skill-chip, .skill-legend, .note-box)
│   │   ├── ProjectsSection.astro  (.project-grid, .project-dialog)
│   │   └── ContactSection.astro   (.contact-row)
│   └── ui/
│       ├── ProjectCard.astro      (.project-card)
│       ├── Tag.astro              (.tag)
│       └── Icon.astro
├── layouts/
│   └── BaseLayout.astro           (injects the 6 theme tokens as CSS variables)
└── styles/
    └── global.css                 (all unified classes + derived tokens)
```
---
name: Architecture Dialogue
colors:
  surface: '#fcf9f5'
  surface-dim: '#dcdad6'
  surface-bright: '#fcf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f0'
  surface-container: '#f0edea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e5e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#56423c'
  inverse-surface: '#30302e'
  inverse-on-surface: '#f3f0ed'
  outline: '#8a726b'
  outline-variant: '#ddc0b8'
  surface-tint: '#a04020'
  primary: '#953918'
  on-primary: '#ffffff'
  primary-container: '#b5502e'
  on-primary-container: '#fff0eb'
  inverse-primary: '#ffb59e'
  secondary: '#5f5f57'
  on-secondary: '#ffffff'
  secondary-container: '#e4e3d9'
  on-secondary-container: '#65655d'
  tertiary: '#005f6f'
  on-tertiary: '#ffffff'
  tertiary-container: '#007a8d'
  on-tertiary-container: '#def8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59e'
  on-primary-fixed: '#3a0b00'
  on-primary-fixed-variant: '#802a09'
  secondary-fixed: '#e4e3d9'
  secondary-fixed-dim: '#c8c7bd'
  on-secondary-fixed: '#1b1c16'
  on-secondary-fixed-variant: '#474740'
  tertiary-fixed: '#a8edff'
  tertiary-fixed-dim: '#7ad3e8'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e5b'
  background: '#fcf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e5e2df'
typography:
  feature-quote:
    fontFamily: Newsreader
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  feature-quote-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
    letterSpacing: -0.01em
  subhead:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-base:
    fontFamily: Newsreader
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  caption:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  meta-mono:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system draws inspiration from archival architectural monographs, physical broadsheets, and editorial book design. It is built for sustained reading, spatial contemplation, and serious architectural discourse. 

The aesthetic is grounded in restrained editorial minimalism:
- **Print Materiality:** Surfaces emulate tactile, untreated heavy-stock paper rather than cold digital glass.
- **Rhythmic Negative Space:** Layouts prioritize typographic breathing room over decorative containment. Separation is achieved through vertical rhythm and white space rather than heavy bounding boxes.
- **Strict Intentionality:** Every line, label, and visual weight serves editorial clarity. Interactive elements are sparse, discreet, and distinguished by deliberate terracotta accents.

## Colors

The palette reproduces the tactile experience of black ink printed on archival, unbleached stock.

- **Canvas & Surface (`#FBF7F0`):** Warm off-white, reducing eye fatigue during long-form reading and setting an analog tone.
- **Ink / Text (`#2B2B29`):** Near-black charcoal ink, providing deep contrast without the harsh artificial glare of pure `#000000`.
- **Secondary Ink / Meta (`#6B6B63`):** Warm muted gray for timestamps, photo credits, architectural specs, and secondary chrome.
- **Terracotta Accent (`#B5502E`):** A warm architectural red-clay tone reserved strictly for focal interactive elements: active links, text cursors, selected tabs, and primary actions.
- **Paper Rule & Subtle Tint (`#E8E2D5`):** Used sparingly for ultra-light structural dividers, hairline borders, and secondary button backgrounds.

Never use pure black or white. Gradients are prohibited.

## Typography

The type system pairs an expressive, humanist serif (**Newsreader**) for narrative storytelling with a crisp, utilitarian geometric sans (**Work Sans**) for structural framing and interface chrome.

- **Editorial Reading Rhythm:** Main article bodies must be locked to a measure between 60 and 75 characters per line (optimal width: `68ch` or roughly `680px`).
- **Typographic Hierarchy:** Long-form prose relies on generous line heights (`1.6` to `1.65`) for prolonged reading comfort.
- **Editorial Emphasis:** Pull quotes, epigraphs, and architectural essays use italicized weights of Newsreader.
- **Chrome & Data:** Page numbers, metadata, timestamps, button labels, and section flags strictly use Work Sans in medium weights with slight positive tracking (`+0.01em` to `+0.04em`) to maintain sharp, legible legibility at smaller scales.

## Layout & Spacing

The layout structure mirrors traditional printed publications with an asymmetric, disciplined grid system.

- **Grid Structure:** A 12-column desktop grid with wide outside margins that center a focused, single-column reading well (`68ch` maximum width). Secondary metadata, architectural drawings, and footnotes float into an adjacent side column rather than interrupting the continuous vertical reading flow.
- **Whitespace Cadence:** Vertical transitions between sections use ample breathing space (`space-xl` or larger). Spacing establishes topical breaks, eliminating the need for thick divider lines.
- **Responsive Adaptations:**
  - **Mobile (< 768px):** Single column with `1.25rem` margin. Marginalia collapses beneath corresponding paragraphs.
  - **Tablet (768px - 1024px):** 8-column grid with `2rem` margin. Footnotes align directly alongside the reading line.
  - **Desktop (> 1024px):** 12-column asymmetric layout with generous `4rem` outer canvas padding.

## Elevation & Depth

This system avoids drop shadows, glossy finishes, and synthetic 3D skeuomorphism. It operates in pure flat space derived from physical paper and sheet layouts:

- **Surface Tiers:** Depth is communicated exclusively through tonal contrast. The primary canvas is `#FBF7F0`, while card surfaces or callout panels use subtle background shifts (such as `#F4EFE5` or a fine `#E8E2D5` boundary).
- **Hairline Rules:** When separation cannot be achieved solely via whitespace, use a single `1px` solid rule colored `#E8E2D5`. Avoid borders thicker than `1px`.
- **Overlays & Modals:** Modals and reading overlays utilize solid, untextured surfaces bordered with a single `1px` rule in `#E8E2D5`. Background dimmers use a soft paper tint overlay rather than stark black blurs.

## Shapes

The design system uses architectural precision: **sharp geometry with 0px corner radii (`roundedness: 0`)**.

- Every card, image frame, modal, button, and input field terminates in crisp, unrounded 90-degree right angles.
- This strict angularity references drafting boards, blueprints, and physically trimmed book pages, contrasting gracefully with the organic human curves of the Newsreader serif typeface.
- Circular shapes are strictly confined to user avatars or standalone icon toggles where geometry must remain invariant.

## Components

### Buttons & Navigation Links
- **Primary Actions:** Solid background in `#B5502E`, text in `#FBF7F0`, sharp 90-degree corners, set in Work Sans Medium (`label-md`). Hover state transitions to a deepened terracotta tone.
- **Secondary Actions:** Transparent background with a `1px` border in `#E8E2D5`, text in `#2B2B29`. Hover state shifts background to `#F4EFE5`.
- **Text Links & In-line Actions:** Understated text with a distinct `1px` terracotta underline spaced `3px` below baseline.

### Paired Icon + Text Labels
- Icons must never appear without descriptive companion text in interface navigation.
- Rendered in a fine `1.25px` or `1.5px` stroke, matched in height to the cap-height of the adjacent Work Sans label.

### Form Inputs & Fields
- Pure flat inputs with no drop shadows. Underline-only or 4-sided `1px` box bordered in `#E8E2D5`.
- Active focus state sharpens the border to `#B5502E` with no outer glow rings.
- Placeholder text rendered in `#6B6B63` using Work Sans.

### Checkboxes & Radios
- Sharp, square checkboxes with `1px` solid borders in `#6B6B63`. When checked, filled with `#B5502E` and displaying an angular mark.
- Radios retain a circular geometry solely for functional convention, using `#B5502E` for selected states.

### Architectural Cards & Article Previews
- Minimal containment: No raised shadows. Imagery is framed with a `0px` radius border and optional `1px` `#E8E2D5` edge.
- Layout emphasizes the headline in Newsreader (`headline-md`), preceded by a category label in Work Sans (`meta-mono`) and post-dated with a timestamp.

### Pull Quotes & Architectural Excerpts
- Large Newsreader text (`feature-quote`) flanked by a left border of `2px` solid `#B5502E` or indented freely within vertical whitespace without borders.
- Citations and architect attributions styled below in Work Sans (`caption`) in `#6B6B63`.

### Image Figures & Footnotes
- Figures feature a strict vertical stack: high-resolution image, followed by a hairline rule (`#E8E2D5`), and a caption in Work Sans (`caption`) set in `#6B6B63`.
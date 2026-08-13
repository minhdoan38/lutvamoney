---
name: Nét Nút Studio
description: An editorial reconstruction system for turning outdated corporate websites into clear, motion-led experiences.
colors:
  background: "#090909"
  foreground: "#EDEDED"
  muted: "#898989"
  line: "rgba(237, 237, 237, 0.16)"
  accent: "#FF3300"
  accent-soft: "rgba(255, 51, 0, 0.12)"
  surface-raised: "#111111"
  surface-work: "#151515"
typography:
  display:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(3.7rem, 11.5vw, 10.8rem)"
    fontWeight: 600
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.8vw, 7.5rem)"
    fontWeight: 600
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  title:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 4.2vw, 4.7rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  mono-label:
    fontFamily: "var(--font-geist-mono), monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12em"
rounded:
  none: "0"
  mobile-cta: "0.75rem"
  mobile-menu: "1.5rem"
  pill: "9999px"
spacing:
  gutter-mobile: "1rem"
  gutter-small: "1.5rem"
  gutter-large: "2.5rem"
  section-mobile: "8rem"
  section-desktop: "12rem"
components:
  site-nav:
    backgroundColor: "rgba(9, 9, 9, 0.75)"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1rem"
  hero-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.5rem 0.5rem 1.25rem"
  hero-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
  url-input:
    backgroundColor: "transparent"
    textColor: "{colors.background}"
    rounded: "{rounded.none}"
    padding: "0 1rem"
    height: "3.5rem"
  form-submit:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.mono-label}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "3.5rem"
  chip-default:
    backgroundColor: "transparent"
    textColor: "rgba(237, 237, 237, 0.72)"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1rem"
  chip-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "0.625rem 1rem"
  service-row:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "2.25rem 0"
  final-cta-tile:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.none}"
    padding: "3rem 1.25rem"
---

# Design System: Nét Nút Studio

## Overview

**Creative North Star: "The Moving Reconstruction Table"**

Nét Nút looks like an outdated corporate website pulled apart on a black worktable, then rebuilt in public. Oversized cropped Geist headlines, offset blocks, hairline-separated rows, and flat typographic tiles keep the system editorial and technical rather than polished agency-generic. Motion reveals structure—lines assemble, fields expand, and an old/new concept can be inspected—instead of adding decoration.

The world is intentionally asymmetrical and high-contrast. Vermilion acts as a singular intervention while off-white, muted gray, and near-black support reading. Selected-work media is explicitly illustrative; synthetic compositions must never be presented as client proof.

**Key Characteristics:**
- Near-black worktable with one vermilion intervention.
- Oversized, tightly tracked technical sans type, often close to the crop.
- Asymmetric twelve-column editorial compositions instead of balanced agency layouts.
- Flat Metro-like tiles, pills, and hairlines with no ornamental depth.
- Motion that exposes hierarchy, transformation, and feedback.
- Vietnamese-first copy with direct, specialist language.

## Colors

Palette uses one chromatic signal against a compact neutral worktable.

### Primary
- **Signal Vermilion** (`colors.accent`): Structural cuts, selected capability chips, active rules, cursor detail, and the final conversion tile.
- **Signal Wash** (`colors.accent-soft`): Reserved low-intensity accent tint for future state feedback; never a gradient source.

### Neutral
- **Worktable Black** (`colors.background`): Default page field, dark controls, and ink on vermilion or paper.
- **Editorial Paper** (`colors.foreground`): Primary text, light CTA surfaces, and the reconstructed illustrative tile.
- **Muted Copy** (`colors.muted`): Secondary information that must recede without becoming illegible.
- **Editorial Hairline** (`colors.line`): Section boundaries and row separators.
- **Raised Black** (`colors.surface-raised`): Opaque navigation fallback and compact overlay surface.
- **Work Surface** (`colors.surface-work`): Selected-work frame behind the illustrative comparison.

### Named Rules

**The One Signal Rule.** Vermilion is the only chromatic voice; use it for intervention, state, and conversion, never as ambient decoration.

**The Worktable Rule.** Black and paper carry the reading experience; neutral opacity may create hierarchy, but it must not become a second palette.

## Typography

**Display Font:** Geist Sans through `--font-geist-sans`, with system sans fallback  
**Body Font:** Geist Sans through `--font-geist-sans`, with system sans fallback  
**Label/Mono Font:** Geist Mono through `--font-geist-mono`, with monospace fallback

**Character:** Geist becomes technical and editorial through extreme scale, tight tracking, compact line-height, and blunt Vietnamese phrasing. Mono appears only where the interface behaves like evidence, metadata, or a terminal response.

### Hierarchy
- **Display** (`typography.display`): Hero statement; nearly fills the first viewport and may approach frame edges.
- **Headline** (`typography.headline`): Section-scale declarations with short line lengths, usually 8–12 characters wide.
- **Title** (`typography.title`): Service rows, insight titles, and other interactive editorial entries.
- **Body** (`typography.body`): Explanations and process copy; keep most measures between 34rem and 49rem.
- **Mono Label** (`typography.mono-label`): Illustrative media labels, metadata, and simulated analysis feedback; uppercase where used as evidence.

### Named Rules

**The Crop Before Ornament Rule.** Create energy with scale, line breaks, and edge proximity before adding any decorative object.

## Layout

Desktop sections use asymmetric twelve-column grids inside 1400–1600px maximum widths. Most content sits in a 1500px frame; hero allows 1600px and navigation uses 1400px. Page gutters step from `spacing.gutter-mobile` to `spacing.gutter-small` and then `spacing.gutter-large`; vertical section rhythm steps from `spacing.section-mobile` to `spacing.section-desktop`.

Hero anchors content to the viewport bottom, lets the display line dominate, then offsets explanation and actions toward later grid columns. Later sections alternate full-width ruled lists, offset two-part narratives, clustered pills, and one large work frame. Below 768px, layouts collapse to one direct reading column, the work comparison becomes a two-state toggle, and navigation becomes a contained disclosure panel.

**The Refused Balance Rule.** Do not center the hero or distribute equal cards; preserve visible tension through offset starts, uneven spans, and intentional empty space.

## Elevation & Depth

System is flat by design. It uses no box-shadow vocabulary. Depth comes from overlap, clipping, backdrop transparency in navigation, color inversion, cursor blending, and motion between states. Selected-work comparison uses a moving circular mask rather than a lifted card, while the final CTA sits as a full vermilion plane.

**The Flat Reconstruction Rule.** Surfaces stay shadowless; communicate hierarchy with scale, hairlines, overlap, clipping, and tonal contrast.

## Shapes

Primary content tiles and form controls use hard rectangular geometry (`rounded.none`). Pills are reserved for navigation shells, direct actions, capability tags, the custom cursor, and mobile state toggles (`rounded.pill`). Mobile menu container and its CTA use the two softer exceptions (`rounded.mobile-menu` and `rounded.mobile-cta`). Circular masks and cursor forms are functional interaction geometry, not a general card language.

Borders stay one-pixel and low-contrast except URL field, focus state, and comparison lens. Large media clips to its rectangular frame; display type supplies most visual cropping.

**The Geometry Split Rule.** Use hard rectangles for content and conversion planes; use pills only for controls, tags, and transient navigation.

## Components

Components feel direct and kinetic: flat at rest, clearly outlined, then translated, expanded, or recolored to explain state.

### Buttons
- **Hero Primary:** Paper pill with black text and an inset vermilion circular action mark; minimum target height is 48px.
- **Hero Secondary:** Transparent pill with a restrained paper border; vermilion enters only at hover border.
- **Form Submit:** Full-width black rectangle with mono feedback copy; minimum height is 56px.
- **Hover / Active:** Primary actions lift 4px on hover and compress to 98% on active, using the shared editorial easing.
- **Focus:** All anchors, buttons, and inputs receive a 2px vermilion outline with 5px offset.

### Chips
- **Default:** Transparent pill with a low-contrast paper border and secondary paper text.
- **Accent:** Solid vermilion pill with black text; only selected capability positions use it.
- **Motion:** Fine-pointer chips magnetize slightly toward the pointer and spring back; reduced-motion users receive static chips.

### Cards / Containers
- **Final CTA Tile:** Hard-edged vermilion plane with black display copy, URL form, and no shadow.
- **Selected Work Frame:** Hard-edged neutral frame holding an explicitly labeled illustrative old/new comparison.
- **Service / Insight Rows:** Border-separated editorial entries rather than independent cards.

### Inputs / Fields
- **Style:** Transparent, square URL field with a black border on the vermilion tile and a 56px minimum height.
- **Focus:** Border strengthens to black while global focus treatment remains available.
- **Disabled:** Opacity reduces after submission; adjacent copy states that the MVP does not transmit data.
- **Validation:** Native `type="url"` and `required` behavior guard the trust boundary without custom error decoration.

### Navigation
- **Desktop:** Fixed translucent black pill, compact labels, muted default links, paper hover state, and vermilion submit action.
- **Mobile:** Circular menu trigger opens an opaque raised-black panel; links reveal in sequence and the final action becomes a vermilion rounded rectangle.
- **Transparency fallback:** Reduced-transparency preference replaces blur with an opaque raised-black surface.

### Reconstruction Reveal

The selected-work signature begins as an abstract grayscale “Web cũ” composition. Fine pointers move a circular mask that exposes the paper-and-vermilion “Web mới” concept; mobile uses explicit old/new toggle buttons. The visual always carries the label “Concept minh họa,” because no approved client media or result evidence exists.

### Service Accordion

Hairline-separated rows pair oversized titles with expandable explanations. Hover shifts title color to vermilion; active state opens copy and grows a vermilion baseline. Button semantics and `aria-expanded` keep the state understandable without motion.

**The Feedback Must Explain Rule.** Every animation must reveal hierarchy, comparison, progress, or control state; decorative motion alone does not belong.

## Do's and Don'ts

### Do:
- **Do** let one oversized headline establish each section before supporting copy.
- **Do** use vermilion as a structural cut, active state, or conversion surface—not as ambient decoration.
- **Do** keep synthetic selected-work visuals labeled “Concept minh họa” until approved project media exists.
- **Do** preserve visible focus, touch targets, semantic labels, and reduced-motion fallbacks.
- **Do** collapse asymmetric desktop grids into a direct single-column mobile reading order below 768px.

### Don't:
- **Don't** balance the hero into a centered agency template or equal feature-card grid.
- **Don't** introduce extra hues, purple or mesh gradients, ornamental shadows, or rounded cards.
- **Don't** invent client logos, testimonials, metrics, project photography, or business outcomes.
- **Don't** add motion that hides essential content or depends on raw scroll listeners.
- **Don't** use decorative numbering, decorative dashes, scroll-cue text, or filler UI.

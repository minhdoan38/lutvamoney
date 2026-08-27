---
name: Nét Nút Studio
description: Bilingual (English default, Vietnamese under /vi) website redesign studio expressed as a direct editorial reconstruction instrument.
colors:
  background: "#090909"
  foreground: "#EDEDED"
  muted: "rgb(237 237 237 / 0.56)"
  line: "rgb(237 237 237 / 0.16)"
  accent: "#FF3300"
  accent-soft: "rgb(255 51 0 / 0.12)"
  surface-raised: "rgb(237 237 237 / 0.06)"
  surface-work: "rgb(237 237 237 / 0.08)"
typography:
  display:
    fontFamily: "Roboto Flex, Geist, system-ui, sans-serif"
    fontSize: "clamp(3.2rem, 8.6vw, 8rem)"
    fontWeight: 600
    lineHeight: "0.96"
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Roboto Flex, Geist, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 7.5rem)"
    fontWeight: 600
    lineHeight: "0.9"
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: "1.4"
    letterSpacing: "0.12em"
rounded:
  none: "0px"
  control: "0px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "80px"
components:
  hero-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.none}"
    padding: "8px 8px 8px 20px"
  hero-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    padding: "0 20px"
  url-input:
    backgroundColor: "transparent"
    textColor: "{colors.background}"
    rounded: "{rounded.none}"
    height: "56px"
  form-submit:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
    height: "56px"
---

# Design System: Nét Nút Studio

## Overview

**Creative North Star: “The Editorial Reconstruction Instrument.”**

Nét Nút treats an inherited website as material on a worktable: inspect what exists, identify the friction, reflow the meaning, and rebuild a clearer system. The visual language is direct and specialist rather than polished agency theater. Oversized variable display type, ruled fields, hard-edged blocks, and a single vermilion intervention make the act of thinking visible without pretending to perform an audit.

The system is bilingual with English as the unprefixed default and Vietnamese under `/vi`, high-contrast, and materially flat. Its energy comes from compression and release: dense rows and labels give way to large declarations, asymmetric twelve-column compositions, and a focused conversion plane. Motion reveals hierarchy, comparison, transformation, or state; semantic HTML, native controls, visible labels, and static content remain complete without it.

**Key Characteristics:**
- Near-black worktable with off-white paper and one vermilion signal.
- Roboto Flex display states paired with Geist Sans and Geist Mono.
- Asymmetric editorial compositions rather than equal feature-card grids.
- Hairlines, flat blocks, clipping, and tonal opacity instead of ornamental depth.
- Locale-aware copy (English default, Vietnamese under `/vi`) with direct, specialist language.
- Illustrative reconstruction visuals explicitly labeled as concepts.

## Colors

The palette is deliberately narrow: black and paper carry reading, while vermilion marks intervention, active state, and conversion. Neutral alpha variations create depth without introducing another hue.

### Primary
- **Signal Vermilion** (`{colors.accent}`): The only chromatic voice. Reserve it for active rules, selected states, structural cuts, highlighted geometry, and the final conversion tile.

### Neutral
- **Worktable Black** (`{colors.background}`): The base canvas, dark navigation surfaces, form-submit control, and text placed on vermilion.
- **Editorial Paper** (`{colors.foreground}`): Primary text, light reconstruction surfaces, and the paper side of high-contrast actions.
- **Muted Copy** (`{colors.muted}`): Supporting descriptions and low-priority metadata.
- **Editorial Hairline** (`{colors.line}`): Ruled boundaries and quiet structural separators.
- **Signal Wash** (`{colors.accent-soft}`): A restrained vermilion field for selected or supporting states.
- **Raised Black** (`{colors.surface-raised}`): The mobile navigation disclosure surface.
- **Work Surface** (`{colors.surface-work}`): The reconstruction canvas and illustrative stage background.

### Named Rules
**The One Signal Rule.** Vermilion is the only chromatic voice; use it for intervention, state, and conversion, never as ambient decoration.

**The Worktable Rule.** Black and paper carry the reading experience. Neutral opacity may create hierarchy, but it must not become a second palette.

## Typography

**Display Font:** Roboto Flex (with Geist and system sans fallbacks)

**Body Font:** Geist (with system sans fallback)

**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** Roboto Flex supplies a variable editorial instrument rather than a decorative display face. Its width, optical-size, and grade axes create readable compression, expansion, and release states while Geist keeps Vietnamese copy clear and operational.

### Hierarchy
- **Display** (600, `clamp(3.2rem, 8.6vw, 8rem)`, `0.96`): First-viewport statements and primary conversion questions.
- **Headline** (600, approximately `clamp(2.5rem, 8vw, 7.5rem)`, `0.9`): Large section declarations and editorial tension points.
- **Title** (500–600, responsive large sans): Service rows, process statements, insight entries, and interactive labels.
- **Body** (400, `1rem`–`1.125rem`, `1.6`): Explanations, process copy, and supporting product truth; use a readable measure rather than filling every column.
- **Label** (400, `0.625rem`, `0.12em`, uppercase where metadata calls for it): Evidence labels, illustrative captions, phase markers, and compact system voice.

### Named Rules
**The Crop Before Ornament Rule.** Create energy with scale, line breaks, width-axis changes, and edge proximity before adding a decorative object.

**The Axis Is Meaning Rule.** Use Roboto Flex width and grade changes to distinguish readable, compressed, expanded, and released statements; never use variation to hide text or reduce legibility.

## Layout

The desktop frame uses wide, asymmetric twelve-column compositions. Sections alternate between compression, expansion, and release rather than repeating equal cards: ruled service and insight rows compress information; reconstruction stages expand one inspectable idea; manifesto and vision sections release the page into a slower reading measure.

The first viewport is a full-height editorial field with content anchored low, large display type, and a vermilion geometric intervention. Content frames generally use horizontal padding of `16px` on small screens, `24px` at the small breakpoint, and `40px` on large screens. Section spacing grows from roughly `80px` to `112px` on the home surface and from `128px` to `192px` on the more spacious about surface.

At widths below `768px`, asymmetric grids collapse into direct single-column reading order. Sticky reconstruction behavior and dense desktop spans yield to readable vertical sections and native controls. Touch targets remain at least `44px`.

### Named Rules
**The Refused Balance Rule.** Do not center the hero or distribute equal cards; preserve visible tension through offset starts, uneven spans, and intentional empty space.

**The Mobile Truth Rule.** Mobile is a complete reading and action path, not a compressed desktop composition. Preserve the same meaning, controls, labels, and anchors in vertical order.

## Elevation & Depth

This is a flat system. It uses no ornamental box shadows. Hierarchy comes from tonal layering, hairlines, clipping, scale, overlap, opacity, and the contrast between black, paper, and vermilion. The fixed navigation uses translucency and blur as a functional rail treatment; it is not a floating card language.

### Named Rules
**The Flat Reconstruction Rule.** Surfaces stay shadowless; communicate hierarchy with scale, hairlines, overlap, clipping, and tonal contrast.

## Shapes

Content surfaces, process planes, form fields, and conversion tiles are rectangular with zero-radius corners. Pill geometry is reserved for stateful tags and before/after phase toggles. Navigation rails, hero/closing CTAs, form controls, and conversion actions use squared geometry. Borders are one-pixel editorial rules using paper alpha or the current signal color. No rounded cards, ornamental blobs, 3D objects, or glossy material treatments belong in the system.

### Named Rules
**The Geometry Split Rule.** Use hard rectangles for content, navigation rails, CTA actions, fields, and conversion planes; use pills only for compact state tags and phase toggles.

## Components

### Buttons
- **Character:** Tactile, direct, and state-aware; actions use a short vertical lift and a restrained press scale.
- **Primary:** Paper rectangle with black text and a small vermilion signal mark for the hero and closing CTA (`{components.hero-primary}`).
- **Secondary:** Transparent rectangle with a paper hairline, paper text, and vermilion border on hover (`{components.hero-secondary}`).
- **Form submit:** Full-width black rectangle with a Geist Mono label on the vermilion conversion plane (`{components.form-submit}`).
- **Hover / Focus:** Use the editorial easing family for a `200ms`–`300ms` response, with a `2px` vermilion focus outline and `5px` offset. Motion never carries essential meaning alone.

### Chips
- **Style:** Compact state tag with a paper-alpha border, muted paper text, and no fill at rest.
- **State:** The active capability chip inverts to vermilion with black text; hover may lift by a small amount and expose the active signal.

### Cards / Containers
- **Corner Style:** Rectangular (`0px`) for process planes, final conversion tile, fields, and reconstruction surfaces.
- **Background:** Black, paper, vermilion, or the small set of alpha-derived surfaces from the palette.
- **Shadow Strategy:** No box shadow; use borders, overlap, clipping, and contrast.
- **Border:** One-pixel editorial hairlines, with vermilion reserved for active rules and intervention edges.
- **Internal Padding:** Dense rows use `24px`–`36px`; major planes use `48px`–`80px` depending on viewport.

### Inputs / Fields
- **Style:** Full-width transparent URL field with a one-pixel black border on the vermilion tile, zero radius, `56px` minimum height, and `16px` horizontal padding (`{components.url-input}`).
- **Focus:** Black border and visible black focus outline with a `4px` offset.
- **Error / Disabled:** Native required URL validation remains available; completed controls reduce opacity and do not invite a second submission.

### Navigation
- **Style:** Fixed, centered, translucent black rectangular rail with a paper-alpha border, compact Geist labels, and a squared vermilion CTA. The mobile disclosure uses a raised black surface, a large link stack, and a full-width vermilion action.
- **States:** Current page and hover use paper; inactive links use muted paper. Focus is always a visible vermilion outline.
- **Mobile treatment:** Collapse links behind a native button with `aria-expanded`, `aria-controls`, `inert`, and `44px` minimum control size.

### Illustrative Reconstruction
- **Style:** A flat old/new comparison stage made from bounding boxes, labels, blocks, clipping, and a visible `Concept minh họa` caption. It explains structural transformation without claiming client evidence.
- **Motion:** The new composition reveals through a mask or comparison state; reduced motion exposes the full static content and explicit controls.

### Signature Editorial Rows
- **Style:** Hairline-separated service, capability, manifesto, vision, and insight rows with oversized labels, supporting copy, and a vermilion active baseline or marker.
- **Behavior:** Keyboard and pointer states expose the same content. Motion expands rules and changes emphasis rather than hiding the row's meaning.

### Named Rules
**The Feedback Must Explain Rule.** Every animation must reveal hierarchy, comparison, progress, or control state; decorative motion alone does not belong.

## Do's and Don'ts

### Do:
- **Do** let one oversized statement establish each major section before supporting copy.
- **Do** use vermilion as a structural cut, active state, or conversion surface—not as ambient decoration.
- **Do** use Roboto Flex width and grade states to make editorial density readable.
- **Do** keep synthetic reconstruction visuals labeled `Concept minh họa` until approved project media exists.
- **Do** preserve visible focus, semantic labels, touch targets, and reduced-motion fallbacks.
- **Do** collapse desktop asymmetry into a direct single-column mobile order below `768px`.

### Don't:
- **Don't** balance the hero into a centered agency template or repeat equal feature-card grids.
- **Don't** introduce extra hues, purple or mesh gradients, ornamental shadows, neon effects, 3D objects, or glossy translucent cards.
- **Don't** invent client logos, testimonials, metrics, project photography, business outcomes, or URL-specific diagnoses.
- **Don't** add motion that hides essential content, depends on raw scroll listeners, or requires a custom cursor.
- **Don't** use decorative numbering, decorative dashes, scroll-cue filler, marquee filler, or fake terminal output.

# Design System: Nét Nút Studio

## Active Direction

**Creative North Star: “The Editorial Reconstruction Instrument.”**

Nét Nút presents an inherited website as material on a worktable: first inspect what exists, then remove friction, reflow meaning, prioritize action, and rebuild a clearer system. The interface is editorial rather than dashboard-like. Ruled fields, hard geometry, dense type, and controlled vermilion intervention create a sense of active thinking without fabricating an audit.

The page must feel direct, specialist, Vietnamese-first, and materially flat. Synthetic visuals are always labeled as illustrative. Semantic HTML, native controls, and readable initial content are the product; motion is progressive enhancement.

## Color Contract

Only three colors are authoritative:

- **Worktable** — `#090909`
- **Paper** — `#EDEDED`
- **Vermilion** — `#FF3300`

Tonal depth may use alpha variations of these colors only. No additional hue, gradient, shadow color, or named material palette is allowed.

### Semantic Vermilion

Vermilion is scarce and meaningful. Use it for intervention, active rules, selected phase state, focused conversion, and the occasional structural cut. Do not use it to fill empty space or decorate every component.

## Typography

- **Body:** Geist Sans through `--font-geist-sans`, with a system sans fallback.
- **Display:** Roboto Flex through `--font-display`, with a system sans fallback.
- **Machine voice:** Geist Mono through `--font-geist-mono`, with a monospace fallback.

Roboto Flex is a variable editorial instrument. Use its `wdth`, `opsz`, and `GRAD` axes to create readable width states rather than scaling an entire headline. The display states are:

- **Readable:** normal width, optical sizing enabled, regular grade.
- **Compression:** narrower width and tighter tracking for dense diagnostic fields.
- **Expansion:** open width and generous measure for a declaration or release.
- **Release:** readable width with lighter grade and more air around the statement.

Headlines remain in the DOM as real text. Width variation must not reduce legibility, cause clipping that hides meaning, or replace responsive type sizing.

## Density Rhythm

The page alternates between compression and release instead of repeating equal cards:

- **Compression:** ruled rows, short labels, dense questions, and tight type.
- **Expansion:** a large phrase, one dominant field, or a stage that occupies the frame.
- **Release:** breathing room, longer measure, and a clear transition toward the next decision.

Use asymmetric twelve-column layouts on desktop within a wide frame. At narrow widths, collapse into a direct single-column order without horizontal overflow. Vertical rhythm should feel intentional: short metadata, medium explanations, and large section transitions.

## Composition Modes

### Compression

A dense editorial field of hairlines, labels, and related questions. Use for diagnosis and capabilities. Avoid equal columns and card grids.

### Expansion

A single idea gains space and typographic scale. Use for the reconstruction stage and major statements. The stage should explain structure, not perform a decorative spectacle.

### Release

After complexity, create room for a studio/process statement or calm insight track. Use fewer competing elements and slower editorial reveals.

## Geometry Rules

- Content surfaces, navigation rails, forms, and conversion planes are rectangular.
- Borders are one-pixel editorial rules using alpha variations of paper.
- Pills are reserved for state-only controls, phase toggles, and compact status labels.
- CTA and navigation actions use squared geometry with clear focus states.
- No ornamental shadows, floating SaaS cards, bento grids, translucent material treatments, neon effects, 3D orbs, or decorative gradients.
- Synthetic old/new compositions use flat blocks, bounding boxes, labels, and explicit “Concept minh họa” language.

## Interaction Grammar

- Every interactive item is a native link, button, input, or semantic control.
- Hover may reveal a general question or typographic state, but information cannot exist only on hover.
- Focus and keyboard activation must expose the same content as pointer interaction.
- Escape closes temporary fields or disclosures where applicable.
- Phase controls, sentinels, and Before/After controls share one reconstruction state.
- Native cursor behavior remains outside the reconstruction stage. A contextual cursor may appear inside the stage only for a fine pointer, and it is never required for operation.

## Motion Families

Use no more than three easing families:

- **Fast:** `160–240ms` for focus, press, color, and small state feedback.
- **Editorial:** `500–900ms` for section reveals, ruled field emphasis, and copy entering.
- **Reconstruction:** `900–1600ms` for the staged explanatory transformation.

Motion should communicate feedback, hierarchy, spatial continuity, explanation, or state. GSAP and ScrollTrigger may progressively enhance the page, with cleanup inside GSAP context. Lenis remains a single smooth-scroll bridge and must respect `prefers-reduced-motion`.

## Reduced Motion and Fallbacks

Reduced-motion users receive native scrolling, visible content, static stage steps, and explicit Before/After toggles. Remove pinning, scrubbing, drag choreography, and contextual cursor behavior while preserving labels and controls. JS failure must leave headings, form labels, copy, and actions readable in semantic HTML.

## Truth Boundary

Illustrative visual material must be labeled. The interface may parse and display a normalized domain locally, but it must never fetch, persist, transmit, score, measure, audit, or make a URL-specific claim. Do not use fake loading, fake terminal output, fake metrics, client logos, testimonials, or result language.

## Anti-patterns

Never ship:

- Superseded palette names or any historical color direction.
- Backdrop-heavy scrolling surfaces, pill navigation, or rounded CTA geometry.
- Generic agency process cards, equal three-column grids, floating SaaS cards, bento layouts, neon, mesh gradients, 3D orbs, or marquee filler.
- Scrambled blocking text, fake terminal screens, fake scores, fake metrics, fabricated client proof, or URL-specific diagnosis.
- A custom cursor outside the stage, a raw scroll listener, React per-frame scroll state, or motion that hides the semantic fallback.
- Decorative numbering, decorative dashes, scroll-cue filler, or a CTA delayed behind choreography.

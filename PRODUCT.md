# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, Tailwind CSS v4, TypeScript, GSAP, Lenis React integration, and Next.js 16. The maintained `lenis/react` export is used for the existing React 19 setup.

## Users

Nét Nút is for Vietnamese small and mid-sized businesses, commonly teams of roughly 20–100 people, whose company has outgrown its current website. The primary reader is a founder, owner, marketing lead, or another decision maker evaluating whether a redesign is worth the attention and budget.

## Product Purpose

This website is an interactive editorial instrument for starting a truthful redesign conversation. It helps a visitor recognize where an inherited website may be creating friction, see how Nét Nút thinks through reconstruction, and prepare a brief without pretending to run an audit.

## Commercial Context

Budgets vary from below 50 million to approximately 150 million VNĐ depending on scope, content, design system, implementation, and motion needs. The central tension is not “new versus old”: a mature company needs to preserve accumulated brand equity while removing the legacy friction that keeps its website behind the business.

The experience supports three conversion levels:

1. **Recognition** — understand that an old website can misrepresent a current business.
2. **Inspection** — explore the illustrative diagnosis and reconstruction model.
3. **Conversation** — share a website address locally in the browser as preparation for a future brief.

## Positioning

Nét Nút is a small Vietnamese studio focused on direct website redesign work. It works close to the problem, keeps useful history, removes unnecessary friction, and makes a clearer system for the company that exists today.

## Operating Context

Visitors often arrive between work tasks and scan on a laptop or phone. Desktop is the art-direction target: the page may use density, ruled fields, variable display type, and a staged reconstruction sequence. Mobile must have no regression: the same meaning, controls, form flow, and anchors remain available in a direct vertical reading order at narrow widths.

## Capabilities and Constraints

The product is a browser-only landing experience with public routes `/` and `/about`, and compatible anchors `#services`, `#work`, `#capabilities`, `#process`, `#insights`, and `#contact`. URL parsing is local and pure. The URL is never fetched, transmitted, persisted, scored, analyzed, or sent to a backend. There is no analytics, fake loading, fake metric, testimonial, client proof, audit claim, or URL-specific diagnosis.

Synthetic interface compositions and hypothetical examples are allowed only when explicitly labeled as illustrative. The semantic HTML must stand on its own before motion enhancement; GSAP and Lenis support hierarchy and comprehension without hiding essential content. Raw scroll listeners and React state that updates every frame are out of scope.

## Brand Commitments

Nét Nút Studio is the product name. Visible copy is Vietnamese-first, direct, and specialist. The active palette is `#090909`, `#EDEDED`, and `#FF3300`; only alpha variations of those colors may create tonal depth. Vermilion is reserved for intervention, active state, and conversion. Navigation and CTA geometry are squared; pills are state-only controls or compact status indicators.

## Product Principles

- Show useful truth before decoration.
- Start with the website the business already has.
- Preserve equity while removing legacy friction.
- Make the reconstruction method inspectable without claiming a result.
- Use motion to reveal structure, hierarchy, comparison, or state.
- Keep every essential message and action available without motion.
- Never invent client proof, business outcomes, or analysis data.

## Accessibility & Inclusion

Use semantic landmarks, visible keyboard focus, descriptive labels, live validation messages, touch targets of at least 44px, logical focus order, and reduced-motion fallbacks. Native cursor behavior remains unchanged outside the reconstruction stage. The stage-only contextual cursor is an enhancement for fine pointers and is never required to understand or operate the experience.

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, Tailwind CSS v4, TypeScript, GSAP, Lenis React integration, and Next.js 16. The originally requested `@studio-freight/react-lenis` package is deprecated and incompatible with React 19, so the maintained `lenis/react` export is used instead.

## Users

Primary users are Vietnamese business owners whose company has outgrown its current website. They need a clear assessment of what to change before committing to a redesign.

## Product Purpose

Nét Nút Studio helps businesses redesign outdated corporate websites. This landing page should make the studio's point of view understandable within seconds and move qualified visitors toward submitting their current website link for analysis.

## Positioning

Nét Nút focuses on direct, specialist website redesign work for Vietnamese businesses. It keeps the useful value in an existing brand while removing outdated structure, friction, and visual noise.

## Operating Context

Visitors arrive from business and professional contexts, often reviewing the page on a laptop or phone between work tasks. They scan quickly, need to understand the studio's process and capabilities, and should be able to submit a website URL without a backend in this first version.

## Capabilities and Constraints

The landing page is a single scrolling surface with navigation, hero, services, selected work, capabilities, process and studio introduction, insights, and a final website analysis form. The form is a frontend-only simulation for now. Motion must support understanding, hierarchy, and feedback, honor reduced motion, and avoid raw scroll event listeners. Responsive behavior must work below 768px. No real case study assets are available yet, so synthetic visuals must be clearly replaceable and must not imply factual client results.

## Brand Commitments

Nét Nút Studio is the product name. The provided Vietnamese copy is the source of truth for visible content. The requested visual direction is premium editorial with oversized technical sans typography, a near-black background `#090909`, off-white text `#EDEDED`, and one vermilion accent `#FF3300`. The page must avoid decorative dashes, meaningless numbering, scroll cue text, equal three-column cards, purple gradients, and mesh gradients.

## Evidence on Hand

The repository contains only the default Next.js starter surface. No real project images, case study media, customer logos, testimonials, or performance claims are available. Selected work visuals are illustrative placeholders and must be replaced with approved project assets before production launch.

## Product Principles

- Show useful truth before decoration.
- Make the existing website the starting point for the conversation.
- Keep the experience direct, focused, and easy to scan.
- Use motion to reveal structure and reinforce action.
- Never invent client proof or business results.

## Accessibility & Inclusion

Use semantic landmarks, visible keyboard focus, descriptive labels, sufficient contrast, touch-friendly targets, and reduced-motion fallbacks. Keep all essential information available without animation.

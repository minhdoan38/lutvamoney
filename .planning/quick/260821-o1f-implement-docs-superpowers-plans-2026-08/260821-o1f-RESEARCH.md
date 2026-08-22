# Interactive Editorial Reconstruction — Research

**Researched:** 2026-08-21  
**Domain:** Next.js 16.3 App Router, React client state, GSAP/ScrollTrigger, Lenis, accessible editorial interactions  
**Confidence:** HIGH for repository boundaries and installed APIs; MEDIUM for browser/framework behavior cited from current official documentation

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

## Implementation Decisions

### Scope
- Follow the referenced plan as source of truth, including the locked contracts and public anchor compatibility.
- Keep desktop as art-direction target and preserve mobile usability at 390px.

### Truth boundary
- All URL handling stays browser-only. No fetch, persistence, analytics, fake loading, fake metrics, score, client proof, testimonial, or result claim.
- Synthetic reconstruction visuals must be explicitly labeled as illustrative.

### Existing baseline
- Retain current user changes in navigation, cursor, spacing, selected-work, `next.config.ts`, skills, and unrelated files. Do not reset or overwrite them.

### Visual direction
- Use the plan's compact palette: `#090909`, `#EDEDED`, `#FF3300`, with tonal alpha variations only. Replace superseded champagne direction.

### Verification
- Full GSD pipeline enabled: focused research, plan checking, lint/build, diff checks, bounded UI review, and post-execution verification.

### Claude's Discretion
- Exact component decomposition, state implementation details, and minimal CSS/token naming where the plan does not prescribe a literal API.

### Deferred Ideas (OUT OF SCOPE)
None listed in CONTEXT.md.
</user_constraints>

## Summary

The plan fits the existing app without a new runtime dependency or backend. The current implementation is already a client-heavy editorial surface: the route pages are server components that compose client sections; GSAP `useGSAP`/`ScrollTrigger` drives most motion; and `SmoothScroll` already synchronizes `lenis/react` with the GSAP ticker. [VERIFIED: `src/app/page.tsx:1-35`; `src/app/about/page.tsx:1-45`; `src/components/smooth-scroll.tsx:1-53`; `package.json:11-31`]

The main implementation risk is coordination, not library choice. Build the pure URL parser and homepage-only context first, then make navigation and the Hero/Final CTA consume that single subject. Build the Reconstruction Stage around one phase model and one `activePhase` state path, with desktop scroll choreography progressively enhanced over a readable static/mobile fallback. Remove route-transition and global cursor behavior only after import and CSS scans; otherwise stale overlays or `cursor:none` rules can survive the component deletion. [VERIFIED: plan:23-53, 71-84, 86-100, 115-131; `src/app/layout.tsx:1-37`; `src/app/globals.css:44-80, 90-271, 312-421`]

**Primary recommendation:** Preserve the current GSAP/Lenis stack, centralize browser-only state and phase data in small pure modules, and treat all motion as an enhancement around semantic HTML, native focus, and mobile/reduced-motion fallbacks.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|---|---|---|---|
| URL normalization and validation | Browser / Client | — | The locked contract forbids network, persistence, and external transmission; keep the parser pure and context state in the homepage client boundary. [VERIFIED: plan:23-53] |
| Subject sharing between Hero, Stage, and Final CTA | Browser / Client | Frontend Server | A homepage-only provider owns the subject; server route composition remains static and passes children into the provider. [VERIFIED: plan:51-53, 86-94] |
| Section-aware navigation | Browser / Client | Frontend Server | `IntersectionObserver` can derive the visible section from existing anchors without a scroll event loop; route links still belong to App Router. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API; VERIFIED: plan:95-100] |
| Reconstruction phase progression | Browser / Client | — | Scroll sentinels, controls, keyboard input, and compare progress must converge on one client state/model; visuals are synthetic DOM/CSS. [VERIFIED: plan:115-131] |
| Scroll choreography | Browser / Client | — | Lenis and GSAP run only in client components; `ScrollTrigger` must be scoped and cleaned up per component. [VERIFIED: `src/components/smooth-scroll.tsx:1-53`; CITED: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/] |
| Route rendering and metadata | Frontend Server | Browser / Client | `page.tsx` and About page currently compose section components and metadata; keep route structure and public anchors unchanged. [VERIFIED: `src/app/page.tsx:1-35`; `src/app/about/page.tsx:1-45`] |

## Standard Stack

### Core

| Library | Installed contract | Purpose | Guidance |
|---|---|---|---|
| Next.js | `"next": "16.3.0"` | App Router, server/client boundaries, route links | Use `next/navigation` only in Client Components; prefer `Link` for normal navigation. Next 16 preserves scroll position by default in several navigation cases and supports `scroll: false`; do not assume old transition/scroll behavior. [VERIFIED: `package.json:11-21`; CITED: https://nextjs.org/docs/app/api-reference/components/link; CITED: https://nextjs.org/docs/app/api-reference/functions/use-router] |
| React | `"react": "19.2.8"` | Context, client state, semantic controls | Keep the homepage provider below the route server boundary; do not lift browser state into the root layout. [VERIFIED: `package.json:17-20`; VERIFIED: plan:51-53] |
| GSAP + `@gsap/react` | `"gsap": "^3.15.0"`, `"@gsap/react": "^2.1.2"` | ScrollTrigger, SplitText, scoped cleanup, timeline choreography | Reuse `useGSAP`; use `gsap.matchMedia()` for desktop/mobile/reduced-motion branches. [VERIFIED: `package.json:11-16`; CITED: https://github.com/greensock/react; CITED: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/] |
| Lenis | `"lenis": "^1.3.26"` | Native-scroll-preserving smooth scroll | Keep `ReactLenis root` with `options.autoRaf: false`, drive `raf()` from the GSAP ticker, and update ScrollTrigger from Lenis scroll callbacks. [VERIFIED: `package.json:14-18`; `src/components/smooth-scroll.tsx:11-22, 40-53`; CITED: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md] |
| `next/font` | Existing `Geist`, add locked `Roboto_Flex` | Display/body font loading | Follow the plan’s exact axes/subsets and expose one display CSS variable; verify line reflow before any SplitText choreography. [VERIFIED: `src/app/layout.tsx:3-16`; plan:71-79] |

### Supporting browser APIs

- `URL` constructor: use it for parsing instead of regex URL reconstruction; it throws for invalid URLs and exposes `protocol`, `hostname`, `username`, and `password`. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL]
- `IntersectionObserver`: observe existing section anchors with a single observer and select one active section from the callback data; disconnect on unmount. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API]
- `matchMedia("(prefers-reduced-motion: reduce)")`: use both CSS and JS branches; reduced motion should replace movement/pinning, not hide content. [CITED: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion]

**No installation is planned.** The plan explicitly forbids new runtime/dev dependencies and the current package manifest already contains the required stack. [VERIFIED: plan:177-184; `package.json:11-31`]

## Package Legitimacy Audit

No package should be installed for this quick-task implementation. Existing registry checks found `gsap` and `@gsap/react` clean; the legitimacy seam flagged the currently pinned `next` and `lenis` releases as `SUS` only because they are recent, not because they lack a repository or have a postinstall script. Keep the existing lockfile and do not upgrade or replace them during this phase. [VERIFIED: npm registry lookup and package-legitimacy check, 2026-08-21; `package-lock.json:10-31`]

| Existing package | Registry result | Action |
|---|---|---|
| `next@16.3.0` | `SUS` — too new in the seam; official repository present; no postinstall | Keep because it is locked by the task; do not add/upgrade. |
| `gsap@3.15.0` | `OK` | Keep and reuse. |
| `lenis@1.3.26` | `SUS` — too new in the seam; official repository present; no postinstall | Keep because it is already the selected stack; verify behavior against the current types/docs. |
| `@gsap/react@2.1.2` | `OK` | Keep and reuse. |

## Current Component Boundaries

- `src/app/page.tsx` currently composes `SiteNav`, `Hero`, `Services`, `SelectedWork`, `Capabilities`, `ProcessAbout`, `Insights`, and `FinalCTA`; use the plan’s rename/replacement sequence rather than rebuilding the route wholesale. [VERIFIED: `src/app/page.tsx:1-35`]
- `src/app/about/page.tsx` composes six existing About sections and passes About-specific nav props; About should remain an independent static route without the homepage subject provider. [VERIFIED: `src/app/about/page.tsx:1-45`; plan:51-53, 148-160]
- `SiteNav` is already a Client Component with `usePathname`, desktop/mobile variants, anchor rewriting for `/about`, an `inert` mobile disclosure, and 44px-ish mobile controls. It currently uses a translucent pill shell and global cursor data attributes, so the planned rail geometry and cursor removal are a focused refactor, not a new navigation system. [VERIFIED: `src/components/site-nav.tsx:1-12, 82-204`]
- `SmoothScroll` is the shared root-level motion boundary. Its current GSAP ticker bridge matches Lenis’s documented integration: `autoRaf: false`, `lenis.raf(time * 1000)`, `ScrollTrigger.update()`, ticker removal on cleanup, and `lagSmoothing(0)`. Preserve that shape; add the clamped velocity CSS variable without React state per frame. [VERIFIED: `src/components/smooth-scroll.tsx:11-22, 40-53`; CITED: https://github.com/darkroomengineering/lenis/blob/main/README.md]
- Existing sections use `useGSAP`, `ScrollTrigger`, `SplitText`, and manual pointer handlers. Several handlers call GSAP after setup (for example capability magnetism); future event-driven animations must use `contextSafe()` or direct CSS so unmount/route changes cannot leave tweens behind. [VERIFIED: `src/components/sections/capabilities.tsx:45-69`; CITED: https://github.com/greensock/react]
- About `DictionarySection`, `ManifestoSection`, and `VisionSection` currently create desktop pins. The plan allows only Dictionary to remain sticky, so removing or simplifying Manifesto/Vision pin setup is required; copy changes alone will not satisfy that constraint. [VERIFIED: `src/components/about/dictionary-section.tsx:13-72`; `src/components/about/manifesto-section.tsx:90-107`; `src/components/about/vision-section.tsx:98-115`; plan:148-158]

## Architecture Patterns

### 1. Pure URL parser plus homepage-only context

Implement `parseWebsiteInput(rawInput)` as a pure function returning exactly the locked `WebsiteParseResult`. Normalize input in this order:

1. Trim whitespace; return `"empty"` for an empty string.
2. Add `https://` only when no scheme is present.
3. Construct `new URL(candidate)`; return `"invalid"` on failure.
4. Accept only `http:` or `https:`; return `"unsupported-protocol"` otherwise.
5. Reject empty hostname and any `username`/`password` credentials.
6. Preserve the URL object’s normalized `.href` for the input/subject, and derive display hostname as lowercase `hostname` with one leading `www.` removed.

The parser must not call `fetch`, touch storage, read analytics state, or use DOM APIs. The context should expose `subject`, `submitWebsite(rawInput)`, and `clearWebsite`; submit updates one subject, while invalid input leaves the existing subject unchanged and returns an error to the form. Render the subject only as escaped text such as `INSPECTING: domain`; never interpolate it into HTML. [VERIFIED: plan:23-53; CITED: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL]

### 2. Section-aware nav with an observer, not a scroll loop

Keep the public anchors `#services`, `#work`, `#capabilities`, `#process`, `#insights`, and `#contact`. Create one observer for those elements, use a viewport-centered `rootMargin`, and update state only when the selected section label changes. Because callbacks can contain multiple intersecting entries, do not blindly use the last callback entry; choose the strongest/closest candidate from current visibility records. Disconnect on cleanup. Add `scroll-margin-top` to anchor targets to account for the fixed rail.

Use a static `/ STUDIO` context on About. For cross-route links, keep `/#contact` and `/#services` forms intact and let App Router handle route navigation; Next 16’s default scroll behavior differs from older versions, so use `scroll={false}` only when deliberately handing scrolling to Lenis/native code. [VERIFIED: plan:95-100, 148-160; CITED: https://nextjs.org/docs/app/api-reference/components/link; CITED: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API]

### 3. Five-phase Reconstruction Stage

Create a pure model with the fixed order and labels: `Inspect → Remove → Reflow → Prioritize → Rebuild` / `Nhìn → Gỡ → Xếp lại → Ưu tiên → Dựng`. Each phase should define copy and visual parameters; it should not derive claims from the URL. A single `activePhase` setter is shared by sentinel callbacks, phase buttons, and ArrowLeft/ArrowRight. Use desktop-only `gsap.matchMedia()` for the sticky/scrub setup and render the same phase list as ordinary flow on mobile/reduced motion. [VERIFIED: plan:43-49, 115-131]

Keep the stage’s visual art synthetic and `aria-hidden`; keep its phase labels, controls, explanatory copy, and `Concept minh họa` label semantic and present without JS motion. The domain is a label only: `INSPECTING: domain` or `DEMO SITE`; do not generate score, audit, metric, or domain-specific diagnosis. [VERIFIED: plan:121-129]

For compare interaction, use one `--compare-progress` value to drive density, hierarchy, CTA size, and column geometry in the same synthetic scene. Update the CSS variable directly during pointer movement to avoid a React render per frame; commit the logical value on release and use Before/After buttons plus an accessible range/keyboard path for `0` and `1`. On pointer drag, use pointer capture, `touch-action: none`, bounds clamping, and `pointercancel`/`lostpointercapture` cleanup. Do not build a traditional overlaid-image wipe slider. [VERIFIED: plan:123-129]

### 4. GSAP/Lenis lifecycle

Use `useGSAP({ scope })` for setup. Use `gsap.matchMedia()` for `(min-width: 768px)`, `(max-width: 767px)`, and reduced-motion conditions so ScrollTriggers are reverted when conditions change. Revert `SplitText` instances. Any GSAP tween created from a later event handler must be wrapped in `contextSafe()` or explicitly killed; remove all manually attached listeners in cleanup. [CITED: https://github.com/greensock/react; CITED: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/; VERIFIED: `src/components/about/manifesto-section.tsx:48-107`]

Keep Lenis’s one animation loop. If exposing velocity, write a clamped CSS custom property from the Lenis callback or ticker path; do not put velocity in React state and do not add a raw `scroll` listener. If reduced motion is enabled, disable Lenis smoothing and stage pin/scrub/drag behavior while preserving native scrolling and all content. [VERIFIED: plan:71-83, 128-129; `src/components/smooth-scroll.tsx:11-53`; CITED: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md]

### 5. Progressive enhancement and deletion

Headline, CTA, form labels, phase controls, and key copy must exist in the initial HTML. SplitText/GSAP may enhance them after hydration but must never be the only source of readable content. The current code frequently passes `aria: "hidden"` to SplitText, so audit the generated accessibility tree and retain an equivalent semantic fallback. [VERIFIED: `src/components/sections/hero.tsx:20-33`; `src/components/about/hero-about.tsx:20-32`; `src/components/scroll-text.tsx:38-50`; plan:75-83]

After removing `AboutRouteTransition`, delete its layout import/render and the associated route-transition CSS. Then scan for stale `.page-loader`, `.route-transition`, `.custom-cursor-layer`, `.has-custom-cursor`, `data-cursor`, and cursor-follower imports. The current transition is mounted from the root layout and the current cursor CSS globally sets `cursor: none` when a class is present, so leaving CSS behind can violate the native-cursor requirement even if the component is deleted. [VERIFIED: `src/app/layout.tsx:3-35`; `src/components/about-route-transition.tsx:22-173`; `src/app/globals.css:44-80, 90-271, 312-421`; `src/components/CustomCursor.tsx:110-410`; plan:81, 126-129]

## Don't Hand-Roll

| Problem | Do not build | Use instead |
|---|---|---|
| URL syntax and protocol parsing | Regex-only parser or fetch-based validation | Native `URL`, explicit protocol/credential/hostname checks, pure return union. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL] |
| Section visibility | Raw `scroll` listener with per-frame React state | One `IntersectionObserver` plus a stable active-section selection rule. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API] |
| GSAP React cleanup | Global selectors, ad hoc `useEffect` cleanup, untracked event tweens | `useGSAP` scope, `gsap.matchMedia`, `contextSafe`, and SplitText revert. [CITED: https://github.com/greensock/react] |
| Smooth-scroll synchronization | A second RAF loop or React velocity state | Existing `ReactLenis` + GSAP ticker bridge. [VERIFIED: `src/components/smooth-scroll.tsx:11-22`; CITED: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md] |
| Accessible phase/compare controls | Hover-only visual state or a pointer-only drag surface | Native buttons, `aria-pressed`/`aria-current`, ArrowLeft/ArrowRight, and an accessible 0–100 compare control. [VERIFIED: plan:121-129; CITED: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion] |
| Global custom cursor | A replacement cursor around the whole document | Native cursor everywhere plus a stage-scoped fine-pointer contextual affordance. [VERIFIED: plan:126-129; `src/app/globals.css:312-421`] |

## Common Pitfalls

1. **Parser/UI contract drift.** Native `type="url"` validation is not the locked parser contract. Always route submit through `parseWebsiteInput`, keep the raw input in the field, preserve normalized `.href` in the subject, and show hostname separately. [VERIFIED: plan:23-53; `src/components/sections/final-cta.tsx:69-92`]
2. **State split between Hero and CTA.** The current Final CTA has local `status`, `submittedUrl`, and fake analysis output. Replace it with the shared subject/context; otherwise Hero submit, stage label, CTA prefill, and reset will disagree. [VERIFIED: `src/components/sections/final-cta.tsx:12-49, 96-121`; plan:141-146]
3. **IntersectionObserver flicker.** Several sections may intersect at once, especially with a fixed header and smooth scrolling. Keep a visibility map and select one candidate; do not set the active label directly from arbitrary callback order. [CITED: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API]
4. **Lenis/Next anchor conflict.** Lenis has anchor behavior options and Next 16 has its own route scroll behavior. Choose one owner per action: native/Lenis scroll for same-page anchors, App Router for route changes, and explicit `scroll` options where necessary. [CITED: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md; CITED: https://nextjs.org/docs/app/api-reference/components/link]
5. **GSAP lifecycle leaks.** `gsap.to()` inside pointer/click handlers is created after the main `useGSAP` callback. Use `contextSafe()` or CSS transitions, and kill/revert on unmount. [VERIFIED: `src/components/sections/capabilities.tsx:45-69`; CITED: https://github.com/greensock/react]
6. **SplitText line reflow.** Roboto Flex axes, viewport changes, and font loading can change line breaks after the first split. Use SplitText’s current re-splitting pattern or avoid splitting critical controls; never leave a stale split after resize. [CITED: https://gsap.com/docs/v3/Plugins/SplitText/]
7. **Reduced motion checked only once.** Existing components often branch on `matchMedia` once during setup. Use `gsap.matchMedia()` or a media-query listener for live changes, and make the no-motion path render all five phases and compare controls without pin/scrub/drag. [VERIFIED: `src/components/sections/selected-work.tsx:53-69`; plan:128-129; CITED: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/]
8. **Mobile desktop scene leakage.** Do not merely scale the sticky stage down. At 390px render the phase flow in normal document order, keep toggle/keyboard controls usable, gate contextual cursor behind fine pointer, and avoid hover-only information. [VERIFIED: plan:126-131; `src/components/sections/selected-work.tsx:127-161`]
9. **Stale overlay/cursor rules.** Removing the React component without removing global CSS leaves loader/transition/cursor contracts active or misleading. Perform a final negative scan and confirm no root overlay, `cursor:none`, or obsolete data attributes remain. [VERIFIED: `src/app/globals.css:44-80, 90-271, 312-421`; plan:81, 127]
10. **Truth-boundary regression.** Do not reuse the current “Mẫu phân tích đã sẵn sàng” state, three fake observations, or URL-specific synthetic claims. The only domain-specific output allowed is the normalized domain label and truthful client-side brief preparation confirmation. [VERIFIED: `src/components/sections/final-cta.tsx:92-121`; plan:13-21, 121-129, 141-146]

## Recommended Implementation Order

1. Preserve the dirty baseline and inspect the unusual untracked/modified navigation, cursor, spacing, and documentation files; do not reset or checkout. [VERIFIED: CONTEXT.md:24-26; plan:57-69]
2. Replace `PRODUCT.md`/`DESIGN.md` direction and establish motion/font tokens before visual rewrites, while removing route-transition/page-loader CSS only after import scans. [VERIFIED: plan:57-84]
3. Add `website-url.ts` and `home-experience-provider.tsx`; migrate Hero and Final CTA to the same parser/context before adding stage output. [VERIFIED: plan:86-100, 133-146]
4. Refactor `SiteNav` into the rectangular rail and add observer-based context labels; verify same-page and cross-route hash behavior under Next 16. [VERIFIED: plan:95-100; CITED: https://nextjs.org/docs/app/api-reference/components/link]
5. Replace Services/Capabilities and then build the Reconstruction Stage model, sentinel choreography, compare control, local contextual cursor, reduced-motion branch, and mobile flow. [VERIFIED: plan:102-131]
6. Simplify About’s competing Manifesto/Vision/Outro motion, keeping Dictionary as the one sticky scene; preserve readable copy before choreography. [VERIFIED: plan:148-160; `src/components/about/manifesto-section.tsx:22-107`; `src/components/about/vision-section.tsx:19-115`]
7. Run the required lint/build/diff checks and manual route/anchor/keyboard/reduced-motion/mobile QA; no Playwright or test dependency is required by the plan. [VERIFIED: plan:162-175; `package.json:5-9`]

## Validation Architecture

This is a manual-validation phase by decision; no test framework or new test dependency is requested. [VERIFIED: plan:162-175]

| Area | Quick validation |
|---|---|
| Type/lint/build | `npm run lint`; `npm run build`; `git diff --check` |
| URL contract | In Hero and CTA try empty, whitespace, `abc.vn`, uppercase host, `www.abc.vn`, `ftp://`, credentials, malformed host, and back/forward navigation. Confirm no request/storage/network activity. |
| Shared state | Submit once in Hero; confirm Stage label and CTA prefill; reset in CTA; confirm every surface clears. |
| Section nav | Scroll forward/backward through all six public anchors; verify one active context label and no flicker; test `/about` → `/#contact`. |
| Stage | Test scroll forward/backward, phase buttons, ArrowLeft/ArrowRight, Before/After, pointer drag, pointer cancel, and focus traversal. |
| Accessibility | Keyboard-only through skip link, nav, forms, diagnosis, capability field, phase controls, compare control, and CTA; confirm focus is visible and no essential content is hover-only. |
| Reduced motion/mobile | Emulate reduced motion and 390×844; verify no pin/scrub/custom cursor, no horizontal overflow, normal phase flow, working menu/toggle/forms, and readable HTML. |
| Negative scan | Confirm no `AboutRouteTransition` import, `.route-transition`, `.page-loader`, `.custom-cursor-layer`, global `cursor:none`, fake analysis/status copy, raw scroll listener, or React render per scroll frame. |

## Environment Availability

| Dependency | Available | Version | Fallback/impact |
|---|---:|---:|---|
| Node.js | Yes | `v26.7.0` | Next package declares Node `>=20.9.0`; current runtime satisfies it. [VERIFIED: `node_modules/next/package.json:136-138`; npm CLI probe 2026-08-21] |
| npm | Yes | `12.0.2` | Required scripts and registry checks are available. [VERIFIED: npm CLI probe 2026-08-21] |
| Next.js | Yes | `16.3.0` | Use installed/current official docs; do not rely on pre-16 scroll assumptions. [VERIFIED: `node_modules/next/package.json:1-10`; `package.json:18-19`] |
| GSAP / `@gsap/react` | Yes | `3.15.0` / `2.1.2` | Existing source already registers and uses both. [VERIFIED: `package.json:11-16`; `src/components/smooth-scroll.tsx:6-9`] |
| Lenis | Yes | `1.3.26` | Existing `lenis/react` export is available in installed types. [VERIFIED: `node_modules/lenis/dist/lenis-react.d.ts:1-108`; `src/components/smooth-scroll.tsx:5`] |

## Security Domain

No backend, API, persistence, analytics, or lead submission is in scope. The relevant security boundary is untrusted user-entered URL text rendered in the browser. [VERIFIED: CONTEXT.md:20-22; plan:177-184]

| ASVS category | Applies | Control for this phase |
|---|---:|---|
| V2 Authentication | No | No accounts or authenticated routes. |
| V3 Session Management | No | No sessions or cookies are introduced. |
| V4 Access Control | No | Public brochure route only. |
| V5 Input Validation | Yes | Pure parser: trim, explicit scheme insertion, `URL` construction, `http`/`https` allowlist, reject credentials/empty hostname, escaped React text. [VERIFIED: plan:23-53; CITED: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL] |
| V6 Cryptography | No | No secrets, tokens, or cryptographic operation. |

## Assumptions Log

| # | Claim | Risk if wrong |
|---|---|---|
| A1 | Same-page anchor scrolling should be owned by the existing Lenis/native scroll path while route changes remain App Router navigation. [ASSUMED] | Hash navigation could double-scroll or land under the fixed rail; verify in browser before finalizing. |
| A2 | A centered `IntersectionObserver` root margin is the best active-section heuristic for this composition. [ASSUMED] | Labels could flicker at section boundaries; tune against the two desktop viewports in QA. |
| A3 | A visually hidden/native range control is acceptable as the accessible semantic backing for compare drag. [ASSUMED] | The visual interaction could diverge from keyboard state; confirm the control contract during implementation. |

## Open Questions

1. **How should the active section be selected when two large sections intersect at once?**
   - Recommendation: maintain current intersection records and choose the element nearest the viewport’s visual center, with a stable tie-breaker by document order; tune root margin during desktop QA. [ASSUMED]
2. **Should critical SplitText animations use `autoSplit`/`onSplit` or remain unsplit?**
   - Recommendation: keep initial HTML readable and use current GSAP re-splitting guidance for decorative headings; do not split controls, labels, error text, or the phase model. [CITED: https://gsap.com/docs/v3/Plugins/SplitText/]
3. **Does the existing dirty working tree contain an intentional cursor implementation that must be retained only inside the stage?**
   - Recommendation: preserve files as baseline until the stage-local cursor is implemented, then delete only after `rg` confirms no imports and native cursor behavior passes. [VERIFIED: CONTEXT.md:24-26; plan:115-129]

## Sources

### Primary / installed source

- `docs/superpowers/plans/2026-08-21-interactive-editorial-reconstruction.md` — locked contracts, phase order, component tasks, truth boundary, validation. [VERIFIED: plan:23-185]
- `.planning/quick/260821-o1f-implement-docs-superpowers-plans-2026-08/260821-o1f-CONTEXT.md` — scope, locked decisions, baseline preservation. [VERIFIED: CONTEXT.md:6-54]
- `PRODUCT.md` — current product, stack, users, accessibility, no-backend constraints. [VERIFIED: PRODUCT.md:5-52]
- `DESIGN.md` — current palette, layout, motion, geometry, and anti-patterns. [VERIFIED: DESIGN.md:1-244]
- `AGENTS.md` — Next.js 16.3 guidance requiring current installed/official docs. [VERIFIED: AGENTS.md:1-9]
- Installed package metadata and types: `package.json`, `node_modules/next/package.json`, `node_modules/lenis/dist/lenis-react.d.ts`, `node_modules/@gsap/react/README.md`. [VERIFIED: files read 2026-08-21]

### Current official documentation

- Next.js Link API: https://nextjs.org/docs/app/api-reference/components/link [CITED]
- Next.js `useRouter`: https://nextjs.org/docs/app/api-reference/functions/use-router [CITED]
- Next.js 16 upgrade guidance: https://rc.nextjs.org/docs/app/guides/upgrading/version-16 [CITED]
- GSAP `matchMedia`: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/ [CITED]
- GSAP SplitText: https://gsap.com/docs/v3/Plugins/SplitText/ [CITED]
- GSAP React: https://github.com/greensock/react [CITED]
- Lenis React: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md [CITED]
- Lenis GSAP integration: https://github.com/darkroomengineering/lenis/blob/main/README.md [CITED]
- MDN URL constructor: https://developer.mozilla.org/en-US/docs/Web/API/URL/URL [CITED]
- MDN IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API [CITED]
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion [CITED]

## Metadata

**Confidence breakdown:**
- Repository boundaries: HIGH — source files and locked plan/context were read directly.
- Installed stack: HIGH — versions and Lenis/GSAP APIs were checked in the workspace and against registry/official documentation.
- Next.js 16 navigation behavior: MEDIUM/HIGH — current official Next documentation was checked, but the installed `next/dist/docs/` directory requested by `AGENTS.md` was not present in this checkout.
- Interaction pitfalls: MEDIUM — grounded in current source patterns plus official GSAP/Lenis/MDN guidance; final feel and breakpoint tuning require browser QA.

**Research date:** 2026-08-21  
**Valid until:** 2026-09-04 for this fast-moving framework/library stack

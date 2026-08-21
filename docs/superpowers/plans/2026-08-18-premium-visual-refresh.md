> **Superseded:** This Obsidian + Champagne direction is historical. Use `docs/superpowers/plans/2026-08-21-interactive-editorial-reconstruction.md` as the active source plan.

# Premium Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the home and About routes to the approved Obsidian + Champagne + Vermilion visual system without changing content, behavior, structure, or existing motion.

**Architecture:** Keep the current Next.js component tree and all client behavior intact. Add semantic premium-material tokens and reusable presentation classes in `globals.css`, then change only static Tailwind presentation classes in existing components. A repository-local contract script protects required animation, state, route, anchor, and accessibility signatures throughout the work.

**Tech Stack:** Next.js 16.3 App Router, React 19.2, TypeScript, Tailwind CSS v4, GSAP 3.15, `@gsap/react`, Lenis, Node.js contract verification.

**Spec:** `docs/superpowers/specs/2026-08-18-premium-visual-refresh-design.md`

## Global Constraints

- Keep all existing copy, metadata, URLs, routes, anchor IDs, navigation labels, section order, form field order, and component data arrays unchanged.
- Do not add a backend, analytics integration, UI dependency, image dependency, or runtime font request.
- Do not change any GSAP timing, easing, trigger, sequence, transform, mask, hover motion, loading animation, event handler, state transition, or reduced-motion behavior.
- Preserve the complete "Cách chúng tôi soi" pointer mask, lens, mobile old/new toggle, ArrowLeft/ArrowRight behavior, `clip-path` transition, and reduced-motion fallback.
- Use one dark theme with Obsidian `#08090A`, Porcelain `#F1EEE8`, Champagne `#D3B17A`, and Vermilion `#F0441D`.
- Use glass only on navigation and existing floating controls; large scrolling surfaces must not use backdrop blur.
- Keep body text at WCAG AA contrast, maintain visible focus, semantic landmarks, keyboard interaction, `aria-*`, `inert`, and touch target sizes.
- Keep the existing untracked `log.md` untouched.

## File Map

- `scripts/verify-ui-contract.mjs`: Static behavior and visual-token contract used before and after each task.
- `src/app/globals.css`: Semantic palette, page material, reusable surface, border, CTA, form, and reduced-transparency treatments.
- `src/app/layout.tsx`: Existing `next/font` setup remains unchanged; only add a non-interactive page material layer if CSS pseudo-elements cannot cover the desired grain.
- `src/components/site-nav.tsx`: Smoked-glass navigation styling, with menu logic and transitions unchanged.
- `src/components/sections/hero.tsx`: Hero signal plane, CTA, type weight, and static spacing treatment.
- `src/components/sections/services.tsx`: Champagne dividers and refined static typography.
- `src/components/sections/selected-work.tsx`: Premium frame and old/new visual palette; all pointer, keyboard, state, and GSAP code unchanged.
- `src/components/sections/capabilities.tsx`: Graphite/champagne chips while preserving magnetism.
- `src/components/sections/process-about.tsx`: Refined material slabs while preserving SplitText and GSAP reveals.
- `src/components/sections/insights.tsx`: Champagne row system and hierarchy.
- `src/components/sections/final-cta.tsx`: Vermilion conversion plane and high-contrast form treatment; submit/reset behavior unchanged.
- `src/components/about/*.tsx`: Apply the same material grammar across About while preserving every animation and pointer listener.
- `DESIGN.md`: Replace the flat reconstruction visual system with the built Obsidian + Champagne + Vermilion system after QA.
- `.impeccable/design.json`: Refresh from the final `DESIGN.md` through the Impeccable document workflow.

---

### Task 1: Lock Behavior and Establish Premium Material Tokens

**Files:**
- Create: `scripts/verify-ui-contract.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Current source strings in `src/app`, `src/components/sections`, and `src/components/about`.
- Produces: `npm run verify:ui` command and semantic CSS tokens/classes used by Tasks 2-4.

- [ ] **Step 1: Add the failing UI contract command**

Add this script entry to `package.json`:

```json
"verify:ui": "node scripts/verify-ui-contract.mjs"
```

Create `scripts/verify-ui-contract.mjs` with these exact contract groups:

```js
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const checks = [
  ["src/app/globals.css", ["--background: #08090a", "--champagne: #d3b17a", "--accent: #f0441d", ".premium-surface", ".premium-control"]],
  ["src/components/sections/selected-work.tsx", ["onPointerMove={updateMask}", "onPointerLeave={hideMask}", "onKeyDown={handleComparisonKeyDown}", "ArrowLeft", "ArrowRight", "comparisonView", "masked-media", "comparison-full"]],
  ["src/components/sections/services.tsx", ["aria-expanded={isActive}", "onClick={() => setActive(isActive ? null : index)}", "toggleActions: \"play reverse play reverse\""]],
  ["src/components/sections/final-cta.tsx", ["event.preventDefault()", "new FormData(event.currentTarget).get(\"website\")", "setStatus(\"done\")", "onClick={reset}"]],
  ["src/components/site-nav.tsx", ["aria-expanded={open}", "inert={!open}", "onClick={() => setOpen((value) => !value)}", "style={{ transitionDelay: open ? `${index * 55}ms` : \"0ms\" }}"]],
  ["src/components/about/dictionary-section.tsx", ["start: \"top top\"", "pin: pinTarget", "mm.revert()"]],
  ["src/components/about/outro-statement.tsx", ["scrub: true", "self.getVelocity()", "velocityTrigger.kill()", "displaySplit.revert()"]],
];

const missing = checks.flatMap(([path, needles]) => {
  const source = read(path);
  return needles.filter((needle) => !source.includes(needle)).map((needle) => `${path}: ${needle}`);
});

if (missing.length) {
  console.error(`UI contract failed:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log(`UI contract passed (${checks.length} files).`);
```

- [ ] **Step 2: Run the contract and confirm it fails only on new visual tokens**

Run: `npm run verify:ui`

Expected: FAIL listing the five missing `globals.css` tokens/classes; no motion, state, or interaction signature should be missing.

- [ ] **Step 3: Replace global tokens and add material primitives**

In `src/app/globals.css`, replace the `:root` colors with:

```css
:root {
  --background: #08090a;
  --surface-base: #0d0f11;
  --surface-raised: #14171a;
  --surface-soft: #1a1d20;
  --surface-work: #111417;
  --foreground: #f1eee8;
  --muted: #a5a19a;
  --line: rgb(211 177 122 / 20%);
  --line-strong: rgb(211 177 122 / 36%);
  --champagne: #d3b17a;
  --champagne-bright: #ecd7ad;
  --accent: #f0441d;
  --accent-deep: #c83418;
  --accent-soft: rgb(240 68 29 / 14%);
  --shadow-ambient: 0 32px 90px rgb(0 0 0 / 28%);
  --shadow-float: 0 18px 50px rgb(3 4 5 / 34%);
}
```

Expose the new tokens in `@theme inline`, then add the following presentation primitives below the focus rules:

```css
.premium-surface {
  border: 1px solid var(--line);
  background:
    linear-gradient(145deg, rgb(255 255 255 / 3.5%), transparent 38%),
    var(--surface-base);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 5%), var(--shadow-ambient);
}

.premium-control {
  border: 1px solid var(--line-strong);
  background:
    linear-gradient(145deg, rgb(255 255 255 / 9%), rgb(255 255 255 / 2%)),
    rgb(20 23 26 / 84%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 10%), var(--shadow-float);
}

.signal-plane {
  background:
    linear-gradient(145deg, rgb(255 255 255 / 10%), transparent 35%),
    linear-gradient(120deg, var(--accent), var(--accent-deep));
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 16%), 0 30px 90px rgb(200 52 24 / 16%);
}

.champagne-rule {
  border-color: var(--line);
}
```

Update `html` and `body` to use a locked dark tonal background without changing scroll behavior. Add grain through `body::before` as a fixed, non-interactive, low-opacity CSS pattern; keep it below navigation and above the page background.

- [ ] **Step 4: Add reduced-transparency fallback**

Extend the existing media query with:

```css
@media (prefers-reduced-transparency: reduce) {
  .site-nav,
  .premium-control {
    background: var(--surface-raised) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

- [ ] **Step 5: Verify the token and behavior contract**

Run: `npm run verify:ui`

Expected: `UI contract passed (7 files).`

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 6: Commit the contract and material foundation**

```bash
git add package.json scripts/verify-ui-contract.mjs src/app/globals.css
git commit -m "style: establish premium material foundation"
```

---

### Task 2: Upgrade Navigation and Home First Viewport

**Files:**
- Modify: `src/components/site-nav.tsx`
- Modify: `src/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `.premium-control`, `.signal-plane`, `--champagne`, `--foreground`, `--line-strong` from Task 1.
- Produces: Premium global navigation and hero treatment used as the visual reference for later sections.

- [ ] **Step 1: Add a failing source assertion for the new treatment**

Append these needles to the existing contract arrays:

```js
["src/components/site-nav.tsx", ["premium-control", "text-champagne"]],
["src/components/sections/hero.tsx", ["signal-plane", "border-champagne"]],
```

Merge them into the existing entries for those files rather than creating duplicate file entries.

- [ ] **Step 2: Run the contract to verify failure**

Run: `npm run verify:ui`

Expected: FAIL only for `premium-control`, `text-champagne`, `signal-plane`, and `border-champagne`.

- [ ] **Step 3: Restyle the navigation without changing interaction code**

In `site-nav.tsx`:

- Add `premium-control` to the desktop nav shell while retaining `site-nav`, pill radius, `backdrop-blur-xl`, dimensions, and positioning.
- Replace white borders with `border-champagne/30` and inactive text with `text-foreground/62`.
- Style the word `Studio` as `text-champagne` while keeping the product name unchanged.
- Keep the CTA Vermilion and add a soft inset highlight using a static shadow utility.
- Apply the same palette to the mobile trigger and menu panel.
- Do not edit `open`, `aria-expanded`, `inert`, `transitionDelay`, `onClick`, or transition duration/easing utilities.

- [ ] **Step 4: Restyle the hero without changing GSAP or DOM order**

In `hero.tsx`:

- Add `signal-plane` to `[data-hero-mark]`; keep `hero-mark-geometry` and do not add transforms.
- Change display weight from `font-semibold` to `font-medium` while preserving size, line-height, tracking, ref, and text.
- Increase supporting copy contrast from `text-white/65` to `text-foreground/72`.
- Give the primary CTA a Porcelain surface, champagne inner ring, and existing Vermilion icon well.
- Change the secondary CTA border to `border-champagne/40`, keeping the exact hover transform and duration/easing.

- [ ] **Step 5: Verify behavior, lint, and first-viewport build**

Run: `npm run verify:ui && npm run lint && npm run build`

Expected: all commands exit 0; both routes compile.

- [ ] **Step 6: Commit the first viewport**

```bash
git add scripts/verify-ui-contract.mjs src/components/site-nav.tsx src/components/sections/hero.tsx
git commit -m "style: refine navigation and hero"
```

---

### Task 3: Upgrade Home Content Surfaces

**Files:**
- Modify: `src/components/sections/services.tsx`
- Modify: `src/components/sections/selected-work.tsx`
- Modify: `src/components/sections/capabilities.tsx`
- Modify: `src/components/sections/process-about.tsx`
- Modify: `src/components/sections/insights.tsx`
- Modify: `src/components/sections/final-cta.tsx`

**Interfaces:**
- Consumes: Premium material tokens/classes and first-viewport hierarchy from Tasks 1-2.
- Produces: Complete premium home route with unchanged motion and behavior.

- [ ] **Step 1: Extend the contract with home presentation markers**

Require the following static markers while retaining all existing behavior needles:

```js
"src/components/sections/services.tsx": ["champagne-rule", "text-champagne-bright"]
"src/components/sections/selected-work.tsx": ["premium-surface", "border-champagne"]
"src/components/sections/capabilities.tsx": ["bg-surface-soft", "border-champagne"]
"src/components/sections/process-about.tsx": ["premium-surface", "signal-plane"]
"src/components/sections/insights.tsx": ["champagne-rule", "text-muted"]
"src/components/sections/final-cta.tsx": ["signal-plane", "border-background/45"]
```

- [ ] **Step 2: Run the contract to confirm the new markers fail**

Run: `npm run verify:ui`

Expected: FAIL for the new styling markers only.

- [ ] **Step 3: Refine Services and Insights row systems**

- Replace `editorial-rule` uses with `champagne-rule` while keeping border placement and DOM structure.
- Use `font-medium` for large row titles and `text-foreground/68` for body copy.
- Use `text-champagne-bright` only for hover/active title emphasis where Vermilion is not already communicating state.
- Keep active baselines Vermilion and preserve all `transition-*`, duration, easing, `aria-expanded`, click handlers, and GSAP blocks.

- [ ] **Step 4: Refine Selected Work without touching interaction**

- Add `premium-surface`, a 24px radius, internal padding of 4-6px, and an inner clipped core around the existing visual only if the existing `ref={frame}` remains the animated element.
- Prefer styling the existing frame directly to avoid introducing a wrapper that changes `clipPath` animation geometry.
- Recolor the old state to Carbon/Smoke and the new state to Porcelain/Obsidian with Champagne details; keep Vermilion as the action plane.
- Restyle the old/new pill control with `premium-control` and champagne border.
- Keep every function from `updateMask` through `handleComparisonKeyDown` byte-for-byte unchanged.

- [ ] **Step 5: Refine capability chips and process slabs**

- Default chips: `border-champagne/30 bg-surface-soft/70 text-foreground/74` with a static inset highlight.
- Accent chips: Vermilion signal surface with Obsidian text; preserve pointer callbacks and transition classes.
- Process first slab: Porcelain/Carbon with champagne top rule replacing the flat paper block.
- Process second slab: `signal-plane` with readable Obsidian text.
- Keep `data-*` attributes, SplitText targets, GSAP blocks, component arrays, and document order unchanged.

- [ ] **Step 6: Refine final CTA and form contrast**

- Add `signal-plane`, 24px radius, border, and ambient shadow to the existing CTA container.
- Use `border-background/45` for input and result dividers, `placeholder:text-background/65`, and a Porcelain submit surface.
- Preserve `name="website"`, native validation, helper copy, submit/reset functions, disabled state, and all visible strings.

- [ ] **Step 7: Verify the home route**

Run: `npm run verify:ui && npm run lint && npm run build`

Expected: all commands exit 0.

Manual contract:

```text
Desktop: service accordion opens/closes; selected-work lens follows pointer; leaving hides the mask.
Keyboard: selected-work ArrowRight shows new and ArrowLeft shows old.
Mobile: old/new buttons remain touchable and switch states.
Form: valid URL shows the sample result; "Thử link khác" resets it.
```

- [ ] **Step 8: Commit the completed home route**

```bash
git add scripts/verify-ui-contract.mjs src/components/sections
git commit -m "style: elevate home content surfaces"
```

---

### Task 4: Apply the System to the About Route

**Files:**
- Modify: `src/components/about/hero-about.tsx`
- Modify: `src/components/about/dictionary-section.tsx`
- Modify: `src/components/about/manifesto-section.tsx`
- Modify: `src/components/about/vision-section.tsx`
- Modify: `src/components/about/culture-section.tsx`
- Modify: `src/components/about/outro-statement.tsx`
- Modify: `src/components/about/magnetic-principle.tsx`

**Interfaces:**
- Consumes: The home route's final token, surface, typography, divider, and CTA grammar.
- Produces: A visually unified About route with all existing GSAP and pointer physics preserved.

- [ ] **Step 1: Extend the contract with About visual markers**

Add these markers to the corresponding contract entries:

```js
"src/components/about/hero-about.tsx": ["text-champagne-bright", "text-foreground/72"]
"src/components/about/dictionary-section.tsx": ["champagne-rule", "text-champagne"]
"src/components/about/manifesto-section.tsx": ["text-foreground/92"]
"src/components/about/vision-section.tsx": ["champagne-rule", "premium-control"]
"src/components/about/culture-section.tsx": ["text-champagne-bright"]
"src/components/about/outro-statement.tsx": ["signal-plane", "border-background/30"]
"src/components/about/magnetic-principle.tsx": ["premium-control", "border-champagne"]
```

- [ ] **Step 2: Run the contract to verify the About styling fails**

Run: `npm run verify:ui`

Expected: FAIL only for the new About styling markers.

- [ ] **Step 3: Refine About hero, dictionary, and manifesto**

- Keep About hero layout and SplitText animation; change heading to `font-medium`, introduce a restrained `text-champagne-bright` emphasis only through a parent accent rule that does not alter text nodes, and raise body contrast to `text-foreground/72`.
- Replace explicit `rgba(237,237,237,0.16)` dividers with `champagne-rule`.
- Recolor dictionary display terms from Vermilion to Champagne; keep inline definition keywords Vermilion so interaction/action meaning remains consistent.
- Keep manifesto DOM, strings, `data-manifesto-line`, SplitText configuration, and trigger values unchanged; use `text-foreground/92` and refined weight/leading only.

- [ ] **Step 4: Refine vision, culture, and magnetic principles**

- Apply champagne dividers and Graphite control treatment to principles without changing staggered offsets or row structure.
- Add `premium-control border-champagne/30` to `MagneticPrinciple` while retaining `ref`, pointer listeners, GSAP quickTo settings, and cleanup.
- Refine Culture heading and body colors using Champagne/Porcelain; do not alter `data-culture-*`, SplitText, or section grid.

- [ ] **Step 5: Refine the About outro conversion plane**

- Add `signal-plane` to `[data-outro-panel]`, a champagne inner edge, and `border-background/30` to the closing rule.
- Match the home primary CTA treatment while keeping the exact link target, hover transform, icon structure, and all GSAP code unchanged.

- [ ] **Step 6: Verify the About route**

Run: `npm run verify:ui && npm run lint && npm run build`

Expected: all commands exit 0.

Manual contract:

```text
Desktop: dictionary pins at top; manifesto/culture lines reveal; principles retain magnetic response; outro clip reveal and velocity scaling remain smooth.
Mobile: dictionary does not pin, reading order remains one column, no horizontal overflow appears.
Reduced motion: essential content is visible without transforms or pinning.
```

- [ ] **Step 7: Commit the unified About route**

```bash
git add scripts/verify-ui-contract.mjs src/components/about
git commit -m "style: unify premium about experience"
```

---

### Task 5: Visual QA, Regression Review, and Design-System Documentation

**Files:**
- Modify: `DESIGN.md`
- Modify: `.impeccable/design.json`
- Modify: Any presentation file from Tasks 1-4 only when a screenshot finding requires a bounded visual fix.

**Interfaces:**
- Consumes: Completed home and About routes plus the approved spec.
- Produces: Verified desktop/mobile build, closed visual review, and current design documentation.

- [ ] **Step 1: Run the complete static verification suite**

Run:

```powershell
npm run verify:ui
npm run lint
npm run build
git diff --check HEAD~4..HEAD
```

Expected: all commands exit 0 and `git diff --check` prints nothing.

- [ ] **Step 2: Audit diffs for forbidden behavior changes**

Run:

```powershell
git diff HEAD~4..HEAD -- src/components | rg "^[+-].*(useGSAP|gsap\.|ScrollTrigger|SplitText|onPointer|onClick|onKeyDown|useState|setStatus|setOpen|setActive|setComparisonView|transitionDelay|toggleActions|duration:|ease:)"
```

Expected: no output except className lines containing unchanged transition utilities. Any logic output must be reverted before continuing.

- [ ] **Step 3: Capture one bounded desktop/mobile QA round**

Start the app with `npm run dev`. Capture these routes after fonts and loader settle:

```text
Home desktop: 1440x1000
Home mobile: 390x844
About desktop: 1440x1000
About mobile: 390x844
```

Save screenshots under `.impeccable/finish/` as `home-desktop.png`, `home-mobile.png`, `about-desktop.png`, and `about-mobile.png`.

Inspect in one batch for overflow, clipped Vietnamese glyphs, CTA contrast, inconsistent radii, repeated glass, flat sections, loader/nav stacking, and selected-work control legibility.

- [ ] **Step 4: Apply one batched visual correction pass**

Use only token, color, spacing, radius, border, shadow, and typography changes required by the screenshot findings. Do not touch behavior blocks. Re-run:

```powershell
npm run verify:ui
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 5: Run the Impeccable finish review**

Provide the reviewer with:

```text
Original request and approved spec
Home and About artifact paths
All four screenshot paths
Direction: Obsidian + Champagne + Vermilion
Hard constraint: every existing animation and interaction remains unchanged
Craft floor reference path
```

If the disposition is `fix`, apply one bounded batch, recapture the same four viewports, and request a verdict pass. If `rebuild` appears twice, stop and present both verdicts to the user.

- [ ] **Step 6: Update the durable design documentation**

Revise `DESIGN.md` to record the built palette, material system, typography, spacing, geometry, component treatments, accessibility, and preserved motion grammar. Refresh `.impeccable/design.json` through the Impeccable document workflow so it no longer contradicts `DESIGN.md`.

- [ ] **Step 7: Final verification and commit**

Run:

```powershell
npm run verify:ui
npm run lint
npm run build
git diff --check
git status --short
```

Expected: commands exit 0; only `log.md` remains untracked after committing.

Commit:

```bash
git add DESIGN.md .impeccable/design.json src/app src/components scripts package.json
git commit -m "docs: record premium visual system"
```

Report the reviewer disposition at its actual scope, the verification commands, the preserved animation contract, and the final commit IDs.

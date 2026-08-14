---
target: homepage landing page
total_score: 23
p0_count: 1
p1_count: 2
timestamp: 2026-08-13T17-55-19Z
slug: src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | Simulated terminal status ends without real result, receipt, next step, or reset. |
| 2 | Match System / Real World | 3/4 | Vietnamese copy fits audience, but “Phân tích ngay” promises more than MVP delivers. |
| 3 | User Control and Freedom | 3/4 | Navigation and accordions work, but submitted form disables permanently. |
| 4 | Consistency and Standards | 3/4 | Visual system is coherent; insight rows look actionable but are static. |
| 5 | Error Prevention | 3/4 | Native URL validation works; privacy and data boundary are underexplained. |
| 6 | Recognition Rather Than Recall | 2/4 | Collapsed services and capability labels require extra interpretation. |
| 7 | Flexibility and Efficiency | 2/4 | Long page, no skip link, and mobile conversion action lives inside disclosure menu. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong restraint, but oversized heading treatment repeats across sections. |
| 9 | Error Recovery | 1/4 | No visible error, retry, reset, or meaningful recovery state exists. |
| 10 | Help and Documentation | 1/4 | No clear deliverable, turnaround, privacy explanation, or post submission expectation. |
| **Total** | | **23/40** | Visually confident, conversion trust fragile. |

## Anti Patterns Verdict

**Borderline pass.** First order slop is avoided. Vietnamese point of view, asymmetric composition, single accent, flat geometry, explicit concept labeling, and no fake metrics create a deliberate identity.

Second order risk remains. Near black, vermilion, oversized Geist, mono labels, hairlines, pills, smooth scrolling, and custom cursor belong to a saturated editorial tech studio grammar. Repeating giant heading, offset copy, and ruled list structure across nearly every section increases sameness.

Detector evidence found no slop category issue in source. CLI found one advisory at `src/components/site-nav.tsx:21`: 11px sits outside the documented type ramp. Browser detector found one page level warning: Geist covers about 85% of text. Single family is intentional, but typography has little contrast axis.

The selected work visual is synthetic CSS and explicitly labeled “Concept minh họa,” which is honest but not proof. The inactive insight list and “Dự án đầy đủ sắp ra mắt” make premium positioning under proven.

## Overall Impression

Nét Nút has strong art direction and a clear thesis: begin with the existing website, preserve business value, remove friction. Page wins attention quickly. It loses trust at conversion because the primary promise behaves like a real analysis while only simulating progress. Biggest opportunity: replace theatrical backend simulation with a truthful, useful next step and add one credible proof artifact.

## What's Working

1. The hero line “Web cũ. Làm lại cho đáng.” creates immediate tension and speaks directly to the target business owner.
2. Near black, off white, vermilion, hard planes, hairlines, and asymmetric grids form a recognizable visual system without banned gradients or equal card grids.
3. Accessibility foundation is solid: semantic headings, native URL validation, visible focus, `aria-expanded`, `aria-pressed`, `aria-live`, reduced motion handling, and mobile fallback controls.

## Priority Issues

### [P0] Simulated analysis undermines CTA trust

**Location:** `src/components/sections/final-cta.tsx:18-35`, `src/components/sections/final-cta.tsx:66-75`

**Why it matters:** “Phân tích ngay” starts a fake terminal sequence, disables the form, then ends without analysis or a useful result. Sophisticated business users can detect the mismatch immediately. Peak end memory becomes “premium interface, no real action.”

**Fix:** Make MVP truthful. Either label action as a demo and show a static sample teardown, or turn it into a real intake confirmation with explicit privacy, expected response, and next step. Keep simulation only when it represents a real local step, never fake backend progress.

**Suggested command:** `$impeccable clarify src/components/sections/final-cta.tsx`

### [P1] Premium positioning has no credible proof

**Location:** `src/components/sections/selected-work.tsx:10-43`, `src/components/sections/selected-work.tsx:142-145`, `src/components/sections/insights.tsx:15-24`

**Why it matters:** The only work visual is synthetic and all insights are inactive. Visitors cannot validate craft before sharing a URL.

**Fix:** Add one approved teardown, annotated before and after, or real project artifact. If no case study exists, turn selected work into a clearly labeled method demonstration and state exactly what visitor receives.

**Suggested command:** `$impeccable shape src/components/sections/selected-work.tsx`

### [P1] Page hierarchy repeats instead of progressing

**Location:** `src/components/sections/services.tsx:54-62`, `src/components/sections/selected-work.tsx:87-90`, `src/components/sections/capabilities.tsx:47-52`, `src/components/sections/insights.tsx:9-13`

**Why it matters:** Nearly every section shouts with similar oversized display type. Long scroll adds volume but not enough new evidence.

**Fix:** Give first viewport one dominant action. Move one proof artifact above capabilities. Compress capabilities and insights. Reserve extreme type scale for hero, one proof statement, and final CTA.

**Suggested command:** `$impeccable distill src/app/page.tsx src/components/sections`

### [P2] Static content masquerades as usable content

**Location:** `src/components/sections/insights.tsx:15-24`, `src/components/sections/selected-work.tsx:142-145`

**Why it matters:** Insight rows look like article links but cannot open. The project status line looks like an action but has no destination.

**Fix:** Add real `href` targets, or label these as upcoming topics and remove article like affordance. Remove section until content exists if no useful destination can be provided.

**Suggested command:** `$impeccable clarify src/components/sections/insights.tsx`

### [P2] Selected work reveal depends on pointer input

**Location:** `src/components/sections/selected-work.tsx:93-116`

**Why it matters:** Desktop starts on “Web cũ”; keyboard users have no equivalent old/new control. Pointer movement is discovery, not enhancement.

**Fix:** Add explicit old/new controls for every input mode, or show static split comparison before interaction. Keep pointer lens as enhancement.

**Suggested command:** `$impeccable animate src/components/sections/selected-work.tsx`

### [P3] Mobile menu trigger is below touch target guidance

**Location:** `src/components/site-nav.tsx:47-62`

**Why it matters:** Live mobile geometry measured the trigger at about 32 × 32px. It is below the recommended 44 × 44px target, and the primary mobile CTA is hidden inside the menu.

**Fix:** Increase trigger to at least 44 × 44px. Keep “Gửi website” visible or make it dominant in opened panel.

**Suggested command:** `$impeccable adapt src/components/site-nav.tsx`

## Persona Red Flags

**Vietnamese business owner on first visit:** Understands the problem statement, but cannot tell what analysis includes, how long it takes, what they receive, or whether the URL is stored. Fake analysis state creates distrust.

**Busy executive on mobile:** Faces roughly 7,400px of scroll, multiple display headings, eight capability labels, and a conversion action hidden in navigation. No persistent conversion action remains after menu close.

**Keyboard focused reviewer:** Cannot operate desktop old/new comparison without pointer movement. Custom cursor hides native cursor on links, increasing orientation cost.

## Cognitive Load

Six of eight checks fail: single focus, chunking, visual hierarchy, one thing at a time, minimal choices, and working memory. Grouping and progressive disclosure pass. Main cause is repeated high scale plus simultaneous hero actions and eight undifferentiated capabilities.

## Emotional Journey

Entry creates curiosity. Early scroll creates recognition. Services and process create authority. Selected work creates doubt because it announces concept only when proof should peak. Insights create scroll fatigue because all entries are inactive. Vermilion CTA creates a strong final visual peak, then simulated terminal feedback collapses trust at the exact endpoint.

## Minor Observations

- `src/components/site-nav.tsx:52` uses `h-8 w-8`; increase touch area.
- `src/components/sections/process-about.tsx:54` has no section ID, so navigation cannot target process directly.
- `src/components/sections/final-cta.tsx:54-64` lacks `autoComplete="url"` and visible privacy or data use explanation.
- `src/components/sections/capabilities.tsx:6-15` uses implementation terms without translating business outcomes.
- `src/components/sections/services.tsx:76-89` has `aria-expanded` but no `aria-controls` relationship.
- No actual image assets exist. This avoids broken image risk but leaves selected work feeling like a placeholder.

## Questions to Consider

- If “Phân tích ngay” cannot produce analysis yet, should truthful action be a sample teardown, consultation request, or downloadable checklist?
- What single approved artifact would make a skeptical business owner trust Nét Nút before submitting a URL?
- Can “Hoạt ảnh GSAP,” “Phát triển Next.js,” and “Triển khai và lưu trữ” be rewritten around business outcomes without weakening specialist credibility?

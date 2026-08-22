# Quick Task 260821-o1f: Implement interactive editorial reconstruction - Context

**Gathered:** 2026-08-21
**Status:** Ready for planning

<domain>
## Task Boundary

Implement `docs/superpowers/plans/2026-08-21-interactive-editorial-reconstruction.md` end to end. Preserve existing uncommitted user changes as baseline. Update homepage, About, shared URL flow, editorial diagnostic sections, reconstruction stage, motion foundation, documentation, and validation without backend, API, persistence, fake analysis, or new runtime dependencies.

</domain>

<decisions>
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

</decisions>

<specifics>
## Specific Ideas

- Hero copy: “Website cũ. Không có nghĩa là phải bỏ.”
- Hero form label: “Website đang có vấn đề ở đâu?”
- Reconstruction phases: `Inspect → Remove → Reflow → Prioritize → Rebuild`, visible as `Nhìn → Gỡ → Xếp lại → Ưu tiên → Dựng`.
- About manifesto must use: “Giữ cái đáng giữ. Gỡ cái đang cản. Dựng cái cần chạy.”

</specifics>

<canonical_refs>
## Canonical References

- `docs/superpowers/plans/2026-08-21-interactive-editorial-reconstruction.md`
- `PRODUCT.md`
- `DESIGN.md`
- `AGENTS.md`
- `node_modules/next/dist/docs/`

</canonical_refs>

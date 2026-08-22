---
name: anti-over-engineering
description: Prevent scope drift, speculative optimization, and repeated verification in significant single-agent work. Use for broad or multi-step tasks with tempting detours; skip tiny tasks and emergency containment.
---

# Anti-over-engineering

Before deep work, record:

```text
OBJECTIVE: one outcome
DONE: observable pass condition
NON-GOALS: adjacent work excluded now
CONSTRAINTS: safety, authority, compatibility, time, and files
```

## Smallest sufficient intervention

Try in order: answer or no change -> existing configuration/workflow -> narrow edit -> new helper or abstraction. Move down only when evidence shows the earlier level cannot satisfy `DONE`.

For each proposed step ask: **If this step fails, can `DONE` still pass?** If yes, park it in one line and do not investigate it during this task. Keep no more than five active steps and one step in progress.

Use one capable agent end to end unless the user or governing project instructions explicitly require delegation. Search tools and deterministic checks are not delegation.

Do not generate exhaustive alternatives or maximum-certainty loops unless the unresolved choice changes implementation or safety. Prefer summaries and targeted searches over loading large artifacts.

## Stop and verify

When `DONE` first passes, run one verification pass proportional to risk and stop. Repeat only when that pass is ambiguous, contradicts other evidence, or exposes a concrete defect.

- Reversible docs/config: targeted validation plus a negative scan.
- Shared code: caller-aware tests plus the affected integration boundary.
- Destructive, security, money, or live work: retain every required safety, recovery, and boundary check.

"No change needed" is valid when the current system already satisfies `DONE`. Never use minimalism to remove correctness, safety, privacy, authorization, or data-loss protections.

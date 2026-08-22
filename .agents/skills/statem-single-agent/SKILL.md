---
name: statem-single-agent
description: Manage long, multi-phase single-agent work with a minimal StateM runbook. Use for at least three substantial phases, mutable execution state, or work that may outlive context; not for short tasks, token metering, delegation, or ordinary compaction.
---

# StateM single agent

Use the official [StateM](https://github.com/henryqin1997/statem) CLI. This skill does not bundle or fork the StateM core. Check `python -m statem --help`; if it is unavailable, point the user to the official repository instead of inventing an installer or vendoring the package.

Resolve this skill's directory from the loaded `SKILL.md` path. Its runbook is `assets/single-agent.yaml`.

## Start or resume

Choose one stable, task-specific run id:

```text
python -m statem validate <skill-dir>/assets/single-agent.yaml --strict
python -m statem start <skill-dir>/assets/single-agent.yaml --run-id <id> --json
python -m statem cur --run-id <id> --json
```

StateM writes runtime state to `.statem/` by default. Do not commit runtime state.

Advance only after the current phase is complete:

```text
python -m statem goto <next> --run-id <id> --yes --json
```

`--yes` confirms that the agent already checked every listed condition; it is not evidence. At `verify`, register a bounded `predicate` or `command` only when a deterministic check exists. Do not invent a fake check for judgment-only work.

## Boundaries

- Let the host's native compaction manage context.
- Do not use `compact-prompt`, `/clear`, Stop hooks, `llm_review`, another model, or another agent.
- Transition only at real phase boundaries, not after every tool call.
- Read recent history only after recovery, compaction, or uncertainty about prior transitions.
- Treat history as execution state, not semantic truth. Final claims still require source or test evidence.
- If StateM blocks progress incorrectly, report the exact gate and repair the runbook or continue without it; never weaken a safety check merely to advance.

Tested with StateM `0.1.0` at commit `8c3309ad3e7b265e23a4db011ff98c5f6a132bd8` (Apache-2.0).

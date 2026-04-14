---
name: test-revision
description: Audits tests for a provided file or folder path without project scripts. The agent maps production dependencies, runs mutation-style checks, inserts TODO checkpoints in production code, and strengthens weak tests. Use when the user invokes /revise-test with attached tests.
---

# Test Revision

## Quick start

- Single test file: `/revise-test @src/.../Some.test.tsx`
- Test folder: `/revise-test @src/.../tests/`
- After invocation, run the full revision workflow automatically.

## Default behavior

- Trigger this skill when `/revise-test` is used with an attached test file/folder path.
- If no path is attached, ask only for the path, then begin revision immediately.
- Do not wait for extra instructions for sensitivity checks, TODO insertion, or test strengthening.
- Treat production TODO checkpoints as part of the default workflow.
- Skip TODO insertion only when the user explicitly asks to skip it.

## Required workflow

1. Build a coverage map:
   - locate tests from the provided path;
   - identify which production code they are expected to protect.
2. Confirm baseline:
   - run the discovered tests without changes.
3. Run manual mutation checks:
   - introduce a minimal temporary production break;
   - run relevant tests;
   - capture result (`killed`/`survived`);
   - immediately revert the temporary break.
4. If a mutation survives:
   - add or strengthen tests;
   - rerun to confirm the same break now fails tests.
5. Finalize:
   - ensure production code is restored to working state;
   - rerun relevant tests;
   - run type checking for TS/TSX changes.

## Production TODO checkpoints

- Add nearby comments for risky production areas:
  - `TODO verify: ...`
  - commented example of a temporary break.
- Keep comments short and tied to a specific test risk.

## Constraints

- Do not add helper scripts or domain config files for revision.
- Never leave temporary breakages in the final production code.
- Validate all changes with test runs and type checks (for TS/TSX edits).

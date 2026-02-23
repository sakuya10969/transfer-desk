---
name: cli-quality
description: Use when you need to lint, format, or type-check the codebase.
---

# CLI: Code Quality Checks & Fixes

Provides commands to ensure the codebase adheres to formatting, linting, and TypeScript type-checking standards.

## When to use

- Before committing or pushing code.
- To automatically fix formatting or linting errors.
- In CI/CD pipelines to verify code quality.

## Commands

- **lint**
  - Runs: `eslint`
  - Example: `pnpm run lint`
- **format**
  - Runs: `prettier --write "**/*.{ts,tsx}"`
  - Example: `pnpm run format`
- **check:format**
  - Runs: `prettier --check "**/*.{ts,tsx}"`
  - Example: `pnpm run check:format`
- **check:types**
  - Runs: `tsc --noEmit`
  - Example: `pnpm run check:types`
- **check:lint**
  - Runs: `pnpm run lint`
  - Example: `pnpm run check:lint`
- **check:all**
  - Runs: `pnpm run check:format && pnpm run check:lint && pnpm run check:types`
  - Example: `pnpm run check:all`
- **fix:format**
  - Runs: `pnpm run format`
  - Example: `pnpm run fix:format`
- **fix:lint**
  - Runs: `eslint --fix`
  - Example: `pnpm run fix:lint`
- **fix:all**
  - Runs: `pnpm run fix:format && pnpm run fix:lint`
  - Example: `pnpm run fix:all`

## Common workflows

1. **Pre-commit verification**:
   - Run `pnpm run check:all` to ensure no lint, format, or type issues exist.
2. **Auto-fixing issues**:
   - If checks fail, run `pnpm run fix:all` to resolve lint and format problems.
   - Re-run `pnpm run check:types` because type errors cannot be auto-fixed and require manual updates.

## Notes / pitfalls

- Types cannot be automatically fixed; `fix:all` only handles formatting and linting. Manual intervention is strictly required for type issues raised by `check:types`.

## Quick reference

- `pnpm run check:all` (Most used)
- `pnpm run fix:all`

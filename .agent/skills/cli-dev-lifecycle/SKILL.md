# CLI: Development Lifecycle

Provides commands for starting the local development server, building the application, running production servers, and comprehensive environment setup or cleanup.

## When to use

- You are initializing the project for the first time or after pulling new changes (`setup:local`).
- You need to spin up the Next.js development server (`dev`).
- You want to test the production build locally (`build`, `start`).
- You need to clean temporary and generated files to resolve caching issues (`clean:next`, `clean:all`).

## Commands

- **dev**
  - Runs: `next dev`
  - Example: `pnpm run dev`
- **build**
  - Runs: `next build`
  - Example: `pnpm run build`
- **start**
  - Runs: `next start`
  - Example: `pnpm run start`
- **setup:local**
  - Runs: `pnpm run docker:up && pnpm run prisma:generate && pnpm run codegen`
  - Example: `pnpm run setup:local`
- **clean:next**
  - Runs: `rm -rf .next`
  - Example: `pnpm run clean:next`
- **clean:all**
  - Runs: `pnpm run relay:clean && pnpm run clean:next`
  - Example: `pnpm run clean:all`

## Common workflows

1. **Fresh start / daily dev**:
   - `pnpm run setup:local`
   - `pnpm run dev`
2. **Production build verification**:
   - `pnpm run build`
   - `pnpm run start`
3. **Deep clean framework cache**:
   - `pnpm run clean:all`
   - `pnpm run setup:local`

## Notes / pitfalls

- **Unix-specific commands**: Both `clean:next` and `clean:all` (via its composed scripts) rely on `rm -rf`, which is specific to Unix-like environments.
- `setup:local` assumes Docker is running on your host machine and ports for the backend are available.

## Quick reference

- `pnpm run dev` (Most used)
- `pnpm run setup:local`
- `pnpm run clean:all`

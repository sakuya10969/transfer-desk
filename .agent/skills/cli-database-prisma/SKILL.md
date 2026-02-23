# CLI: Database & Prisma

Provides commands for managing database migrations, generating the Prisma Client, and interacting visually with the local database.

## When to use

- You modified the `schema.prisma` file and need to apply those structural changes to Postgres.
- You need to inspect or modify the database contents visually.
- The local database state is corrupt and requires a hard reset.

## Commands

- **prisma:generate**
  - Runs: `prisma generate`
  - Example: `pnpm run prisma:generate`
- **prisma:migrate**
  - Runs: `prisma migrate dev`
  - Example: `pnpm run prisma:migrate`
- **prisma:studio**
  - Runs: `prisma studio`
  - Example: `pnpm run prisma:studio`
- **danger:prisma-reset**
  - Runs: `prisma migrate reset`
  - Example: `pnpm run danger:prisma-reset`

## Common workflows

1. **Updating the database schema**:
   - Edit `schema.prisma`.
   - Run `pnpm run prisma:migrate` to create and apply the database migration.
2. **Database inspection**:
   - Run `pnpm run prisma:studio` and open the provided `localhost` URL in your browser.
3. **Database wipe & reset**:
   - Run `pnpm run danger:prisma-reset` to drop the database entirely, reapply all migrations, and run seed data (if configured).

## Notes / pitfalls

- **Destructive commands**: `danger:prisma-reset` is highly destructive. It immediately wipes the entire local database clean. Use it strictly in local development environments when you need a completely clean slate.

## Quick reference

- `pnpm run prisma:migrate` (Most used)
- `pnpm run prisma:generate`

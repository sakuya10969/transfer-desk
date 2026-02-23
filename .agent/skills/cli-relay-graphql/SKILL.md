---
name: cli-relay-graphql
description: Use when you need to fetch schemas or compile Relay artifacts.
---

# CLI: Relay, GraphQL & Codegen

Provides commands for fetching the GraphQL schema from the Hasura endpoint and compiling Relay artifacts for the frontend to consume.

## When to use

- You have modified a GraphQL query, mutation, or fragment in your React components.
- The backend Hasura schema has changed and the frontend needs to sync.
- You need to clean obsolete Relay artifacts that are failing to compile.

## Commands

- **relay**
  - Runs: `relay-compiler`
  - Example: `pnpm run relay`
- **schema:fetch**
  - Runs: `npx get-graphql-schema http://localhost:8080/v1/graphql -h 'x-hasura-admin-secret=adminsecretkey' > schema.graphql`
  - Example: `pnpm run schema:fetch`
- **codegen**
  - Runs: `pnpm schema:fetch && pnpm relay`
  - Example: `pnpm run codegen`
- **relay:watch**
  - Runs: `relay-compiler --watch`
  - Example: `pnpm run relay:watch`
- **relay:clean**
  - Runs: `rm -rf __generated__`
  - Example: `pnpm run relay:clean`

## Common workflows

1. **Syncing with a modified backend schema**:
   - Ensure the Hasura endpoint is running.
   - Run `pnpm run codegen` to fetch the new schema and rebuild all Relay artifacts.
2. **Developing UI components with Relay**:
   - Start the Relay compiler in watch mode with `pnpm run relay:watch` to instantly generate types for new queries/fragments.
3. **Resolving artifact corruption**:
   - Run `pnpm run relay:clean`
   - Run `pnpm run relay`

## Notes / pitfalls

- **Unix-specific commands**: `relay:clean` runs `rm -rf __generated__`, requiring a Unix-like shell environment.
- `schema:fetch` requires the Hasura instance to be actively running locally at port `8080` to introspect the schema successfully.

## Quick reference

- `pnpm run codegen` (Most used)
- `pnpm run relay:watch`

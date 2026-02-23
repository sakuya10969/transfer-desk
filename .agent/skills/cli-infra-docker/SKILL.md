---
name: cli-infra-docker
description: Use when you need to manage local Docker infrastructure and Hasura metadata.
---

# CLI: Infrastructure, Docker & Hasura

Provides commands to manage the foundational infrastructure (Postgres, Hasura) using Docker Compose, as well as accessing Hasura metadata operations.

## When to use

- Starting up backend services locally before backend/frontend development begins.
- Shutting down local services to free up host machine resources.
- Viewing execution logs for debugging infrastructure issues.

## Commands

- **docker:up**
  - Runs: `docker compose up -d`
  - Example: `pnpm run docker:up`
- **docker:down**
  - Runs: `docker compose down`
  - Example: `pnpm run docker:down`
- **docker:logs**
  - Runs: `docker compose logs -f`
  - Example: `pnpm run docker:logs`
- **hasura:console**
  - Runs: `echo 'Hasura CLI required. Install it to use this script, or visit http://localhost:8080'`
  - Example: `pnpm run hasura:console`
- **hasura:apply**
  - Runs: `echo 'Hasura metadata project required. Initialize with hasura init.'`
  - Example: `pnpm run hasura:apply`

## Common workflows

1. **Starting the environment**:
   - Run `pnpm run docker:up` to spin up the Postgres and Hasura containers in the background.
2. **Debugging infra issues**:
   - Run `pnpm run docker:logs` to tail output from all containers and diagnose errors.
3. **Stopping the environment**:
   - Run `pnpm run docker:down` to gracefully stop and remove all related containers and networks.

## Notes / pitfalls

- **Placeholder commands**: Both `hasura:console` and `hasura:apply` are currently placeholder bash commands that simply `echo` a warning. They do not execute any real Hasura operations right now since the Hasura CLI/metadata project isn't formally initialized. Rely on `http://localhost:8080` for the console instead.

## Quick reference

- `pnpm run docker:up` (Most used)
- `pnpm run docker:down`

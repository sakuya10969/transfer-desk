---
name: cli-index
description: Use when you need to route tasks to the correct CLI skill.
---

# CLI Script Index

This skill serves as the central directory for executing repository npm/pnpm scripts. Use this guide to route your goals to the correct skill documentation.

## When to use

- You are unsure which script to run for a given task.
- You need to locate the skill documentation for a specific repository workflow.

## Task -> Which skill to read

- "I want to start locally" -> `cli-dev-lifecycle`
- "Before pushing" -> `cli-quality`
- "Regenerate Relay artifacts" -> `cli-relay-graphql`
- "DB migrations / Prisma" -> `cli-database-prisma`
- "Docker / Hasura" -> `cli-infra-docker`
- "Cleanup / reset" -> `cli-dev-lifecycle` (for global) or `cli-relay-graphql` (for Relay-specific cleanup)

## Commands

_No specific commands are executed by this index skill. Refer to the linked skills above._

## Common workflows

1. Identify the goal of your task (e.g., format code, run database migrations).
2. Look up the task in the mapping above.
3. Open the corresponding linked skill file (e.g., `.agent/skills/cli-quality/SKILL.md`).
4. Execute the appropriate command using the instructions from that target skill file.

## Notes / pitfalls

- Always verify the prerequisite services (e.g., Docker, Hasura) are running via `cli-infra-docker` before executing downstream tasks like Prisma code generation or Relay artifact generation.

## Quick reference

- Find the skill folder: `.agent/skills/<skill-name>/SKILL.md`

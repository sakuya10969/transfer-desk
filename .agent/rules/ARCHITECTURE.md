# Architecture Rules

This document defines the core architecture, data flow, and structural constraints for the TransferDesk repository. It MUST be followed by all developers and autonomous agents modifying the codebase.

## Architecture Overview

The application follows a Backend-for-Frontend (BFF) approach. Next.js serves as a proxy and intermediate API layer to the Hasura GraphQL Engine.

```text
 Client (Next.js / React)
       | (Relay GraphQL Operations)
       v
 Next.js Route Handler (app/api/graphql/route.ts)
       | (Proxies request securely)
       v
 Hasura GraphQL Engine
       | (SQL execution)
       v
 PostgreSQL Database
```

## Non-negotiable Constraints

- **MUST** use Relay (`react-relay`) for all client-side data access via GraphQL.
- **MUST NOT** connect to the Hasura GraphQL endpoint directly from the browser. All client-side Relay requests MUST be routed through the Next.js API proxy (`app/api/graphql/route.ts`).
- Server-side routes (e.g., specific API functions like a CSV import route) **MAY** invoke the Hasura API directly using server-side secrets.
- **MUST** maintain the `schema.graphql` at the repository root as the exact representation of the Hasura schema.

## Directory Responsibilities

- `app/`: Next.js App Router definitions. Contains page routing, layouts, and API routes (including the GraphQL BFF proxy).
- `features/`: Domain-specific UI, business logic, formatting, and Relay GraphQL operations/fragments. This organizes code by domain context.
- `components/`: Shared, reusable, presentation-only UI components independent of domains (buttons, dialogs, form controls).
- `relay/`: Relay environment setup, network fetchers, and configuration.
- `__generated__/`: Relay compiler output. Files located here are fully generated and **MUST NOT** be edited by hand.
- `prisma/`: Prisma schema configuration and database migration scripts.

## Server vs Client Components Policy

- **Client Components** (`"use client"`): Use when the route or component requires client-side interactivity, state management (e.g., `useState`), or browser APIs.
- **Relay Hooks Boundaries**: Relay hooks (`useFragment`, `usePreloadedQuery`, `useMutation`, etc.) **MUST** only be used within Client Components.
- **Server Components**: Default to Server Components for static layouts, semantic wrappers, or server-only logic, minimizing the client-side JavaScript bundle.

## GraphQL / Relay Policy

- **Fragment-First Approach**: Components MUST explicitly declare exactly what data they need from the GraphQL schema using Relay fragments. Avoid prop-drilling large data objects.
- **Schema and Artifact Regeneration**: Anytime the Hasura schema changes or local GraphQL queries/fragments are modified, you **MUST** regenerate the local `schema.graphql` and the Relay artifacts using the appropriate repository CLI scripts.
- **Generated Code Integration**: Always import TypeScript definitions and GraphQL operation nodes exclusively from the `__generated__/` directory.

## Prisma / Database Policy

- **Migration Intent**: Prisma is strictly used for defining the database schema and managing migrations.
- **Not the Runtime Layer**: Prisma is **NOT** the primary runtime data layer for the frontend; runtime data access is handled by Hasura and Relay.
- Changes to the PostgreSQL structure **MUST** be defined in `prisma/schema.prisma` and applied using Prisma migration lifecycle commands.

## Security & Secrets

- **Admin Secret Handling**: The Hasura admin secret (`x-hasura-admin-secret`) MUST only be injected and accessed by server-side infrastructure, primarily the `app/api/graphql/route.ts` proxy or server-specific API routes.
- **No Client Exposure**: You **MUST NOT** expose backend credentials, API secrets, or Hasura administrator keys to the client application or browser bundle under any circumstances.

## Change Checklist

After typical feature, schema, or route changes, verify the following:

- [ ] Database schema structural changes have been codified into Prisma migrations and successfully applied.
- [ ] The local `schema.graphql` has been refreshed to reflect any backend Hasura changes.
- [ ] Relay artifacts (`__generated__/`) have been successfully re-compiled.
- [ ] No manual edits were made inside `__generated__/`.
- [ ] All new client-side GraphQL queries are targeted at the Next.js API BFF proxy, not Hasura directly.
- [ ] New UI components executing Relay hooks feature the `"use client"` directive.

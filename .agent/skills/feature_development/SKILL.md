---
description: Build user-facing features using Feature-Sliced Design (FSD) and Relay data fetching patterns.
---

# Feature Development

## 1. Main Responsibility

Implement complete vertical slices of functionality, integrating UI, data fetching, and business logic according to the **Feature-Sliced Design (FSD)** architecture. Ensure proper data co-location using **Relay Fragments** and manage mutations for data persistence.

## 2. Technical Knowledge

- **Next.js 16 (App Router)**: Page structure (`page.tsx`, `layout.tsx`) and Routing (`app/`).
- **React 19 / TypeScript 5**: Component composition, hooks, strict types.
- **Relay (React Relay)**:
  - `useLazyLoadQuery`, `useFragment`, `useMutation`.
  - Managing `__generated__` artifacts (never modify manually).
  - Understanding Data Masking and Fragment Composition.
- **GraphQL**: Writing queries and mutations against the Hasura schema.

## 3. Design & Architectural Constraints

- **Layer Enforcement**: Stick to `features/` (business logic) vs `entities/` (domain model) vs `views/` (page assembly). No upward dependencies.
- **Data Co-location**: Every component requiring data **MUST** declare a GraphQL Fragment.
- **Unidirectional Data Flow**: STRICTLY `Client -> BFF -> Hasura -> DB`. Never bypass the BFF/Hasura chain for writes.
- **BFF Pattern**: Use Next.js API Routes (`/api/graphql`) as the exclusive gateway to Hasura. Don't expose `HASURA_GRAPHQL_ADMIN_SECRET` to the client.

## 4. Coding & Documentation Standards

- **Component Naming**: `[Entity][Type]` (e.g., `ClubCard`, `PlayerList`).
- **Fragment Naming**: `[ComponentName]_[propName]` (e.g., `fragment ClubCard_club on Club`).
- **File Structure**:
  - `index.ts` (Public API)
  - `ui/` (Presentation components)
  - `model/` (Logic, hooks, types)
  - `api/` (Data fetching definitions if separate)
- **Error Handling**: Use `ErrorBoundary` and `Suspense` for loading states and failures.

## 5. Typical Tasks

- **Create New Feature**: e.g., "Add Player Transfer History".
- **Implement Relay Integration**: Define fragments in components and compose them up to the page query.
- **Handle Mutations**: Implement `useMutation` with optimistic updates or `updater` functions for cache consistency.
- **Fix Data Fetching Architecture**: Refactor components to properly use fragments instead of prop drilling.

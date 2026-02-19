---
description: Design, implement, and maintain the application's data layer using Prisma, Hasura, and PostgreSQL.
---

# Data Platform Management

## 1. Main Responsibility

Define and maintain the **Database Schema** and **API Layer**. Establish the backend data structure, ensure type safety across the stack (Prisma → Hasura → Client), and handle migrations.

## 2. Technical Knowledge

- **Prisma (Schema-Driven)**: `schema.prisma` definition, `prisma migrate`, `prisma db pull`.
  - **Constraints**: PKs, FKs, Unique Indexes.
- **Hasura GraphQL Engine**:
  - API generation from PostgreSQL schema.
  - Permissions (Admin Secret, Role-based).
  - Relationships (Object/Array).
  - Custom Actions/Remote Schemas (if needed).
- **PostgreSQL 16**: SQL knowledge, indexes, triggers (rarely used directly).

## 3. Design & Architectural Constraints

- **Schema as Truth**: `schema.prisma` is the SINGLE SOURCE OF TRUTH for database structure.
- **Migration Flow**:
  1. Update `schema.prisma`.
  2. Run `migrate dev` (Local).
  3. Commit specific migration SQL.
  4. Apply via `migrate deploy` (CI/CD).
- **BFF Integration**: Hasura is accessed via `Next.js API Routes` ONLY. Never client-side direct.
- **Runtime Access**: **DO NOT use Prisma Client** for runtime data fetching in the application. Always use Relay/GraphQL via Hasura.

## 4. Coding & Documentation Standards

- **Naming**:
  - Tables: plural, snake_case (e.g., `club_contracts`).
  - Columns: snake_case (e.g., `contract_start_date`).
  - Models: PascalCase (e.g., `ClubContract`).
- **Data Integrity**:
  - Use `uuid` or `BigInt` for IDs.
  - Enforce `unique` constraints where applicable (`(season, player_id, club_id)`).
  - Add indexes for search columns (`name`, `email`).
- **Validation**: Enforce constraints in DB (Not null, Default).

## 5. Typical Tasks

- **Schema Change**: "Add `nationality` column to `players` table."
- **Migration Handling**: Create and apply a new migration for schema updates.
- **API Configuration**: Expose new tables/columns in Hasura Console or Metadata.
- **Import Scripts**: Write scripts (e.g., Node.js) to import CSV data via Prisma/Hasura for initial setup.

# TransferDesk AI Skills

This directory contains the definitions of practical skills required for AI agents to effectively contribute to the TransferDesk project. These skills are derived directly from the project's documentation in `/docs`.

## Available Skills

### 1. Document & Architecture Management (`documentation_architecture`)

- **Role**: Guardian of the Single Source of Truth (`/docs`).
- **Key Responsibility**: Ensuring architectural integrity, maintaining documentation in Japanese, and updating Mermaid diagrams.
- **Source**: `/docs/00_source_of_truth.md`, `/docs/03_architecture.md`.

### 2. Feature Development (`feature_development`)

- **Role**: Full-stack feature implementer (Frontend + Data).
- **Key Responsibility**: Building user-facing features using Feature-Sliced Design (FSD), Next.js App Router, and Relay co-location patterns.
- **Source**: `/docs/02_tech-stack.md`, `/docs/03_architecture.md`, `/docs/07_api.md`.

### 3. UI Design & Implementation (`ui_design_implementation`)

- **Role**: Visual interface specialist.
- **Key Responsibility**: Creating accessible, responsive, and high-fidelity UI components using Tailwind CSS v4 and shadcn/ui.
- **Source**: `/docs/06_ui.md`, `/docs/02_tech-stack.md`.

### 4. Data Platform Management (`data_platform_management`)

- **Role**: Backend & Database architect.
- **Key Responsibility**: Managing the PostgreSQL schema via Prisma, generating GraphQL APIs with Hasura, and handling data migrations.
- **Source**: `/docs/08_database.md`, `/docs/07_api.md`.

## Workflow

When assigning tasks, refer to these skills to understand the necessary context, constraints, and standards. Each skill's `SKILL.md` file provides detailed instructions for execution.

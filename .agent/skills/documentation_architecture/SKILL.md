---
description: Maintain the project's documentation as the Single Source of Truth, ensuring architectural integrity and consistency.
---

# Documentation & Architecture Management

## 1. Main Responsibility

Act as the guardian of the project's **Single Source of Truth**. Ensure all architectural decisions, feature specifications, and domain knowledge are accurately reflected in the `/docs` directory **before** implementation begins. This skill enforces consistency across the codebase by validating changes against documented standards.

## 2. Technical Knowledge

- **Markdown / CommonMark**: Advanced formatting, tables, and structure.
- **Mermaid.js**: Creating and maintaining diagrams (Flowcharts, Sequence, ERD, Class).
- **Japanese Technical Writing**: All documentation must be written in **Japanese** (as per `00_source_of_truth.md`).
- **Feature-Sliced Design (FSD)**: Deep understanding of the architectural layers (`app`, `views`, `widgets`, `features`, `entities`, `shared`) to document code organization correctly.

## 3. Design & Architectural Constraints

- **Doc-First Development**: No code should be written without a corresponding update or definition in `/docs`.
- **Directory Structure**:
  - `00_source_of_truth.md`: Project goals and scope (In-Scope / Out-Scope).
  - `01_overview.md` - `08_database.md`: Specific domain and technical details.
  - `INDEX.md`: Master index of all documentation.
- **Diagrams**: Use Mermaid for all visual representations of architecture and flows.

## 4. Coding & Documentation Standards

- **Language**: **Japanese** is the primary language for documentation.
- **Formatting**:
  - Use clear headings (`#`, `##`, `###`).
  - Use lists and tables for structured data.
  - Code blocks must have language specifiers (e.g., `mermaid`, `typescript`, `sql`).
- **Consistency**: Terminology must match the **Domain Model** (`05_domain.md`).
- **Versioning**: Major architectural changes require updating the relevant sections in `03_architecture.md` and potentially `00_source_of_truth.md`.

## 5. Typical Tasks

- **Update Documentation**:Reflect new features or changes in specifications.
- **Architectural Review**: Check if proposed code changes violate the constraints in `03_architecture.md` (e.g., Direct DB access from Client).
- **Diagram Maintenance**: Update Mermaid diagrams when data flow or entity relationships change.
- **Gap Analysis**: Identify discrepancies between the implementation and the documentation.

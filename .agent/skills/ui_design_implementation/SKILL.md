---
description: Design, prototype, and implement responsive, accessible UI components using Tailwind CSS and React.
---

# UI Design & Implementation

## 1. Main Responsibility

Craft the visual language and interactive elements of the application. Maintain a **Modern & Premium** aesthetic while ensuring responsiveness and accessibility across devices. Develop reusable, atomic UI components without specific business logic bindings.

## 2. Technical Knowledge

- **Tailwind CSS v4**: Utility-first CSS, Variables (`--primary`), Custom Themes, Dark Mode.
- **shadcn/ui**: Leveraging `Radix UI` primitives for accessible components (Dialog, Switch, Combobox, etc.).
- **React 19**: Component composition (`children`, strict props), refs, and state for interactions.
- **Accessibility**: A11y standards (ARIA roles, keyboard nav, contrast).

## 3. Design & Architectural Constraints

- **Design Principles**: `Clean & Modern`. Use whitespace liberally. Avoid clutter.
- **Theme Consistency**: Strictly use defined CSS variables for colors (e.g., `--background`, `--foreground`).
- **Separation of Concerns**:
  - `components/ui` MUST be devoid of domain logic (`features/`, `entities/`).
  - Components should only accept props for data/rendering.
- **Visual Feedback**:
  - Loading states (Spinners, Skeletons).
  - Toast notifications for success/error.
  - Hover/Focus states for interactivity.

## 4. Coding & Documentation Standards

- **Component Structure**:
  - `components/ui/[name].tsx`
  - Export types.
- **Tailwind Class Sorting**: Use consistent class ordering (e.g., Layout → Box Model → Visual → Misc).
- **Naming**: Consistent casing (PascalCase for components).
- **Dark Mode**: Always verify designs in BOTH Light and Dark modes.

## 5. Typical Tasks

- **Create New Primitive**: e.g., "Implement a Multi-Select Dropdown".
- **Style Optimization**: Refine padding, colors, shadows for a "premium feel".
- **Responsive Layouts**: Breakpoints (`sm:`, `md:`, `lg:`) for mobile/desktop.
- **Fix Visual Bugs**: e.g., "Fix overlap on mobile header".

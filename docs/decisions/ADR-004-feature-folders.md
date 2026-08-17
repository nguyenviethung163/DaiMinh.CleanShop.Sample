# ADR-004: Feature-Oriented MVC

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Conventional global `Controllers`, `Models`, and `Views` folders spread one feature across the project. As MVC systems grow, that increases navigation cost and makes feature ownership less clear.

## Decision

Organize storefront MVC code by business feature under `Web/Features`. Use an MVC Area for the larger administrative UI boundary.

Custom Razor view locations allow feature-local Views.

## Consequences

### Positive

- code for a user-facing feature is close together;
- easier feature ownership and deletion;
- coding agents can discover relevant files with fewer searches.

### Negative

- differs from default MVC template structure;
- developers must understand custom Razor view locations;
- shared UI still requires disciplined placement.

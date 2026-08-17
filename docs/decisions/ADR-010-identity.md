# ADR-010: ASP.NET Core Identity in Infrastructure

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Authentication credentials/roles are technical security concerns, while `Customer` is a business concept. Combining them would couple Domain to ASP.NET Core Identity.

## Decision

Use ASP.NET Core Identity with `ApplicationUser` in Infrastructure. Maintain a separate Core `Customer` aggregate and resolve the current authenticated user to a Customer in Web.

## Consequences

- Domain does not depend on Identity;
- authentication storage can evolve separately from business model;
- mapping/linkage between Identity user and Customer must be maintained and tested.

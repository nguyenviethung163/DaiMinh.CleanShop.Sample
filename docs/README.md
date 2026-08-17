# CleanShop Engineering Documentation

This directory is the canonical engineering knowledge base for CleanShop. It explains **why the system is structured this way, what rules must remain true, and how to make changes without eroding the architecture**.

## Documentation map

### Architecture

1. [Architecture overview](architecture/overview.md) — system boundaries, layers, dependency direction and runtime shape.
2. [Solution and project structure](architecture/solution-structure.md) — responsibility of every production/test project and important folders.
3. [Dependency rules](architecture/dependency-rules.md) — hard rules and forbidden references.
4. [Domain model](architecture/domain-model.md) — aggregates, entities, value objects, invariants and lifecycle.
5. [Application model](architecture/application-model.md) — use cases, handlers, ports and Result-based control flow.
6. [Lightweight CQRS](architecture/cqrs.md) — command/read paths and when each path is appropriate.
7. [Persistence architecture](architecture/persistence.md) — EF Core boundary, repositories, mappings and transaction semantics.
8. [Domain events](architecture/domain-events.md) — event lifecycle, dispatcher behavior and reliability limits.
9. [MVC presentation architecture](architecture/mvc-presentation.md) — feature-first MVC, Areas, view resolution and controller responsibilities.
10. [Identity and authorization](architecture/identity-authorization.md) — Identity boundary and business-customer resolution.
11. [Request flows](architecture/request-flow.md) — end-to-end flows for catalog, basket, checkout, payment and admin shipping.
12. [Error handling and validation](architecture/error-validation.md) — validation layers, Result pattern and exception boundary.
13. [Cross-cutting concerns](architecture/cross-cutting.md) — DI, logging, correlation IDs, security headers, time and configuration.
14. [Testing architecture](architecture/testing-strategy.md) — test pyramid, architecture tests and integration strategy.
15. [Security model](architecture/security.md) — authentication, authorization, CSRF, cookies, ownership checks and secrets.
16. [Architecture evolution](architecture/evolution.md) — when to add MediatR, Outbox, cache, modular monolith or services.
17. [Glossary](architecture/glossary.md) — common terms used in the codebase and docs.

### Architecture Decision Records

ADRs are immutable decision records. If a decision changes, add a new ADR that supersedes the old one instead of silently rewriting history.

- [ADR-001 — Clean Architecture with three production projects](decisions/ADR-001-clean-architecture.md)
- [ADR-002 — No MediatR in the baseline](decisions/ADR-002-no-mediatr.md)
- [ADR-003 — Lightweight CQRS](decisions/ADR-003-lightweight-cqrs.md)
- [ADR-004 — Feature-oriented MVC](decisions/ADR-004-feature-folders.md)
- [ADR-005 — Specifications only when useful](decisions/ADR-005-specifications-only-when-useful.md)
- [ADR-006 — Aggregate-specific repositories](decisions/ADR-006-aggregate-specific-repositories.md)
- [ADR-007 — Explicit mapping; no AutoMapper baseline](decisions/ADR-007-explicit-mapping.md)
- [ADR-008 — In-process domain events after persistence](decisions/ADR-008-domain-events.md)
- [ADR-009 — SQL Server + EF Core persistence](decisions/ADR-009-ef-core-sql-server.md)
- [ADR-010 — ASP.NET Core Identity in Infrastructure](decisions/ADR-010-identity.md)
- [ADR-011 — Result pattern for expected failures](decisions/ADR-011-result-pattern.md)
- [ADR-012 — Razor MVC, not a SPA, for the baseline](decisions/ADR-012-razor-mvc.md)

### Development guides

1. [Getting started](development/getting-started.md)
2. [Local configuration](development/configuration.md)
3. [Database](development/database.md)
4. [EF Core migrations](development/migrations.md)
5. [Adding a new feature](development/adding-feature.md)
6. [Adding/changing domain behavior](development/domain-change-guide.md)
7. [Adding a command](development/adding-command.md)
8. [Adding a query](development/adding-query.md)
9. [Adding MVC UI](development/adding-mvc-ui.md)
10. [Testing](development/testing.md)
11. [Debugging and troubleshooting](development/debugging.md)
12. [Code conventions](development/code-conventions.md)
13. [Git and review workflow](development/git-review-workflow.md)
14. [Docker workflow](development/docker.md)
15. [Production readiness checklist](development/production-readiness.md)
16. [Validation status](development/validation-status.md)

## Authority order

When documentation disagrees, use this order:

1. Executable architecture tests and compiler rules.
2. Accepted ADRs.
3. Architecture documents.
4. Development guides.
5. Examples and comments.

If implementation intentionally diverges from an accepted ADR, create a new ADR and update the affected architecture documents in the same change.

## Documentation maintenance rule

Any pull request that changes a boundary, dependency, transaction strategy, security rule, persistence approach, authentication model or feature placement must update the relevant docs. Documentation is part of the architecture, not optional project commentary.

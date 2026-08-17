# ADR-001: Clean Architecture with Three Production Projects

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

The application needs strong separation between business policy, persistence/vendor details and MVC concerns, but the baseline should remain easy to navigate and deploy. Splitting Domain, Application, Contracts and SharedKernel into separate projects would create additional project/package ceremony without a demonstrated isolation need.

## Decision

Use three production projects:

- `CleanShop.Core` — Domain, Application and Core-owned ports;
- `CleanShop.Infrastructure` — technical adapters and persistence;
- `CleanShop.Web` — MVC presentation and composition root.

Dependencies point inward: Infrastructure -> Core, Web -> Core/Infrastructure. Core references neither outer project.

## Consequences

### Positive

- business code can be tested without EF/MVC;
- dependency direction is easy to explain and enforce;
- fewer assemblies/project references than multi-project Clean Architecture templates;
- Infrastructure implementations can change without redesigning Domain.

### Negative

- Domain and Application are separated by namespace/folder rather than assembly boundary;
- developers must respect internal logical boundaries inside Core;
- Web references Infrastructure for composition/bootstrap.

## Rejected alternatives

### Single project

Simpler physically, but weaker compile-time dependency boundary and easier accidental EF/Web leakage into business code.

### Domain/Application/Infrastructure/Web projects

Valid, but unnecessary for the baseline. Reconsider if independent packaging or stronger assembly enforcement becomes valuable.

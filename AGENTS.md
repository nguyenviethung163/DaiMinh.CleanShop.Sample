# AGENTS.md

Read `docs/architecture/dependency-rules.md` before editing.

When adding a write feature: define command + handler in `Core/Application/<Feature>/<UseCase>`, keep invariants on aggregates, add/extend an aggregate repository only when persistence of an aggregate root is required, then expose it through a thin MVC controller.

When adding a query: define a DTO and read port in Core; implement projection in Infrastructure. Do not add EF Core to Core.

Never introduce MediatR, AutoMapper, generic repositories, catch-all service/helper folders, direct DbContext usage from customer-facing MVC controllers, or a new production project without an ADR.

Every domain rule change needs a unit test. Every dependency rule change needs an architecture-test review.

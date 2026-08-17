# Persistence Architecture

## 1. Boundary

Persistence is an Infrastructure detail. Domain classes are persistence-ignorant: they do not carry EF Core mapping attributes or depend on EF packages.

`AppDbContext` lives in `CleanShop.Infrastructure/Persistence` and inherits `IdentityDbContext<ApplicationUser>` so one SQL Server database stores both application data and Identity tables in the baseline.

## 2. Mapping

Entity configuration lives under:

```text
Infrastructure/Persistence/Configurations/
```

This keeps table/column/key/relationship decisions outside Domain.

When changing a domain type, update the corresponding EF configuration and migration in the same change.

## 3. Repository model

Core defines aggregate-specific repositories:

- `IProductRepository`
- `IBasketRepository`
- `IOrderRepository`
- `ICustomerRepository`
- `IPaymentRepository`

Infrastructure implements these against `AppDbContext`.

Repositories exist to load/persist aggregates for behavioral use cases. They are not a replacement LINQ API and should not become generic query engines.

## 4. Shared scoped DbContext

`AddDbContext<AppDbContext>` registers the context as scoped by default. Repository implementations in the same HTTP request receive the same context instance.

This enables a handler such as `CreateOrderHandler` to change Product, Basket and Order and then persist tracked changes together with one `SaveChangesAsync` call.

## 5. SaveChanges and transactions

A single relational EF Core `SaveChangesAsync` is transactional for the tracked changes it submits. CleanShop therefore uses one save call for a logical atomic write where possible.

Avoid multiple `SaveChangesAsync` calls inside one use case unless partial commits are intentional and documented.

## 6. Domain events during SaveChanges

`AppDbContext.SaveChangesAsync` currently:

1. finds tracked aggregate roots with domain events;
2. copies their pending events;
3. executes `base.SaveChangesAsync`;
4. clears aggregate event buffers;
5. dispatches events in-process.

Important implication: **event handlers run after the database save, but still inside the request process and without an Outbox**. If event handling fails, the data may already be committed. See [Domain events](domain-events.md).

## 7. Read services

Read-side classes live under:

```text
Infrastructure/Persistence/ReadModels/
```

They implement Core read ports and project EF queries directly to application DTOs. Prefer:

- `AsNoTracking()` for read-only queries;
- projection before materialization;
- selecting only fields needed by the screen/use case;
- server-side filtering/sorting/pagination.

## 8. Specifications

Specifications are used only when a reusable domain-oriented query predicate has value. `ActiveProductsSpecification` is the baseline example.

Infrastructure translates the Core specification expression into EF filtering through `SpecificationExtensions`.

Do not create a new specification for every primary-key lookup or one-off View projection.

## 9. Migrations

Migrations belong under:

```text
Infrastructure/Persistence/Migrations/
```

The generated baseline intentionally does not contain a fabricated migration because the chat runtime had no .NET SDK. Generate the initial migration on a machine with the pinned SDK and commit it before migration-first deployment.

## 10. Persistence review checklist

- Did a persistence annotation leak into Domain?
- Does the repository represent an aggregate root?
- Could a read be a direct projection instead of aggregate hydration?
- Does the use case have one intentional commit point?
- Does the mapping preserve private setters/backing collections/value objects?
- Does schema evolution have a reviewed migration?

# ADR-006: Aggregate-Specific Repositories

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

A generic `IRepository<T>` exposes persistence operations uniformly, but Domain objects do not have uniform lifecycle/consistency semantics. Child entities should not be persisted independently of their aggregate.

## Decision

Define repositories per Aggregate Root (`IOrderRepository`, `IBasketRepository`, etc.). Do not create repositories for `OrderItem` or `BasketItem`. Do not add a baseline generic repository.

## Consequences

### Positive

- repository APIs communicate aggregate intent;
- aggregate boundaries remain visible;
- fewer accidental independent writes to child entities.

### Negative

- some small method signatures repeat;
- repository design requires domain understanding rather than generic CRUD generation.

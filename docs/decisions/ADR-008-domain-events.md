# ADR-008: In-Process Domain Events After Persistence

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Aggregates should announce meaningful facts without depending on email/logging adapters. The baseline does not require durable distributed event delivery.

## Decision

Aggregates collect `IDomainEvent` records. `AppDbContext.SaveChangesAsync` persists database changes first, clears event buffers, then dispatches events synchronously in-process through `IDomainEventDispatcher`.

## Consequences

### Positive

- Domain remains decoupled from side effects;
- simple infrastructure with no broker/background worker;
- handlers can react to business facts.

### Negative

- DB commit may succeed even if event handler later fails;
- process crash can lose a post-commit side effect;
- not suitable for guaranteed integration delivery.

## Evolution

Adopt a transactional Outbox and asynchronous dispatcher when reliable external delivery becomes a requirement.

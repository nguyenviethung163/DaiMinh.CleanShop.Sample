# ADR-002: No MediatR in the Baseline

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Many Clean Architecture templates route every command/query through a mediator. This can be useful when substantial pipeline behavior exists, but it adds indirection and a framework abstraction to every use case.

## Decision

Application handlers are plain DI services and controllers inject the required handler directly.

Example flow:

```text
CheckoutController -> CreateOrderHandler -> repositories/aggregates
```

## Consequences

### Positive

- dependencies are explicit in constructors;
- debugging/navigation is straightforward;
- fewer packages and conventions;
- easier for new developers and coding agents to trace behavior.

### Negative

- no built-in global handler pipeline;
- cross-cutting handler behavior may require decorators or explicit code;
- controllers can have several handler dependencies as features grow.

## Reconsider when

Multiple handlers need the same validation, transaction, authorization, idempotency or tracing pipeline and the mediator reduces more complexity than it introduces.

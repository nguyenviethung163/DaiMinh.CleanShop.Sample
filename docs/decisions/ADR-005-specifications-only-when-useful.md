# ADR-005: Specifications Only When Useful

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Specification Pattern is useful for reusable business-oriented query policy, but creating a specification for every lookup produces files/abstractions without added meaning.

## Decision

Use specifications selectively. `ActiveProductsSpecification` demonstrates a reusable predicate. Trivial ID lookup and one-off read projection should remain direct query/repository code.

## Consequences

- fewer ceremonial classes;
- reusable policies still have a named home;
- reviewers must judge whether reuse/domain meaning is sufficient to justify a specification.

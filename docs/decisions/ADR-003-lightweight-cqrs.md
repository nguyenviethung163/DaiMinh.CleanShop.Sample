# ADR-003: Lightweight CQRS

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Rich aggregates are valuable for writes but inefficient/awkward for many screens. A catalog/order list needs shaped read data, not a fully hydrated behavior model.

## Decision

Separate command and query code paths while keeping one SQL Server database.

- writes use handlers + aggregates + aggregate repositories;
- reads use handlers + Core read ports + Infrastructure EF projections;
- no event sourcing;
- no separate read database.

## Consequences

### Positive

- domain model stays focused on behavior;
- efficient read projections;
- no distributed consistency overhead;
- screen DTOs can evolve separately from aggregates.

### Negative

- two paths to understand;
- some duplicated shapes/names are expected;
- developers must choose correctly between behavioral load and projection.

## Rejected alternative

Using repositories/aggregates for every query would simplify conceptual paths but couples presentation reads to domain persistence shape and performs unnecessary hydration.

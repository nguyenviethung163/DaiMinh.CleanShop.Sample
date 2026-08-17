# ADR-007: Explicit Mapping; No AutoMapper Baseline

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Mapping libraries can reduce repetitive property assignment, but they add configuration/implicit behavior and can hide expensive query mappings when mixed with EF projections.

## Decision

Use explicit construction/projection for Domain/Application/Web mappings in the baseline. Do not add AutoMapper by default.

## Consequences

- mapping is searchable and debugger-friendly;
- EF projection remains obvious;
- compile-time refactoring catches more mismatches;
- some explicit mapping code is accepted as useful duplication.

Reconsider only when measured mapping complexity exceeds the clarity cost and mapping behavior can remain explicit/testable.

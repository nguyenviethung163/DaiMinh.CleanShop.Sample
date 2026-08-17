# ADR-011: Result Pattern for Expected Failures

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

Not-found, validation and conflict outcomes are expected business/application conditions. Throwing exceptions for normal branch outcomes obscures API contracts and encourages broad exception handling.

## Decision

Application handlers return `Result` / `Result<T>` for expected failures. Exceptions remain for unexpected infrastructure/runtime failures and invariant violations that indicate invalid orchestration.

## Consequences

- success/failure contract is explicit;
- controllers can deliberately translate outcomes;
- call sites must handle Results rather than assuming success;
- a consistent error taxonomy must be maintained.

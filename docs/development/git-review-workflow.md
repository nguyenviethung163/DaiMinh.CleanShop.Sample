# Git and Review Workflow

## Branch/change scope

Prefer small changes that complete one coherent behavior. Architecture refactors should be separated from unrelated feature changes when possible.

## Commit expectations

A feature change should include the code, tests and docs needed to keep the repository internally consistent.

## Pull request checklist

### Architecture

- dependency direction preserved;
- no DbContext/controller leakage;
- business rule located in the owning aggregate;
- read vs write path chosen intentionally;
- new dependency/package justified.

### Security

- authentication/role/ownership considered;
- anti-forgery on state-changing MVC forms;
- no secrets/PII leaked to logs/config;
- user-controlled IDs authorized server-side.

### Persistence

- migration reviewed if schema changed;
- transaction boundary intentional;
- no N+1/over-fetching in new read model;
- data backfill compatibility considered.

### Tests

- domain/application regression coverage;
- architecture tests still pass;
- integration test added for provider/wiring behavior when needed.

### Documentation

- architecture docs updated for policy/boundary changes;
- ADR added for a new architectural decision;
- developer workflow docs updated if commands/process changed.

## ADR rule

Do not rewrite an accepted ADR to pretend history was different. Add a superseding ADR and link both records.

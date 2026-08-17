# ADR-009: EF Core with SQL Server

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

The application needs relational consistency, transactions, Identity persistence and straightforward .NET tooling.

## Decision

Use EF Core 10 with SQL Server as the baseline provider. Keep EF mapping/configuration in Infrastructure and keep Domain persistence-ignorant.

## Consequences

- strong .NET/Identity integration;
- relational transaction semantics for aggregate workflows;
- migrations become a required deployment artifact;
- provider-specific behavior must be covered by SQL Server integration tests when important.

A future provider change is possible but not assumed to be free; schema/SQL behavior must be retested.

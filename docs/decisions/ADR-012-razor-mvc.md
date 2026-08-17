# ADR-012: Razor MVC Instead of SPA for the Baseline

- **Status:** Accepted
- **Date:** 2026-08-17

## Context

The learning/reference goal is ASP.NET Core MVC architecture. A SPA framework would introduce a second build/runtime architecture and distract from server-side layering without a product requirement.

## Decision

Use ASP.NET Core MVC + Razor Views + Bootstrap/vanilla browser behavior for the baseline.

## Consequences

- one application stack and deployment;
- server-rendered forms align naturally with Identity/anti-forgery;
- less frontend complexity;
- highly interactive experiences may later justify an API/SPA adapter, but business logic must remain in Core/Application.

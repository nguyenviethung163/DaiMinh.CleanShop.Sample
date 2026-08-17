# Architecture Evolution Guide

## 1. Principle

Do not add infrastructure because it is fashionable. Add complexity only when a measured requirement cannot be met cleanly by the current design.

## 2. MediatR / mediator

Consider a mediator when many handlers consistently require shared pipelines such as:

- validation;
- authorization;
- tracing;
- transaction behavior;
- idempotency;
- metrics.

If only a few cross-cutting behaviors exist, decorators or explicit code may remain simpler.

## 3. Outbox and message broker

Add an Outbox before relying on domain/integration event delivery across process boundaries. A broker such as RabbitMQ/Kafka should follow an integration need, not precede one.

Trigger examples:

- must reliably notify another service after commit;
- asynchronous workloads need independent scaling;
- side effects must survive app crashes.

## 4. Cache / Redis

Add caching only after identifying expensive, repeated reads and defining invalidation/staleness rules.

Do not cache writes/aggregates as a default abstraction. Start with read-model caching where consistency requirements are explicit.

## 5. Modular monolith

If the codebase grows substantially, evolve feature/domain boundaries into modules while keeping one deployment first.

Signals:

- independent teams own distinct business capabilities;
- namespaces/tables become highly coupled across domains;
- change frequency differs strongly by module;
- module-specific policies need stronger enforcement.

A modular monolith is usually the next step before microservices.

## 6. Microservices

Consider service extraction only when a module has a compelling independent deployment/scale/availability/ownership need and the organization can operate distributed systems safely.

Extraction costs include:

- network failure and timeouts;
- eventual consistency;
- idempotency;
- observability;
- contract/version management;
- distributed security;
- operational overhead.

## 7. Real payment provider

This is an architectural change, not a simple adapter swap, if timeouts can leave payment outcome unknown. Introduce idempotency, persisted payment attempt state, provider reference, webhook/reconciliation workflow and explicit state machine before production use.

## 8. Separate read database

Only introduce when measured read load/data shape demands it. Define synchronization method, freshness SLO and failure behavior first.

## 9. API/SPA

A JSON API can be added as another adapter around the same Application/Core. Do not move business logic into API controllers. A SPA is a product/UI decision, not an architecture upgrade by itself.

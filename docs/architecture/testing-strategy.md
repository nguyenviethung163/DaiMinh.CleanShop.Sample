# Testing Architecture

## 1. Goals

Tests should provide fast confidence in business rules and targeted confidence in framework integration.

```text
          E2E / hosted integration      few
        Integration / persistence       some
     Application handler unit tests     many
        Domain invariant tests          many
        Architecture fitness tests      always
```

## 2. Domain tests

Highest-value unit tests target invariant/state behavior.

Examples already present:

- `OrderTests`
- `BasketTests`
- `MoneyTests`

Prefer behavior names such as:

```text
SubmittingEmptyOrderFails
PaidOrderCanBeShipped
NegativeMoneyIsRejected
```

rather than implementation names.

## 3. Application tests

Handlers are plain classes, so they can be tested with fake/in-memory ports without an MVC host.

`CreateOrderHandlerTests` should verify orchestration outcomes such as stock reservation, order creation and basket clearing, while Domain tests verify the detailed aggregate rules.

## 4. Architecture tests

`CleanShop.ArchitectureTests` protects static boundaries. Architecture tests are cheap and should be extended as new hard rules become important.

Potential future rules:

- Infrastructure repositories implement only Core repository ports;
- Domain types do not reference `Microsoft.Extensions.*` abstractions;
- controllers reside only in Web;
- application handlers do not depend on Web or Infrastructure namespaces.

## 5. Integration tests

Integration tests should use a disposable SQL Server-compatible database when testing EF mappings/query semantics. SQLite/InMemory can hide provider-specific SQL Server behavior and should not be treated as equivalent for all persistence tests.

Recommended future approach:

- Testcontainers for SQL Server;
- one database/container per test collection or isolated database strategy;
- apply migrations on test startup;
- deterministic seed/factory data;
- `WebApplicationFactory<Program>` for HTTP-level tests.

## 6. What to mock

Mock/fake true boundaries such as:

- payment gateway;
- clock;
- email sender;
- repository/read ports in handler unit tests.

Do not mock internal domain entities. Instantiate them and execute real behavior.

## 7. Regression rule

Every bug fix should add the smallest test that would have caught the bug at the correct layer.

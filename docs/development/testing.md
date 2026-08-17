# Testing Guide

## Run all tests

```bash
dotnet test CleanShop.sln -c Release
```

## Run a project

```bash
dotnet test tests/CleanShop.UnitTests/CleanShop.UnitTests.csproj
dotnet test tests/CleanShop.ArchitectureTests/CleanShop.ArchitectureTests.csproj
```

## Filter

```bash
dotnet test --filter FullyQualifiedName~OrderTests
```

## Test naming

Prefer names that describe behavior and expected outcome:

```text
Submit_EmptyOrder_ThrowsDomainException
Pay_SubmittedOrder_MarksOrderPaid
CreateOrder_InsufficientStock_ReturnsConflict
```

Exact style may evolve, but behavior must be obvious from test output.

## Domain tests

No database, no web host, no mocks of Domain objects. Construct real aggregates/value objects and exercise methods.

## Handler unit tests

Use fakes/mocks for ports. Verify business orchestration and returned Result, not private implementation details.

## Integration tests

Recommended target setup:

- `WebApplicationFactory<Program>`;
- SQL Server Testcontainer;
- migrations applied automatically;
- isolated test data;
- fake payment/email adapters where external I/O would otherwise occur.

## Architecture tests

Treat failures as architecture regressions. Do not “fix” them by weakening/removing a rule without an ADR explaining the policy change.

## Coverage

Coverage percentage is secondary to behavior coverage. High priority:

- aggregate state transitions;
- authorization ownership paths;
- payment/order consistency;
- EF mappings and critical projections;
- migration upgrade behavior for risky schema changes.

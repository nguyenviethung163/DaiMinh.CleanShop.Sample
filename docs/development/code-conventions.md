# Code Conventions

## Compiler policy

Repository-wide build policy is defined in `Directory.Build.props`; package versions are centralized in `Directory.Packages.props`.

Respect nullable reference types and warnings-as-errors policy where configured. Do not suppress warnings globally to unblock one local issue.

## Naming

- Aggregate/entity/value-object: domain noun (`Order`, `Money`).
- State-changing method: business verb (`Submit`, `Ship`, `Reserve`).
- Use case: verb+noun (`CreateOrder`, `PayOrder`).
- Domain event: past-tense fact (`OrderSubmittedDomainEvent`).
- Port: capability-oriented interface (`IPaymentGateway`, `IOrderReadService`).

Avoid vague types such as `OrderManager`, `CommonService`, `Helper`, `Utils`.

## Async

- suffix public async methods with `Async`;
- pass `CancellationToken` through I/O boundaries;
- do not use `.Result` / `.Wait()` in request code.

## Constructors and DI

Use constructor injection. A rapidly growing constructor is a design signal: the class may be coordinating too many responsibilities.

## Nullability

Model absence explicitly with nullable types and check it. Do not scatter null-forgiving (`!`) to silence design problems.

## Mapping

Prefer explicit mapping/projection. Keep Web formatting concerns out of Domain.

## Comments

Comment **why**, constraints or non-obvious trade-offs. Do not narrate straightforward code line-by-line.

## File placement

Business feature first. Technical adapter second. Never create a catch-all folder to avoid deciding ownership.

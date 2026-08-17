# Adding a Command / Write Use Case

## Folder

```text
Core/Application/<Feature>/<UseCase>/
```

## Template

```csharp
public sealed record DoThingCommand(/* boundary values */);

public sealed class DoThingHandler(/* Core ports */)
{
    public async Task<Result> HandleAsync(DoThingCommand command, CancellationToken ct)
    {
        // 1. Load required aggregate roots.
        // 2. Return Result failure for expected missing/conflict conditions.
        // 3. Invoke aggregate behavior.
        // 4. Persist once at the intentional transaction boundary.
        // 5. Return Result.Success().
    }
}
```

## Rules

- do not inject `AppDbContext` into Core;
- do not put MVC types (`IActionResult`, `ModelState`) in handlers;
- use `CancellationToken` for async I/O;
- avoid multiple commits unless intentionally partial;
- domain methods enforce invariants;
- use a port for external I/O;
- do not catch and hide unexpected infrastructure exceptions.

## Controller usage

```text
HTTP form -> validate -> command -> handler -> translate Result -> redirect/view
```

## Test cases

At least:

- happy path;
- not-found dependency;
- conflict/precondition failure;
- important interaction/state effect;
- cancellation if behavior has meaningful long-running I/O.

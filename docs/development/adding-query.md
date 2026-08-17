# Adding a Query / Read Model

## 1. Define the screen/use-case shape

Create the smallest DTO needed by the consumer. Do not expose a persistence entity simply because fields are similar.

## 2. Define Core read port

When Infrastructure data access is needed, define a focused interface under `Core/Abstractions/ReadModels`.

Avoid generic interfaces like:

```text
IQueryRepository<T>
IReadRepository<T>
```

unless a real cross-feature abstraction emerges.

## 3. Implement EF projection

In `Infrastructure/Persistence/ReadModels`:

- use `AsNoTracking` for read-only data;
- filter before materialization;
- project in SQL to DTO fields;
- order explicitly;
- paginate large result sets;
- avoid N+1 queries.

## 4. Query handler

Keep the Application handler small; it may simply delegate to the read port when no additional application logic is needed.

## 5. Do not load aggregates for display only

Use repositories/aggregates only if the caller needs Domain behavior or consistency semantics, not just because they already exist.

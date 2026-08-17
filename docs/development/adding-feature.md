# Adding a New Feature

## Goal

A feature should be discoverable by business capability and preserve dependency direction.

## Step 1 — Define behavior and ownership

Write down:

- actor;
- use case;
- input;
- expected success;
- expected failures;
- aggregate(s) whose state changes;
- read data needed by the UI;
- authorization/ownership rules.

Do not start by creating Controller/Repository files.

## Step 2 — Model Domain changes

If new business behavior exists, add it to the aggregate that owns the invariant. Add Domain tests first or alongside the implementation.

## Step 3 — Add Application use case

For a write:

```text
Core/Application/<Feature>/<UseCase>/
    <UseCase>Command.cs
    <UseCase>Handler.cs
```

For a read:

```text
Core/Application/<Feature>/<Query>/
    <Query>Handler.cs
```

Add/extend a Core port only when the Application requires an external capability.

## Step 4 — Implement Infrastructure adapter

Add repository/read-service/vendor implementation under the capability folder. Register it in `Infrastructure.DependencyInjection`.

## Step 5 — Add MVC adapter

Place storefront behavior under `Web/Features/<Feature>` or a justified Area. Keep controller orchestration thin.

## Step 6 — Tests

Minimum expectation:

- Domain tests for new invariants;
- handler tests for orchestration/failure paths;
- integration test if EF mapping/query/wiring is non-trivial;
- architecture test if a new hard boundary was introduced.

## Step 7 — Documentation

Update:

- relevant architecture doc;
- ADR if the feature changes architecture policy;
- development guide if a recurring workflow changed.

## Example decision tree

```text
Does this change state?
  yes -> command handler -> aggregate behavior -> repository
  no  -> query handler -> read port -> projection

Does it require external I/O?
  yes -> Core port + Infrastructure adapter

Is it UI-only formatting/input?
  yes -> Web ViewModel/View
```

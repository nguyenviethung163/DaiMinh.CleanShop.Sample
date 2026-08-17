# EF Core Migrations

## Principle

Schema changes are code changes. Migration files must be reviewed, committed and deployed in a controlled way.

## Create a migration

From repository root:

```bash
dotnet tool restore

dotnet ef migrations add <Name> \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web \
  --output-dir Persistence/Migrations
```

Example:

```bash
dotnet ef migrations add InitialCreate \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web \
  --output-dir Persistence/Migrations
```

## Apply locally

```bash
dotnet ef database update \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web
```

## Migration review checklist

Before commit:

- Does generated schema match the intended aggregate/value-object mapping?
- Any unexpected drop/recreate operation?
- Any potentially destructive column type/nullability change?
- Is data migration/backfill required before making a column non-null?
- Are indexes/unique constraints correct?
- Does Identity schema change unexpectedly?
- Does migration work against an empty DB and an upgraded representative DB?

## Renames

EF may interpret a rename as drop+add. Manually adjust migration to a rename operation when preserving data is required.

## Production

Do not rely on ad-hoc developer machines to mutate production. Use an explicit deployment step, reviewed migration bundle/script or controlled startup migration policy appropriate to the environment.

For zero/low-downtime changes, prefer expand-and-contract schema evolution when old/new versions overlap.

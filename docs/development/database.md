# Database Development Guide

## Provider

CleanShop uses SQL Server through EF Core. `AppDbContext` also hosts ASP.NET Core Identity tables.

## Local database

The preferred local path is the SQL Server service from `docker-compose.yml`.

```bash
docker compose up -d db
```

Inspect logs:

```bash
docker compose logs -f db
```

## Ownership of schema mappings

All EF configuration belongs under:

```text
src/CleanShop.Infrastructure/Persistence/Configurations/
```

Do not add `[Table]`, `[Column]`, `[Owned]`, `[Key]` or other persistence-specific attributes to Domain solely for EF convenience.

## Read/write discipline

- behavioral writes: aggregate repositories;
- presentation reads: read-service projections;
- no `AppDbContext` in Web controllers;
- no EF Core references in Core.

## Data seeding

`DbInitializer` seeds development/reference data and Identity roles/users needed by the demo. Treat seed credentials as development-only.

Seed logic should be idempotent: rerunning startup must not duplicate records.

## Reset local database

For disposable development data, prefer dropping/recreating explicitly rather than manually editing migration history.

```bash
dotnet ef database drop --force \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web

dotnet ef database update \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web
```

Never use this against shared/production databases.

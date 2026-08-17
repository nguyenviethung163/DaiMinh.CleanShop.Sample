# Debugging and Troubleshooting

## Build first

```bash
dotnet build CleanShop.sln
```

Fix compile/package issues before debugging runtime behavior.

## Database connection failures

Check:

```bash
docker compose ps
docker compose logs db
```

Then verify `ConnectionStrings:DefaultConnection` and SQL Server port/container health.

## Migration mismatch

```bash
dotnet ef migrations list \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web
```

Compare applied migration history to committed migration files. Avoid manually editing `__EFMigrationsHistory` except as part of an intentional recovery procedure.

## Razor view not found

Verify:

- controller name matches feature folder;
- view file is under `/Features/<Controller>/<View>.cshtml`;
- `_ViewImports.cshtml` / `_ViewStart.cshtml` are present where expected;
- Area views use Area conventions rather than storefront feature locations.

## Authorization/404 on Order

Check both authentication and business Customer linkage. Order endpoints intentionally return not found when the order is missing **or belongs to another customer**.

## DomainException

A `DomainException` normally means an invalid state transition reached an aggregate. Inspect the Application handler: it may need a precondition Result check, or the caller may contain a real logic bug.

## Domain event side effect failed

Remember DB state may already be committed because current event dispatch runs after `base.SaveChangesAsync`. Inspect event-handler logs separately from transaction outcome.

## Correlation IDs

Use the correlation identifier from request logs to connect middleware/adapter logs from one HTTP request.

# Migrations

The chat runtime used to generate this repository did not contain the .NET SDK, so EF tooling could not emit a trustworthy compiled migration. For immediate learning/demo use, `DbInitializer` falls back to `EnsureCreatedAsync` when no migrations exist.

On your local .NET 10 environment, create the initial migration before long-lived development:

```bash
dotnet ef migrations add InitialCreate --project src/CleanShop.Infrastructure --startup-project src/CleanShop.Web --output-dir Persistence/Migrations
```

Then delete/recreate any database previously created with `EnsureCreated`, and use migrations from that point onward.

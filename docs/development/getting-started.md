# Getting Started

## Prerequisites

- .NET 10 SDK matching `global.json` (or a compatible roll-forward policy if configured)
- Docker Desktop/Engine for the local SQL Server container
- Git
- optional: Visual Studio, Rider or VS Code/C# Dev Kit

## 1. Verify SDK

```bash
dotnet --info
```

## 2. Restore local tools and packages

```bash
dotnet tool restore
dotnet restore CleanShop.sln
```

## 3. Start SQL Server

```bash
docker compose up -d db
docker compose ps
```

Wait until the database health check reports healthy.

## 4. Create/apply migrations

If `InitialCreate` has not yet been generated:

```bash
dotnet ef migrations add InitialCreate \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web \
  --output-dir Persistence/Migrations
```

Apply:

```bash
dotnet ef database update \
  --project src/CleanShop.Infrastructure \
  --startup-project src/CleanShop.Web
```

## 5. Run

```bash
dotnet run --project src/CleanShop.Web
```

Use the URL shown by the host or `Properties/launchSettings.json`.

## 6. Build/test baseline

```bash
dotnet build CleanShop.sln -c Release
dotnet test CleanShop.sln -c Release
```

Do this before making feature changes so you know whether failures are pre-existing.

## 7. Recommended reading order

1. `docs/architecture/overview.md`
2. `docs/architecture/dependency-rules.md`
3. `docs/architecture/request-flow.md`
4. `Core/Application/Orders/CreateOrder/CreateOrderHandler.cs`
5. `Core/Domain/Orders/Order.cs`
6. `Infrastructure/Persistence/AppDbContext.cs`
7. `Web/Features/Checkout/CheckoutController.cs`

That path follows the main write flow end-to-end.

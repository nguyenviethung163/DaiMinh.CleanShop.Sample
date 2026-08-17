# CleanShop

CleanShop is a learning-oriented ASP.NET Core MVC reference application inspired by the architectural ideas in Microsoft's eShopOnWeb, modernized around feature-oriented MVC, use-case handlers, rich domain models, lightweight CQRS, explicit mappings, and restrained infrastructure abstractions.

## Stack

- .NET 10 / ASP.NET Core MVC
- EF Core 10.0.10 + SQL Server
- ASP.NET Core Identity
- Razor Views + Bootstrap
- xUnit + NetArchTest
- Docker Compose

## Architecture

Production projects are intentionally limited to three:

- `CleanShop.Core`: domain + application use cases + ports.
- `CleanShop.Infrastructure`: EF Core, Identity, read models, repositories and external adapters.
- `CleanShop.Web`: MVC/Razor UI and composition root.

Dependency rule: `Web -> Core`, `Web -> Infrastructure`, `Infrastructure -> Core`; Core never references the outer projects.

## Run locally

Prerequisites: .NET 10 SDK 10.0.400 (or a compatible newer .NET 10 SDK) and Docker Desktop (or a reachable SQL Server).

```bash
docker compose up -d db
dotnet tool restore
dotnet restore CleanShop.sln
dotnet ef database update --project src/CleanShop.Infrastructure --startup-project src/CleanShop.Web
dotnet run --project src/CleanShop.Web
```

At startup, the demo applies migrations when they exist; when the repository has no generated migration yet, it falls back to `EnsureCreatedAsync` so the sample can still start. Once you generate `InitialCreate`, recreate the development database and use migrations from then on.

### In-memory database

For a temporary local database without SQL Server, set `Database__Provider=InMemory` before running the Web project. The data is reset when the application stops.

```bash
$env:Database__Provider = "InMemory" # PowerShell
dotnet run --project src/CleanShop.Web
```

For Docker Compose, use `DATABASE_PROVIDER=InMemory docker compose up --build`. The `db` service may still start because it remains a dependency of the default Compose configuration.

Demo users (development seed):

- `admin@cleanshop.local` / `CleanShop123!`
- `customer@cleanshop.local` / `CleanShop123!`

## Important note about migrations

This generated repository contains EF mappings, a design-time factory, and startup schema logic, but the chat execution environment did not have the .NET SDK, so an initial EF migration could not be generated or compile-verified here. On a machine with .NET 10, run:

```bash
dotnet ef migrations add InitialCreate --project src/CleanShop.Infrastructure --startup-project src/CleanShop.Web --output-dir Persistence/Migrations
dotnet ef database update --project src/CleanShop.Infrastructure --startup-project src/CleanShop.Web
```

Then run `dotnet build` and `dotnet test`.

## Feature flows

Customer: Catalog -> Product Details -> Add to Basket -> Checkout -> Order -> Order History.

Admin: Identity login -> Admin Products -> Create/Edit Product -> Admin Orders -> Ship eligible order.

## Design choices

No MediatR, AutoMapper, generic repositories, microservices, event bus or SPA framework are used in the baseline. Query read models are abstracted behind Core ports rather than injecting EF Core into Core, preserving the dependency rule while retaining lightweight CQRS.

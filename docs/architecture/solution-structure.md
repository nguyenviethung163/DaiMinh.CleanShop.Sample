# Solution and Project Structure

## Repository root

```text
CleanShop/
├── .config/                  local .NET tools
├── .github/                  CI configuration
├── docs/                     engineering knowledge base
├── src/                      production source
├── tests/                    automated tests
├── AGENTS.md                 coding-agent instructions
├── CLAUDE.md                 Claude entry point
├── CleanShop.sln
├── Directory.Build.props     repository-wide compiler/build policy
├── Directory.Packages.props  central package versions
├── Dockerfile
├── docker-compose.yml
├── global.json               SDK selection
└── README.md
```

## `CleanShop.Core`

Core contains code whose meaning should remain valid even if SQL Server, Razor or ASP.NET Core Identity are replaced.

```text
CleanShop.Core/
├── Abstractions/
│   ├── Email/
│   ├── Events/
│   ├── Payments/
│   ├── Persistence/
│   ├── ReadModels/
│   └── Time/
├── Application/
│   ├── Basket/
│   ├── Catalog/
│   └── Orders/
├── Domain/
│   ├── Basket/
│   ├── Catalog/
│   ├── Customers/
│   ├── Orders/
│   └── Payments/
├── SharedKernel/
└── DependencyInjection.cs
```

### Placement rule

Ask: **Would this code still make sense if we changed the web framework or database?**

- If yes and it expresses business/application policy, Core is probably correct.
- If it performs technical I/O, it belongs outside Core.

## `CleanShop.Infrastructure`

Infrastructure implements Core contracts and owns framework/vendor integration.

```text
CleanShop.Infrastructure/
├── Email/
├── Events/
├── Identity/
├── Payments/
├── Persistence/
│   ├── Configurations/
│   ├── Migrations/
│   ├── ReadModels/
│   ├── Repositories/
│   └── Specifications/
├── Time/
└── DependencyInjection.cs
```

Infrastructure may depend on Core. Core must never depend back on Infrastructure.

## `CleanShop.Web`

Web is the HTTP/presentation adapter and composition root.

```text
CleanShop.Web/
├── Areas/Admin/              large functional MVC partition
├── Features/                 storefront feature-first MVC
├── Shared/
│   ├── Extensions/
│   ├── Middleware/
│   └── Services/
├── Views/Shared/
├── wwwroot/
├── Program.cs
├── DependencyInjection.cs
└── appsettings*.json
```

### Feature-first rule

Storefront code is grouped around behavior users recognize (`Catalog`, `Basket`, `Checkout`, `Orders`) rather than global technical buckets such as a giant `Controllers` folder.

### Area rule

A large UI boundary with its own authorization and navigation can use an MVC Area. `Admin` is the current example.

## Test projects

### `CleanShop.UnitTests`

Tests deterministic Domain/Application behavior without real infrastructure.

### `CleanShop.IntegrationTests`

Exercises cross-component behavior where framework wiring, persistence or HTTP hosting matters. The current baseline is a scaffold and is expected to grow with a disposable database strategy.

### `CleanShop.ArchitectureTests`

Checks dependency rules using NetArchTest. These tests protect architecture against gradual erosion.

## Folder anti-patterns

Do not create generic catch-all folders such as:

```text
Helpers/
Utils/
Managers/
CommonServices/
Repositories/GenericRepository.cs
```

If a class cannot be placed without one of these buckets, first identify the actual capability or feature it belongs to.

# Validation Status

Generated on 2026-08-17.

## Performed in the chat runtime

- Parsed every JSON file successfully.
- Parsed every `.csproj` and `.props` XML file successfully.
- Verified every `ProjectReference` target exists.
- Verified no empty source/configuration files.
- Verified `CleanShop.Core` has no textual dependency on `CleanShop.Infrastructure`, `CleanShop.Web`, `Microsoft.EntityFrameworkCore`, or `Microsoft.AspNetCore`.
- Verified MVC feature/admin controllers do not reference `AppDbContext` directly.
- Verified feature and Admin Razor trees include `_ViewImports.cshtml`.
- Performed a basic balanced-brace scan across all C# files.
- Verified package baseline against current package sources: Microsoft EF Core / ASP.NET Core packages are pinned to 10.0.11.

## Not possible in the chat runtime

The runtime does not contain the .NET SDK, and outbound shell networking is unavailable, so these commands could not be executed here:

```bash
dotnet restore
dotnet build
dotnet test
dotnet ef migrations add InitialCreate
```

Run the following immediately after extracting the repository on a machine with .NET 10:

```bash
dotnet --info
dotnet tool restore
dotnet restore CleanShop.sln
dotnet build CleanShop.sln -c Release
dotnet test CleanShop.sln -c Release
```

For migration-first development, generate `InitialCreate` as documented in `docs/development/migrations.md`, recreate any database previously created through the `EnsureCreatedAsync` fallback, then use EF migrations going forward.

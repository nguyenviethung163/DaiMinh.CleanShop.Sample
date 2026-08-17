# Local and Runtime Configuration

## Sources

ASP.NET Core loads configuration from the standard provider chain (appsettings, environment-specific files, environment variables, user secrets when configured, command-line, etc.).

Primary files:

```text
src/CleanShop.Web/appsettings.json
src/CleanShop.Web/appsettings.Development.json
```

## Connection string

Infrastructure expects:

```text
ConnectionStrings:DefaultConnection
```

Do not commit a real production password into appsettings files.

Environment-variable form:

```bash
ConnectionStrings__DefaultConnection='...'
```

## User secrets for local sensitive values

From the Web project:

```bash
dotnet user-secrets init --project src/CleanShop.Web
dotnet user-secrets set 'ConnectionStrings:DefaultConnection' '...' --project src/CleanShop.Web
```

Use user secrets only for local development; use the deployment platform's secret manager in production.

## Typed options

Vendor/capability-specific settings should use `IOptions<T>` and a named section. `PaymentGatewayOptions` is the current Infrastructure example.

Rules:

- place option type close to the adapter that owns it;
- avoid reading raw string keys throughout business code;
- validate mandatory production settings at startup where failure should be immediate.

## Environment behavior

Development enables the developer exception page. Non-development uses the configured exception handler and HSTS.

Never depend on `IsDevelopment()` as an authorization/security bypass for production data.

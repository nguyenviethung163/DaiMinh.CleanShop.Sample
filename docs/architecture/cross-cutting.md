# Cross-Cutting Concerns

## 1. Dependency injection

Each project owns its registrations:

```text
Core.AddCore()
Infrastructure.AddInfrastructure(configuration)
Web.AddWeb()
```

`Program.cs` composes them. This keeps the composition root visible while preventing one giant registration file.

## 2. Time

Core uses `IClock` rather than reading `DateTimeOffset.UtcNow` directly in use cases. Infrastructure supplies `SystemClock`.

Benefits:

- deterministic unit tests;
- explicit time dependency;
- easier simulation of time-sensitive behavior.

## 3. Logging

Application/domain code is not coupled to a logging implementation. Web middleware and Infrastructure adapters can use `ILogger<T>` for technical observability.

Avoid logging sensitive credentials, full payment tokens or unnecessary personal data.

## 4. Correlation ID

`CorrelationIdMiddleware` establishes a request correlation identifier so logs from one request can be connected. Downstream integrations should propagate this identifier when external calls are introduced.

## 5. Request logging

`RequestLoggingMiddleware` records request-level technical information. Business audit logging is a separate concern and should not be confused with HTTP request logs.

## 6. Security headers

`SecurityHeadersMiddleware` adds baseline response hardening. Any future Content Security Policy must be designed alongside actual frontend asset/script usage rather than copied blindly.

## 7. Configuration

Configuration enters through Web and is passed to Infrastructure registration. Options such as `PaymentGatewayOptions` use typed options instead of scattering string-key lookups through the application.

Configuration principles:

- no secrets committed to Git;
- use environment/user secrets/secret manager for sensitive values;
- validate important production options at startup where practical;
- keep vendor-specific option types in the adapter that owns the vendor.

## 8. Middleware order

Current high-level order:

```text
Exception handling / HSTS
Correlation ID
Request logging
Security headers
HTTPS redirection
Static files
Routing
Authentication
Authorization
MVC endpoints
```

Middleware ordering is behavior. Review order whenever adding authentication, localization, rate limiting, session or endpoint-specific middleware.

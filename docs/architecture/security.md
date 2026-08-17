# Security Architecture

## 1. Threat-oriented baseline

CleanShop is a learning/reference application, but its architecture intentionally demonstrates several production-minded controls.

## 2. Authentication

ASP.NET Core Identity authenticates users. Passwords are never part of the Domain model. Identity storage lives in Infrastructure.

Production deployments must persist Data Protection keys across restarts/instances and protect those keys appropriately.

## 3. Authorization

Three checks may be needed:

1. authenticated user — `[Authorize]`;
2. role/policy — e.g. Admin area;
3. resource ownership — e.g. Order belongs to current Customer.

Never assume a non-guessable GUID is authorization.

## 4. CSRF

State-changing MVC form actions use `[ValidateAntiForgeryToken]`. New form POST/PUT-like MVC actions must follow the same rule unless there is a carefully justified alternative.

## 5. Input validation and output encoding

MVC/Razor output encoding protects normal rendered values. Avoid `Html.Raw` for untrusted content. Validate user input at the HTTP boundary and enforce true invariants in Domain.

## 6. Secrets

Do not commit:

- production connection strings with passwords;
- API keys;
- SMTP credentials;
- payment secrets;
- seeded production account passwords.

Use local user secrets for development and a platform secret store in production.

## 7. SQL injection

EF Core LINQ parameterizes normal queries. Avoid constructing SQL by concatenating user input. Any raw SQL must be reviewed for parameterization.

## 8. Ownership / IDOR

Order endpoints explicitly compare `OrderDetailsDto.CustomerId` with the resolved current Customer. This protects against insecure direct object reference attacks.

Any new customer-owned resource must have equivalent ownership or policy authorization.

## 9. Payment boundary

The current `FakePaymentGateway` is not production payment logic. Real integrations must consider:

- idempotency keys;
- provider authentication/signature validation;
- timeout as unknown outcome;
- webhook verification;
- reconciliation jobs;
- duplicate callbacks;
- sensitive data handling;
- retry rules.

## 10. Security headers / HTTPS

The pipeline enables HTTPS redirection and HSTS outside Development, plus baseline security headers middleware. Reverse-proxy deployments must configure forwarded headers/trusted proxies correctly before relying on scheme/client information.

## 11. Logging/privacy

Logs must not contain passwords, payment secrets or unnecessary personal data. Correlation identifiers should be opaque and not encode sensitive information.

# Identity and Authorization

## 1. Two identities

CleanShop distinguishes:

- `ApplicationUser` — ASP.NET Core Identity account used for authentication/roles.
- `Customer` — domain/business customer used by basket/order behavior.

This separation prevents password/account storage concerns from contaminating the Domain model.

## 2. Authentication boundary

`ApplicationUser` and Identity persistence live in Infrastructure. Web configures authentication cookies and presents login/logout UI.

`Program` calls:

```text
UseAuthentication()
UseAuthorization()
```

before controller endpoints execute.

## 3. Customer resolution

Authenticated claims identify the Identity user. `CustomerResolver` maps that authenticated identity to the business `Customer` used by Core use cases.

Controllers must not assume that an authenticated Identity account automatically equals a valid business Customer; they resolve the mapping and handle missing linkage.

## 4. Authorization layers

### Authentication

`[Authorize]` requires a signed-in user.

### Role authorization

Administrative endpoints should require the Admin role/appropriate policy.

### Resource ownership

Role checks are not enough for customer-owned data. For Order details/payment, the Web layer loads the Order read model and verifies:

```text
order.CustomerId == currentCustomer.Id
```

before displaying or mutating it.

This prevents horizontal privilege escalation where one customer guesses another order ID.

## 5. Why ownership currently lives in Web

The current Order endpoints are interactive MVC endpoints and the resource-ownership decision depends on current authenticated actor context. The baseline performs this check explicitly in the controller.

If the same use cases later become reachable from multiple adapters (API, jobs, messaging), actor-aware authorization should move to a reusable Application authorization policy rather than being duplicated.

## 6. Seed accounts

Development seed accounts are convenience data only. Production secrets/password provisioning must use secure operational mechanisms and must not reuse development credentials.

## 7. Cookie configuration

Web configures login and access-denied routes. Production should additionally review cookie security properties, data-protection key persistence, HTTPS termination and SameSite behavior for the deployment environment.

# Adding MVC UI

## Storefront feature

Place new customer-facing UI under:

```text
src/CleanShop.Web/Features/<Feature>/
```

Typical files:

```text
<Feature>Controller.cs
Index.cshtml
Details.cshtml
<Feature>ViewModel.cs   // only if UI-specific shape is needed
```

## Admin UI

Place administration screens under `Areas/Admin`. Apply Admin role/policy consistently at controller/Area boundary.

## GET actions

GET actions must not change business state. Use query handlers/read models and return View/NotFound/etc.

## POST actions

State-changing MVC actions should usually:

1. use `[HttpPost]`;
2. use `[ValidateAntiForgeryToken]`;
3. validate `ModelState`;
4. resolve/authorize current actor;
5. call one Application use case;
6. translate Result;
7. redirect on success.

## ViewModel validation

Use data annotations for presentation/input constraints. Do not assume those attributes replace Domain invariants.

## Ownership

Any route accepting a customer-owned resource ID must enforce ownership/policy on the server. Hiding a link in Razor is not authorization.

## View discovery

Feature views resolve through custom Razor locations configured by `AddWeb`. If a view cannot be found, verify controller name and physical feature folder match the expected convention.

# MVC Presentation Architecture

## 1. Presentation style

CleanShop uses ASP.NET Core MVC with Razor Views. Web is an adapter around Application/Core, not the location of business policy.

## 2. Feature-first storefront

Storefront UI is organized by user-visible capability:

```text
Features/
├── Account/
├── Basket/
├── Catalog/
├── Checkout/
├── Home/
└── Orders/
```

Each feature keeps controller, feature ViewModel and Razor Views close together where practical.

## 3. View discovery

`AddWeb` adds Razor locations:

```text
/Features/{Controller}/{View}.cshtml
/Features/Shared/{View}.cshtml
```

This allows `CatalogController.Index()` to resolve `/Features/Catalog/Index.cshtml` without moving every view under the conventional `/Views/Catalog` tree.

Shared layout files remain under `/Views/Shared`.

## 4. Admin Area

Administration is a larger functional boundary and uses ASP.NET Core MVC Areas:

```text
Areas/Admin/
├── Controllers/
└── Views/
```

The Area provides a clear route/UI boundary for admin behavior and can carry admin-specific authorization.

## 5. Controller responsibilities

Controllers should be thin:

```text
HTTP concerns
  -> bind/validate
  -> resolve current actor
  -> construct command / call query
  -> interpret Result/DTO
  -> return View/Redirect/Status
```

A controller must not query `AppDbContext`, implement inventory/payment/order rules or manually coordinate persistence.

## 6. ViewModels vs DTOs

Application read DTOs may be used directly by simple Views when the shape already matches the screen. A separate Web ViewModel is useful when UI-specific concerns appear, such as:

- form validation attributes;
- select lists;
- display-only composition;
- localized/formatted input fields;
- multi-action page state.

Never pass tracked EF entities to Views.

## 7. Form security

State-changing forms use HTTP POST plus `[ValidateAntiForgeryToken]`. Authenticated behavior uses `[Authorize]` and role/ownership checks as appropriate.

## 8. Redirect-after-post

Successful mutations should generally use Post/Redirect/Get to avoid browser resubmission and to produce a fresh read model after the write.

## 9. Adding a new screen

Prefer placing it beside the business feature that owns the behavior. Create a new Area only when the UI is a significant functional partition, not for every folder/category.

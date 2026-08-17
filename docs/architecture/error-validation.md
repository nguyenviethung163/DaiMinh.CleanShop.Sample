# Error Handling and Validation

## 1. Three validation layers

### HTTP/input validation

Web validates request shape and form constraints using MVC model binding, data annotations and `ModelState`.

Examples:

- required shipping address line;
- malformed form input;
- missing required field.

### Application/use-case validation

Handlers validate contextual preconditions that require system state.

Examples from checkout:

- basket is empty;
- product no longer exists;
- insufficient stock.

These are returned as `Result` failures.

### Domain invariant validation

Aggregates reject invalid state transitions regardless of caller.

Examples:

- cannot modify non-Draft Order;
- cannot submit empty Order;
- cannot pay an Order unless it is Submitted;
- cannot ship an Order unless it is Paid.

These guards protect the model even if another adapter bypasses MVC in the future.

## 2. Result pattern

`Result` and `Result<T>` represent expected outcomes without exceptions as routine branching.

Use Result when the caller can reasonably react to the failure.

Examples:

- NotFound
- Validation
- Conflict
- Forbidden

## 3. Exceptions

Exceptions are appropriate for:

- broken domain invariant caused by invalid programmer orchestration;
- unavailable infrastructure;
- configuration errors;
- unexpected runtime failures.

Do not wrap every method in `try/catch`. Let the centralized ASP.NET Core exception pipeline handle unexpected failures and log them at the appropriate boundary.

## 4. HTTP mapping

MVC pages often re-render a View with ModelState error for form failures and use `NotFound`, `Challenge`, redirects or TempData for other outcomes.

For a future JSON API, establish a consistent Problem Details mapping in a separate adapter-level policy rather than forcing MVC-specific HTTP codes into Core.

## 5. Error messages

Domain/application errors should be safe for the user if surfaced. Infrastructure exceptions may contain sensitive server details and must not be exposed directly in production pages.

# Application Model

## 1. Purpose

The Application layer defines **what the system can do**. It coordinates domain objects and boundary ports but does not contain HTTP or database implementation details.

Feature folders make use cases discoverable:

```text
Application/
├── Basket/
│   ├── AddBasketItem/
│   └── GetBasket/
├── Catalog/
│   ├── GetProduct/
│   ├── ListProducts/
│   └── UpsertProduct/
└── Orders/
    ├── CreateOrder/
    ├── GetOrder/
    ├── GetOrders/
    ├── PayOrder/
    └── ShipOrder/
```

## 2. Handler model

Handlers are plain classes registered with DI. There is no mediator abstraction in the baseline.

A write handler typically:

1. validates use-case preconditions that require loaded data;
2. loads aggregate roots through repository ports;
3. invokes domain methods;
4. persists through a repository;
5. returns `Result` or `Result<T>`.

A query handler typically delegates to a read-service port and returns a DTO.

## 3. Why plain handlers

Direct handler injection makes dependencies visible in constructors and produces a traceable flow:

```text
Controller -> CreateOrderHandler -> repositories -> aggregates
```

There is no hidden mediator pipeline to understand before debugging a request.

## 4. Application ports

Core owns interfaces for capabilities it needs from the outside world:

- persistence repositories;
- read services;
- payment gateway;
- clock;
- email;
- domain event dispatcher.

This is dependency inversion: the business/application side defines what it needs; Infrastructure chooses how to implement it.

## 5. Result-based failures

Expected failures use explicit results instead of exceptions as normal control flow.

Typical categories include:

- Validation — bad use-case input/state;
- NotFound — requested resource no longer exists;
- Conflict — valid request conflicts with current state;
- Forbidden — authenticated caller lacks permission where represented at application level.

Controllers translate Result to an appropriate user-facing response.

## 6. Application vs Domain validation

Application validation asks whether a use case can proceed in the current context, for example:

- basket exists and is not empty;
- referenced product still exists;
- sufficient stock exists before attempting reservation.

Domain validation protects invariants that must always hold, regardless of caller, for example:

- submitted Order cannot be modified;
- only paid Order can be shipped.

## 7. Transaction ownership

Application handlers define logical transaction boundaries by deciding when to call `SaveChangesAsync`.

Because repository implementations share the scoped `AppDbContext`, multiple tracked aggregates can be saved together in one EF Core transaction for a single `SaveChangesAsync` call.

Example `CreateOrderHandler`:

- loads Basket;
- loads/reserves Products;
- creates/submits Order;
- adds Order;
- clears Basket;
- invokes `orders.SaveChangesAsync` once.

The name of the repository used to call `SaveChangesAsync` is not the owner of all changed entities; it is simply the Core-facing commit entry point over the shared scoped DbContext. See the persistence document for implications.

## 8. DTO rules

Read DTOs are shaped for application consumers, not persistence. They may flatten multiple columns/entities and should avoid exposing EF tracked entities to Web.

Do not return `IQueryable` from Core ports. Queries must execute inside Infrastructure so EF-specific query behavior does not leak outward.

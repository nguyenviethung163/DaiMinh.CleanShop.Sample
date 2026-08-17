# End-to-End Request Flows

## 1. Catalog read

```mermaid
sequenceDiagram
    participant B as Browser
    participant C as CatalogController
    participant H as ListProductsHandler
    participant R as ICatalogReadService
    participant I as CatalogReadService
    participant DB as SQL Server

    B->>C: GET /Catalog
    C->>H: HandleAsync
    H->>R: ListAsync
    R->>I: Infrastructure implementation
    I->>DB: EF projection / no tracking
    DB-->>I: rows
    I-->>H: ProductListItemDto[]
    H-->>C: DTO[]
    C-->>B: Razor HTML
```

No Product aggregate is reconstructed because no product behavior is executed.

## 2. Add item to basket

```text
POST Basket/Add
  -> BasketController
  -> AddBasketItemHandler
  -> load Product + Basket aggregate
  -> invoke basket behavior
  -> persist
  -> redirect to Basket
```

The handler uses repositories because basket state changes.

## 3. Checkout / create order

```mermaid
sequenceDiagram
    participant B as Browser
    participant C as CheckoutController
    participant CR as CustomerResolver
    participant H as CreateOrderHandler
    participant BR as BasketRepository
    participant PR as ProductRepository
    participant O as Order Aggregate
    participant OR as OrderRepository
    participant DB as AppDbContext
    participant E as Event Dispatcher

    B->>C: POST /Checkout
    C->>C: ModelState + anti-forgery
    C->>CR: resolve Identity user -> Customer
    C->>H: CreateOrderCommand
    H->>BR: load basket
    loop each basket line
      H->>PR: load product
      H->>PR: Product.Reserve(quantity)
      H->>O: AddItem(snapshot)
    end
    H->>O: Submit(now)
    O-->>O: raise OrderSubmittedDomainEvent
    H->>OR: Add(order)
    H->>BR: Basket.Clear()
    H->>OR: SaveChangesAsync
    OR->>DB: Save tracked Basket/Product/Order
    DB->>E: dispatch collected events after save
    H-->>C: Result<OrderId>
    C-->>B: redirect /Orders/Details/{id}
```

### Transaction note

Product reservations, Basket clear and Order insert are tracked by the same scoped DbContext and committed by one save call.

## 4. Pay order

```mermaid
sequenceDiagram
    participant B as Browser
    participant C as OrdersController
    participant Q as GetOrderHandler
    participant H as PayOrderHandler
    participant G as IPaymentGateway
    participant PR as PaymentRepository
    participant OR as OrderRepository

    B->>C: POST /Orders/Pay/{id}
    C->>Q: load order read model
    C->>C: verify CustomerId ownership
    C->>H: HandleAsync(OrderId)
    H->>OR: load Order aggregate
    H->>H: require Submitted
    H->>G: Charge(order total)
    G-->>H: transaction reference
    H->>PR: add Payment
    H->>H: Order.MarkPaid()
    H->>PR: SaveChangesAsync
    H-->>C: Result
    C-->>B: redirect details
```

The fake gateway always represents a simple synchronous payment path. A real provider requires idempotency and unknown-outcome/reconciliation design.

## 5. Order details ownership

```text
GET /Orders/Details/{id}
  -> resolve current Customer
  -> query OrderDetailsDto
  -> if missing OR CustomerId differs: 404
  -> otherwise render View
```

The ownership check is a security boundary, not merely UI filtering.

## 6. Admin shipping

```text
POST /Admin/Orders/Ship/{id}
  -> Admin OrdersController
  -> ShipOrderHandler
  -> IOrderRepository.GetByIdAsync
  -> Order.Ship()
       requires Status == Paid
  -> SaveChangesAsync
  -> redirect to admin order details
```

The state transition rule is in `Order.Ship`, not in the Admin controller.

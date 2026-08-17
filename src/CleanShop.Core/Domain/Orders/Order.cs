using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders.Events;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Orders;

public sealed class Order : AggregateRoot<OrderId>
{
    private readonly List<OrderItem> _items = [];
    private Order() : base(default) { }
    public Order(OrderId id, CustomerId customerId, Address shippingAddress, DateTimeOffset createdAtUtc) : base(id)
    { CustomerId = customerId; ShippingAddress = shippingAddress.Normalize(); CreatedAtUtc = createdAtUtc; Status = OrderStatus.Draft; }
    public CustomerId CustomerId { get; private set; }
    public Address ShippingAddress { get; private set; } = null!;
    public DateTimeOffset CreatedAtUtc { get; private set; }
    public OrderStatus Status { get; private set; }
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();
    public Money Total => _items.Aggregate(Money.Zero(), (sum, item) => sum + item.Subtotal);
    public void AddItem(ProductId productId, string name, Money price, int quantity)
    { if (Status != OrderStatus.Draft) throw new DomainException("Only draft orders can be modified."); _items.Add(new OrderItem(productId, name, price, quantity)); }
    public void Submit(DateTimeOffset nowUtc)
    { if (Status != OrderStatus.Draft) throw new DomainException("Order is not in draft state."); if (_items.Count == 0) throw new DomainException("Order must contain at least one item."); Status = OrderStatus.Submitted; Raise(new OrderSubmittedDomainEvent(Id, nowUtc)); }
    public void MarkPaid() { if (Status != OrderStatus.Submitted) throw new DomainException("Only submitted orders can be paid."); Status = OrderStatus.Paid; }
    public void Ship() { if (Status != OrderStatus.Paid) throw new DomainException("Only paid orders can be shipped."); Status = OrderStatus.Shipped; }
    public void Cancel() { if (Status is OrderStatus.Shipped or OrderStatus.Cancelled) throw new DomainException("Order cannot be cancelled."); Status = OrderStatus.Cancelled; }
}

using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.UnitTests.Domain;

public sealed class OrderTests
{
    [Fact] public void Submit_EmptyOrder_Throws() { var o = new Order(OrderId.New(), CustomerId.New(), new Address("1 Main", "Hanoi", "Vietnam", "10000"), DateTimeOffset.UtcNow); Assert.Throws<DomainException>(() => o.Submit(DateTimeOffset.UtcNow)); }
    [Fact] public void Submit_WithItem_ChangesStatus() { var o = new Order(OrderId.New(), CustomerId.New(), new Address("1 Main", "Hanoi", "Vietnam", "10000"), DateTimeOffset.UtcNow); o.AddItem(ProductId.New(), "Item", new Money(10), 2); o.Submit(DateTimeOffset.UtcNow); Assert.Equal(OrderStatus.Submitted, o.Status); Assert.Single(o.DomainEvents); }
    [Fact] public void Ship_UnpaidOrder_Throws() { var o = new Order(OrderId.New(), CustomerId.New(), new Address("1", "Hanoi", "VN", "1"), DateTimeOffset.UtcNow); o.AddItem(ProductId.New(), "Item", new Money(10), 1); o.Submit(DateTimeOffset.UtcNow); Assert.Throws<DomainException>(() => o.Ship()); }
}

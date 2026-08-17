using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Orders;

public sealed class OrderItem : Entity<Guid>
{
    private OrderItem() : base(Guid.Empty) { }
    internal OrderItem(ProductId productId, string productName, Money unitPrice, int quantity) : base(Guid.NewGuid())
    { if (quantity <= 0) throw new DomainException("Order quantity must be positive."); ProductId = productId; ProductName = productName; UnitPrice = unitPrice; Quantity = quantity; }
    public ProductId ProductId { get; private set; }
    public string ProductName { get; private set; } = string.Empty;
    public Money UnitPrice { get; private set; } = Money.Zero();
    public int Quantity { get; private set; }
    public Money Subtotal => UnitPrice * Quantity;
}

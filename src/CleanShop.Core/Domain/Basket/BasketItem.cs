using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Basket;

public sealed class BasketItem : Entity<Guid>
{
    private BasketItem() : base(Guid.Empty) { }
    internal BasketItem(ProductId productId, string productName, Money unitPrice, int quantity) : base(Guid.NewGuid())
    { ProductId = productId; ProductName = productName; UnitPrice = unitPrice; SetQuantity(quantity); }
    public ProductId ProductId { get; private set; }
    public string ProductName { get; private set; } = string.Empty;
    public Money UnitPrice { get; private set; } = Money.Zero();
    public int Quantity { get; private set; }
    public Money Subtotal => UnitPrice * Quantity;
    internal void SetQuantity(int quantity) { if (quantity <= 0) throw new DomainException("Basket quantity must be positive."); Quantity = quantity; }
    internal void Increment(int quantity) => SetQuantity(Quantity + quantity);
}

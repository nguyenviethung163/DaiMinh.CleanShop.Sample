using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Basket;

public sealed class Basket : AggregateRoot<BasketId>
{
    private readonly List<BasketItem> _items = [];
    private Basket() : base(default) { }
    public Basket(BasketId id, CustomerId customerId) : base(id) => CustomerId = customerId;
    public CustomerId CustomerId { get; private set; }
    public IReadOnlyCollection<BasketItem> Items => _items.AsReadOnly();
    public Money Total => _items.Aggregate(Money.Zero(), (sum, item) => sum + item.Subtotal);
    public void AddItem(ProductId productId, string name, Money price, int quantity)
    {
        if (quantity <= 0) throw new DomainException("Quantity must be positive.");
        var existing = _items.SingleOrDefault(x => x.ProductId == productId);
        if (existing is null) _items.Add(new BasketItem(productId, name, price, quantity)); else existing.Increment(quantity);
    }
    public void RemoveItem(ProductId productId) => _items.RemoveAll(x => x.ProductId == productId);
    public void Clear() => _items.Clear();
}

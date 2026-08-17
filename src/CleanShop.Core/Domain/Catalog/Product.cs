using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Catalog;

public sealed class Product : AggregateRoot<ProductId>
{
    private Product() : base(default) { }
    public Product(ProductId id, string name, string sku, Money price, int stockQuantity) : base(id)
    {
        Rename(name); ChangeSku(sku); ChangePrice(price); SetStock(stockQuantity); Status = ProductStatus.Active;
    }
    public string Name { get; private set; } = string.Empty;
    public string Sku { get; private set; } = string.Empty;
    public Money Price { get; private set; } = Money.Zero();
    public int StockQuantity { get; private set; }
    public ProductStatus Status { get; private set; }
    public void Rename(string name) { if (string.IsNullOrWhiteSpace(name)) throw new DomainException("Product name is required."); Name = name.Trim(); }
    public void ChangeSku(string sku) { if (string.IsNullOrWhiteSpace(sku)) throw new DomainException("SKU is required."); Sku = sku.Trim().ToUpperInvariant(); }
    public void ChangePrice(Money price) { if (price.Amount <= 0) throw new DomainException("Product price must be greater than zero."); Price = price; }
    public void SetStock(int quantity) { if (quantity < 0) throw new DomainException("Stock cannot be negative."); StockQuantity = quantity; }
    public void Reserve(int quantity) { if (quantity <= 0) throw new DomainException("Quantity must be positive."); if (quantity > StockQuantity) throw new DomainException("Insufficient stock."); StockQuantity -= quantity; }
    public void Archive() => Status = ProductStatus.Archived;
}

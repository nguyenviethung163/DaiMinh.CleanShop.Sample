using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Abstractions.Persistence;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(ProductId id, CancellationToken ct);
    Task<Product?> GetBySkuAsync(string sku, CancellationToken ct);
    Task AddAsync(Product product, CancellationToken ct);
    Task<int> SaveChangesAsync(CancellationToken ct);
}

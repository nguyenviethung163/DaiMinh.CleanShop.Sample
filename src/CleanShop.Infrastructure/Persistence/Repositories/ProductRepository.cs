using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Catalog;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.Repositories;

public sealed class ProductRepository(AppDbContext db) : IProductRepository
{
    public Task<Product?> GetByIdAsync(ProductId id, CancellationToken ct) => db.Products.SingleOrDefaultAsync(x => x.Id == id, ct);
    public Task<Product?> GetBySkuAsync(string sku, CancellationToken ct) => db.Products.SingleOrDefaultAsync(x => x.Sku == sku, ct);
    public async Task AddAsync(Product product, CancellationToken ct) => await db.Products.AddAsync(product, ct);
    public Task<int> SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}

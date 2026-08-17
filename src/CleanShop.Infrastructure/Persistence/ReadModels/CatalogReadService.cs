using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Application.Catalog;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Catalog.Specifications;
using CleanShop.Infrastructure.Persistence.Specifications;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.ReadModels;

public sealed class CatalogReadService(AppDbContext db) : ICatalogReadService
{
    public async Task<IReadOnlyList<ProductListItemDto>> ListAsync(CancellationToken ct)
    {
        var products = db.Products.AsNoTracking().Apply(new ActiveProductsSpecification()).OrderBy(x => x.Name);
        if (db.Database.IsInMemory()) return (await products.ToListAsync(ct)).Select(ToListItem).ToList();
        return await products.Select(x => new ProductListItemDto(x.Id, x.Name, x.Sku, x.Price.Amount, x.Price.Currency, x.StockQuantity)).ToListAsync(ct);
    }

    public async Task<ProductDetailsDto?> GetAsync(ProductId id, CancellationToken ct)
    {
        var products = db.Products.AsNoTracking().Where(x => x.Id == id);
        if (db.Database.IsInMemory())
        {
            var product = await products.SingleOrDefaultAsync(ct);
            return product is null ? null : ToDetails(product);
        }

        return await products.Select(x => new ProductDetailsDto(x.Id, x.Name, x.Sku, x.Price.Amount, x.Price.Currency, x.StockQuantity, x.Status)).SingleOrDefaultAsync(ct);
    }

    private static ProductListItemDto ToListItem(Product product) => new(product.Id, product.Name, product.Sku, product.Price.Amount, product.Price.Currency, product.StockQuantity);
    private static ProductDetailsDto ToDetails(Product product) => new(product.Id, product.Name, product.Sku, product.Price.Amount, product.Price.Currency, product.StockQuantity, product.Status);
}

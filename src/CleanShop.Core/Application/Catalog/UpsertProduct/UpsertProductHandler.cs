using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Catalog.UpsertProduct;

public sealed class UpsertProductHandler(IProductRepository products)
{
    public async Task<Result<ProductId>> HandleAsync(UpsertProductCommand command, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(command.Name) || string.IsNullOrWhiteSpace(command.Sku)) return Result<ProductId>.Failure(Error.Validation("Name and SKU are required."));
        if (command.Price <= 0 || command.StockQuantity < 0) return Result<ProductId>.Failure(Error.Validation("Price must be positive and stock non-negative."));
        var normalizedSku = command.Sku.Trim().ToUpperInvariant();
        Product product;
        if (command.Id is null)
        {
            if (await products.GetBySkuAsync(normalizedSku, ct) is not null) return Result<ProductId>.Failure(Error.Conflict("SKU already exists."));
            product = new Product(ProductId.New(), command.Name, command.Sku, new Money(command.Price), command.StockQuantity);
            await products.AddAsync(product, ct);
        }
        else
        {
            var existing = await products.GetByIdAsync(command.Id.Value, ct);
            if (existing is null) return Result<ProductId>.Failure(Error.NotFound("Product not found."));
            var matchingSku = await products.GetBySkuAsync(normalizedSku, ct);
            if (matchingSku is not null && matchingSku.Id != existing.Id) return Result<ProductId>.Failure(Error.Conflict("SKU already exists."));
            product = existing;
            product.Rename(command.Name); product.ChangeSku(command.Sku); product.ChangePrice(new Money(command.Price)); product.SetStock(command.StockQuantity);
        }
        await products.SaveChangesAsync(ct);
        return Result<ProductId>.Success(product.Id);
    }
}

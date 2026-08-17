using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Application.Catalog.UpsertProduct;

public sealed record UpsertProductCommand(ProductId? Id, string Name, string Sku, decimal Price, int StockQuantity);

using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Application.Catalog;

public sealed record ProductListItemDto(ProductId Id, string Name, string Sku, decimal Price, string Currency, int StockQuantity);
public sealed record ProductDetailsDto(ProductId Id, string Name, string Sku, decimal Price, string Currency, int StockQuantity, ProductStatus Status);

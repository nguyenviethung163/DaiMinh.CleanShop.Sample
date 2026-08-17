using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Application.Basket;

public sealed record BasketLineDto(ProductId ProductId, string ProductName, decimal UnitPrice, string Currency, int Quantity, decimal Subtotal);
public sealed record BasketDto(IReadOnlyList<BasketLineDto> Lines, decimal Total, string Currency);

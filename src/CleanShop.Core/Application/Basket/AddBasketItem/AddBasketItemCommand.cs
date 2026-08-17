using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Application.Basket.AddBasketItem;

public sealed record AddBasketItemCommand(CustomerId CustomerId, ProductId ProductId, int Quantity);

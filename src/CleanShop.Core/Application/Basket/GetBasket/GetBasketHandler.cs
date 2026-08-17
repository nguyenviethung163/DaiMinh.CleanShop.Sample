using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Application.Basket.GetBasket;

public sealed class GetBasketHandler(IBasketReadService readService) { public Task<BasketDto> HandleAsync(CustomerId id, CancellationToken ct) => readService.GetAsync(id, ct); }

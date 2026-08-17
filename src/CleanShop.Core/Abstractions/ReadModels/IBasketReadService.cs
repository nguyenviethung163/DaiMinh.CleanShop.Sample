using CleanShop.Core.Application.Basket;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Abstractions.ReadModels;

public interface IBasketReadService { Task<BasketDto> GetAsync(CustomerId customerId, CancellationToken ct); }

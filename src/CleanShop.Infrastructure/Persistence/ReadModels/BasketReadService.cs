using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Application.Basket;
using CleanShop.Core.Domain.Customers;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.ReadModels;

public sealed class BasketReadService(AppDbContext db) : IBasketReadService
{
    public async Task<BasketDto> GetAsync(CustomerId customerId, CancellationToken ct)
    {
        var basket = await db.Baskets.AsNoTracking().Include(x => x.Items).SingleOrDefaultAsync(x => x.CustomerId == customerId, ct);
        if (basket is null) return new BasketDto([], 0, "USD");
        return new BasketDto(basket.Items.Select(x => new BasketLineDto(x.ProductId, x.ProductName, x.UnitPrice.Amount, x.UnitPrice.Currency, x.Quantity, x.Subtotal.Amount)).ToList(), basket.Total.Amount, basket.Total.Currency);
    }
}

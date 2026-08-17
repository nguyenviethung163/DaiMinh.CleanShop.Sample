using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Customers;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.Repositories;

public sealed class BasketRepository(AppDbContext db) : IBasketRepository
{
    public Task<Basket?> GetByCustomerIdAsync(CustomerId id, CancellationToken ct) => db.Baskets.Include(x => x.Items).SingleOrDefaultAsync(x => x.CustomerId == id, ct);
    public async Task AddAsync(Basket basket, CancellationToken ct) => await db.Baskets.AddAsync(basket, ct);
    public Task<int> SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}

using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Abstractions.Persistence;

public interface IBasketRepository
{
    Task<Basket?> GetByCustomerIdAsync(CustomerId id, CancellationToken ct);
    Task AddAsync(Basket basket, CancellationToken ct);
    Task<int> SaveChangesAsync(CancellationToken ct);
}

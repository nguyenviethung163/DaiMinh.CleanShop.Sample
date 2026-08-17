using CleanShop.Core.Domain.Orders;
namespace CleanShop.Core.Abstractions.Persistence;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(OrderId id, CancellationToken ct);
    Task AddAsync(Order order, CancellationToken ct);
    Task<int> SaveChangesAsync(CancellationToken ct);
}

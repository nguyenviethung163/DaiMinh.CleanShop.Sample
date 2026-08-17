using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Orders;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.Repositories;

public sealed class OrderRepository(AppDbContext db) : IOrderRepository
{
    public Task<Order?> GetByIdAsync(OrderId id, CancellationToken ct) => db.Orders.Include(x => x.Items).SingleOrDefaultAsync(x => x.Id == id, ct);
    public async Task AddAsync(Order order, CancellationToken ct) => await db.Orders.AddAsync(order, ct);
    public Task<int> SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}

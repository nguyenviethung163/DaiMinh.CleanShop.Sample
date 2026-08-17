using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Application.Orders;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.ReadModels;

public sealed class OrderReadService(AppDbContext db) : IOrderReadService
{
    public async Task<IReadOnlyList<OrderListItemDto>> ListAllAsync(CancellationToken ct)
    { var orders = await db.Orders.AsNoTracking().Include(x => x.Items).OrderByDescending(x => x.CreatedAtUtc).ToListAsync(ct); return orders.Select(x => new OrderListItemDto(x.Id, x.CreatedAtUtc, x.Status, x.Total.Amount, x.Total.Currency)).ToList(); }
    public async Task<IReadOnlyList<OrderListItemDto>> ListForCustomerAsync(CustomerId id, CancellationToken ct)
    { var orders = await db.Orders.AsNoTracking().Include(x => x.Items).Where(x => x.CustomerId == id).OrderByDescending(x => x.CreatedAtUtc).ToListAsync(ct); return orders.Select(x => new OrderListItemDto(x.Id, x.CreatedAtUtc, x.Status, x.Total.Amount, x.Total.Currency)).ToList(); }
    public async Task<OrderDetailsDto?> GetAsync(OrderId id, CancellationToken ct)
    { var x = await db.Orders.AsNoTracking().Include(o => o.Items).SingleOrDefaultAsync(o => o.Id == id, ct); return x is null ? null : new OrderDetailsDto(x.Id, x.CustomerId, x.CreatedAtUtc, x.Status, x.ShippingAddress.Line1, x.ShippingAddress.City, x.ShippingAddress.Country, x.ShippingAddress.PostalCode, x.Total.Amount, x.Total.Currency, x.Items.Select(i => new OrderLineDto(i.ProductName, i.Quantity, i.UnitPrice.Amount, i.Subtotal.Amount)).ToList()); }
}

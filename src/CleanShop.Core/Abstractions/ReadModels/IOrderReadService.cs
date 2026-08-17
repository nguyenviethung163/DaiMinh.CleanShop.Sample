using CleanShop.Core.Application.Orders;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
namespace CleanShop.Core.Abstractions.ReadModels;

public interface IOrderReadService
{
    Task<IReadOnlyList<OrderListItemDto>> ListForCustomerAsync(CustomerId id, CancellationToken ct);
    Task<IReadOnlyList<OrderListItemDto>> ListAllAsync(CancellationToken ct);
    Task<OrderDetailsDto?> GetAsync(OrderId id, CancellationToken ct);
}

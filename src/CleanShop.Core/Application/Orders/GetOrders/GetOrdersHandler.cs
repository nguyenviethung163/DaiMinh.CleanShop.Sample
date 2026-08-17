using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Application.Orders.GetOrders;

public sealed class GetOrdersHandler(IOrderReadService readService) { public Task<IReadOnlyList<OrderListItemDto>> HandleAsync(CustomerId id, CancellationToken ct) => readService.ListForCustomerAsync(id, ct); }

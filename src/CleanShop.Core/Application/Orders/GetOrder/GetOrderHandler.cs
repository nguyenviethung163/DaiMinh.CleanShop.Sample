using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Domain.Orders;
namespace CleanShop.Core.Application.Orders.GetOrder;

public sealed class GetOrderHandler(IOrderReadService readService) { public Task<OrderDetailsDto?> HandleAsync(OrderId id, CancellationToken ct) => readService.GetAsync(id, ct); }

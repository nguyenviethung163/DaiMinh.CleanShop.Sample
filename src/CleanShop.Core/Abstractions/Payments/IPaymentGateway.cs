using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Abstractions.Payments;

public interface IPaymentGateway { Task<Result<string>> ChargeAsync(OrderId orderId, Money amount, CancellationToken ct); }

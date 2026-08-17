using CleanShop.Core.Abstractions.Payments;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
using Microsoft.Extensions.Options;
namespace CleanShop.Infrastructure.Payments;

public sealed class FakePaymentGateway(IOptions<PaymentGatewayOptions> options) : IPaymentGateway
{
    public Task<Result<string>> ChargeAsync(OrderId orderId, Money amount, CancellationToken ct)
        => Task.FromResult(Result<string>.Success($"{options.Value.ProviderName.ToUpperInvariant()}-{orderId.Value:N}"));
}

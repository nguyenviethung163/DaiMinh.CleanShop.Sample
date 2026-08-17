using CleanShop.Core.Abstractions.Payments;
using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.Domain.Payments;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Orders.PayOrder;

public sealed class PayOrderHandler(IOrderRepository orders, IPaymentRepository payments, IPaymentGateway gateway)
{
    public async Task<Result> HandleAsync(OrderId id, CancellationToken ct)
    {
        var order = await orders.GetByIdAsync(id, ct);
        if (order is null) return Result.Failure(Error.NotFound("Order not found."));
        if (order.Status != OrderStatus.Submitted) return Result.Failure(Error.Conflict("Only submitted orders can be paid."));
        var charge = await gateway.ChargeAsync(order.Id, order.Total, ct);
        if (charge.IsFailure) return Result.Failure(charge.Error);
        var payment = new Payment(Guid.NewGuid(), order.Id, order.Total);
        payment.Complete(charge.Value);
        await payments.AddAsync(payment, ct);
        order.MarkPaid();
        await payments.SaveChangesAsync(ct);
        return Result.Success();
    }
}

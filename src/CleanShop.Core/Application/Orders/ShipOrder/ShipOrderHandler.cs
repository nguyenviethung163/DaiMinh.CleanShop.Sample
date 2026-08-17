using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Orders.ShipOrder;

public sealed class ShipOrderHandler(IOrderRepository orders)
{
    public async Task<Result> HandleAsync(OrderId id, CancellationToken ct)
    {
        var order = await orders.GetByIdAsync(id, ct);
        if (order is null) return Result.Failure(Error.NotFound("Order not found."));
        try { order.Ship(); }
        catch (DomainException ex) { return Result.Failure(Error.Conflict(ex.Message)); }
        await orders.SaveChangesAsync(ct);
        return Result.Success();
    }
}

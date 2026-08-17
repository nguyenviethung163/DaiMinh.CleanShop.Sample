using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Abstractions.Time;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Orders.CreateOrder;

public sealed class CreateOrderHandler(IBasketRepository baskets, IProductRepository products, IOrderRepository orders, IClock clock)
{
    public async Task<Result<OrderId>> HandleAsync(CreateOrderCommand command, CancellationToken ct)
    {
        var basket = await baskets.GetByCustomerIdAsync(command.CustomerId, ct);
        if (basket is null || basket.Items.Count == 0) return Result<OrderId>.Failure(Error.Validation("Basket is empty."));
        var order = new Order(OrderId.New(), command.CustomerId, command.ShippingAddress, clock.UtcNow);
        foreach (var line in basket.Items)
        {
            var product = await products.GetByIdAsync(line.ProductId, ct);
            if (product is null) return Result<OrderId>.Failure(Error.NotFound($"Product {line.ProductId} no longer exists."));
            if (product.StockQuantity < line.Quantity) return Result<OrderId>.Failure(Error.Conflict($"Insufficient stock for {product.Name}."));
            product.Reserve(line.Quantity);
            order.AddItem(product.Id, product.Name, product.Price, line.Quantity);
        }
        order.Submit(clock.UtcNow);
        await orders.AddAsync(order, ct);
        basket.Clear();
        await orders.SaveChangesAsync(ct);
        return Result<OrderId>.Success(order.Id);
    }
}

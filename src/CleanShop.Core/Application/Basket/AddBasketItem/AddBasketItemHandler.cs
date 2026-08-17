using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Basket.AddBasketItem;

public sealed class AddBasketItemHandler(IBasketRepository baskets, IProductRepository products)
{
    public async Task<Result> HandleAsync(AddBasketItemCommand command, CancellationToken ct)
    {
        if (command.Quantity <= 0) return Result.Failure(Error.Validation("Quantity must be positive."));
        var product = await products.GetByIdAsync(command.ProductId, ct);
        if (product is null || product.Status != Domain.Catalog.ProductStatus.Active) return Result.Failure(Error.NotFound("Product was not found."));
        if (product.StockQuantity < command.Quantity) return Result.Failure(Error.Conflict("Insufficient stock."));
        var basket = await baskets.GetByCustomerIdAsync(command.CustomerId, ct);
        if (basket is null) { basket = new Domain.Basket.Basket(Domain.Basket.BasketId.New(), command.CustomerId); await baskets.AddAsync(basket, ct); }
        basket.AddItem(product.Id, product.Name, product.Price, command.Quantity);
        await baskets.SaveChangesAsync(ct);
        return Result.Success();
    }
}

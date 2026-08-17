using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Abstractions.Time;
using CleanShop.Core.Application.Orders.CreateOrder;
using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.UnitTests.Application;

public sealed class CreateOrderHandlerTests
{
    [Fact]
    public async Task Handle_WithBasket_CreatesSubmittedOrderAndClearsBasket()
    {
        var customerId = CustomerId.New();
        var product = new Product(ProductId.New(), "Book", "BOOK-1", new Money(20), 10);
        var basket = new Basket(BasketId.New(), customerId);
        basket.AddItem(product.Id, product.Name, product.Price, 2);
        var baskets = new BasketRepo(basket); var products = new ProductRepo(product); var orders = new OrderRepo();
        var handler = new CreateOrderHandler(baskets, products, orders, new FixedClock());
        var result = await handler.HandleAsync(new CreateOrderCommand(customerId, new Address("1 Main", "Hanoi", "Vietnam", "10000")), CancellationToken.None);
        Assert.True(result.IsSuccess); Assert.Empty(basket.Items); Assert.NotNull(orders.Added); Assert.Equal(OrderStatus.Submitted, orders.Added!.Status); Assert.Equal(8, product.StockQuantity); Assert.Equal(1, orders.SaveCount);
    }
    private sealed class FixedClock : IClock { public DateTimeOffset UtcNow => new(2026, 8, 17, 0, 0, 0, TimeSpan.Zero); }
    private sealed class BasketRepo(Basket basket) : IBasketRepository
    { public Task<Basket?> GetByCustomerIdAsync(CustomerId id, CancellationToken ct) => Task.FromResult<Basket?>(basket); public Task AddAsync(Basket value, CancellationToken ct) => Task.CompletedTask; public Task<int> SaveChangesAsync(CancellationToken ct) => Task.FromResult(1); }
    private sealed class ProductRepo(Product product) : IProductRepository
    { public Task<Product?> GetByIdAsync(ProductId id, CancellationToken ct) => Task.FromResult<Product?>(id == product.Id ? product : null); public Task<Product?> GetBySkuAsync(string sku, CancellationToken ct) => Task.FromResult<Product?>(sku == product.Sku ? product : null); public Task AddAsync(Product value, CancellationToken ct) => Task.CompletedTask; public Task<int> SaveChangesAsync(CancellationToken ct) => Task.FromResult(1); }
    private sealed class OrderRepo : IOrderRepository
    { public Order? Added { get; private set; } public int SaveCount { get; private set; } public Task<Order?> GetByIdAsync(OrderId id, CancellationToken ct) => Task.FromResult<Order?>(null); public Task AddAsync(Order order, CancellationToken ct) { Added = order; return Task.CompletedTask; } public Task<int> SaveChangesAsync(CancellationToken ct) { SaveCount++; return Task.FromResult(1); } }
}

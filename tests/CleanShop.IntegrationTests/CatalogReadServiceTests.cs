using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.SharedKernel;
using CleanShop.Infrastructure.Persistence;
using CleanShop.Infrastructure.Persistence.ReadModels;
using Microsoft.EntityFrameworkCore;

namespace CleanShop.IntegrationTests;

public sealed class CatalogReadServiceTests
{
    [Fact]
    public async Task ListAsync_MapsComplexPrice_WhenUsingInMemoryProvider()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        await using var db = new AppDbContext(options, new NoOpDispatcher());
        db.Products.Add(new Product(ProductId.New(), "Coffee Mug", "MUG-001", new Money(14.90m), 10));
        await db.SaveChangesAsync();

        var products = await new CatalogReadService(db).ListAsync(CancellationToken.None);

        var product = Assert.Single(products);
        Assert.Equal(14.90m, product.Price);
        Assert.Equal("USD", product.Currency);
    }

    private sealed class NoOpDispatcher : IDomainEventDispatcher
    {
        public Task DispatchAsync(IEnumerable<IDomainEvent> events, CancellationToken ct) => Task.CompletedTask;
    }
}

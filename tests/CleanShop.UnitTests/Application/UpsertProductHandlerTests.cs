using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Application.Catalog.UpsertProduct;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.SharedKernel;

namespace CleanShop.UnitTests.Application;

public sealed class UpsertProductHandlerTests
{
    [Fact]
    public async Task Handle_WhenSkuAlreadyExists_ReturnsConflict()
    {
        var existing = new Product(ProductId.New(), "Coffee Mug", "MUG-001", new Money(14.90m), 10);
        var repository = new ProductRepositoryStub(existing);
        var result = await new UpsertProductHandler(repository).HandleAsync(new UpsertProductCommand(null, "Another Mug", " mug-001 ", 19.90m, 5), CancellationToken.None);

        Assert.True(result.IsFailure);
        Assert.Equal("conflict", result.Error.Code);
        Assert.Equal(0, repository.SaveChangesCalls);
    }

    private sealed class ProductRepositoryStub(Product existing) : IProductRepository
    {
        public int SaveChangesCalls { get; private set; }
        public Task<Product?> GetByIdAsync(ProductId id, CancellationToken ct) => Task.FromResult<Product?>(id == existing.Id ? existing : null);
        public Task<Product?> GetBySkuAsync(string sku, CancellationToken ct) => Task.FromResult<Product?>(sku == existing.Sku ? existing : null);
        public Task AddAsync(Product product, CancellationToken ct) => Task.CompletedTask;
        public Task<int> SaveChangesAsync(CancellationToken ct) { SaveChangesCalls++; return Task.FromResult(1); }
    }
}

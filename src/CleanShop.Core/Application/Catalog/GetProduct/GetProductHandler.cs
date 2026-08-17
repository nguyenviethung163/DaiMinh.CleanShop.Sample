using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Application.Catalog.GetProduct;

public sealed class GetProductHandler(ICatalogReadService readService) { public Task<ProductDetailsDto?> HandleAsync(ProductId id, CancellationToken ct) => readService.GetAsync(id, ct); }

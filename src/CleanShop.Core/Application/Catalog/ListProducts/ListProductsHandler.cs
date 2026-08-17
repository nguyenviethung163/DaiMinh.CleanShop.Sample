using CleanShop.Core.Abstractions.ReadModels;
namespace CleanShop.Core.Application.Catalog.ListProducts;

public sealed class ListProductsHandler(ICatalogReadService readService) { public Task<IReadOnlyList<ProductListItemDto>> HandleAsync(CancellationToken ct) => readService.ListAsync(ct); }

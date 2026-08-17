using CleanShop.Core.Application.Catalog;
using CleanShop.Core.Domain.Catalog;
namespace CleanShop.Core.Abstractions.ReadModels;

public interface ICatalogReadService { Task<IReadOnlyList<ProductListItemDto>> ListAsync(CancellationToken ct); Task<ProductDetailsDto?> GetAsync(ProductId id, CancellationToken ct); }

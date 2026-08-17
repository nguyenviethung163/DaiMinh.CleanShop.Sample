using CleanShop.Core.Application.Basket.AddBasketItem;
using CleanShop.Core.Application.Catalog.GetProduct;
using CleanShop.Core.Application.Catalog.ListProducts;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Web.Shared.Extensions;
using CleanShop.Web.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Features.Catalog;

public sealed class CatalogController(ListProductsHandler listProducts, GetProductHandler getProduct, AddBasketItemHandler addBasketItem, CustomerResolver customers) : Controller
{
    public async Task<IActionResult> Index(CancellationToken ct) => View(await listProducts.HandleAsync(ct));
    public async Task<IActionResult> Details(Guid id, CancellationToken ct) { var item = await getProduct.HandleAsync(new ProductId(id), ct); return item is null ? NotFound() : View(item); }
    [Authorize, HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> AddToBasket(Guid id, int quantity, CancellationToken ct) { var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct); if (customer is null) return Challenge(); var result = await addBasketItem.HandleAsync(new AddBasketItemCommand(customer.Id, new ProductId(id), quantity), ct); TempData[result.IsSuccess ? "Success" : "Error"] = result.IsSuccess ? "Item added to basket." : result.Error.Message; return RedirectToAction(nameof(Details), new { id }); }
}

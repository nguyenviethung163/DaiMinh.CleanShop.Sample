using CleanShop.Core.Application.Catalog.GetProduct;
using CleanShop.Core.Application.Catalog.ListProducts;
using CleanShop.Core.Application.Catalog.UpsertProduct;
using CleanShop.Core.Domain.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Areas.Admin.Controllers;

[Area("Admin"), Authorize(Roles = "Admin")]
public sealed class ProductsController(ListProductsHandler list, GetProductHandler get, UpsertProductHandler upsert) : Controller
{
    public async Task<IActionResult> Index(CancellationToken ct) => View(await list.HandleAsync(ct));
    [HttpGet] public IActionResult Create() => View(new ProductEditViewModel());
    [HttpPost, ValidateAntiForgeryToken] public async Task<IActionResult> Create(ProductEditViewModel model, CancellationToken ct) { if (!ModelState.IsValid) return View(model); var r = await upsert.HandleAsync(new UpsertProductCommand(null, model.Name, model.Sku, model.Price, model.StockQuantity), ct); if (r.IsFailure) { ModelState.AddModelError("", r.Error.Message); return View(model); } return RedirectToAction(nameof(Index)); }
    [HttpGet] public async Task<IActionResult> Edit(Guid id, CancellationToken ct) { var p = await get.HandleAsync(new ProductId(id), ct); return p is null ? NotFound() : View(new ProductEditViewModel { Id = p.Id.Value, Name = p.Name, Sku = p.Sku, Price = p.Price, StockQuantity = p.StockQuantity }); }
    [HttpPost, ValidateAntiForgeryToken] public async Task<IActionResult> Edit(ProductEditViewModel model, CancellationToken ct) { if (!ModelState.IsValid) return View(model); var r = await upsert.HandleAsync(new UpsertProductCommand(new ProductId(model.Id), model.Name, model.Sku, model.Price, model.StockQuantity), ct); if (r.IsFailure) { ModelState.AddModelError("", r.Error.Message); return View(model); } return RedirectToAction(nameof(Index)); }
}

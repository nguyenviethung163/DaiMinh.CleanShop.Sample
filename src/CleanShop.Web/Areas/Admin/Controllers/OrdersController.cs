using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Application.Orders.GetOrder;
using CleanShop.Core.Application.Orders.ShipOrder;
using CleanShop.Core.Domain.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Areas.Admin.Controllers;

[Area("Admin"), Authorize(Roles = "Admin")]
public sealed class OrdersController(IOrderReadService readService, GetOrderHandler getOrder, ShipOrderHandler ship) : Controller
{
    public async Task<IActionResult> Index(CancellationToken ct) => View(await readService.ListAllAsync(ct));
    public async Task<IActionResult> Details(Guid id, CancellationToken ct) { var o = await getOrder.HandleAsync(new OrderId(id), ct); return o is null ? NotFound() : View(o); }
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Ship(Guid id, CancellationToken ct)
    {
        var r = await ship.HandleAsync(new OrderId(id), ct);
        TempData[r.IsSuccess ? "Success" : "Error"] = r.IsSuccess ? "Order shipped." : r.Error.Message;
        return RedirectToAction(nameof(Details), new { id });
    }
}

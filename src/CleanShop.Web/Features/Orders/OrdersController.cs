using CleanShop.Core.Application.Orders.GetOrder;
using CleanShop.Core.Application.Orders.GetOrders;
using CleanShop.Core.Application.Orders.PayOrder;
using CleanShop.Core.Domain.Orders;
using CleanShop.Web.Shared.Extensions;
using CleanShop.Web.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Features.Orders;

[Authorize]
public sealed class OrdersController(GetOrdersHandler getOrders, GetOrderHandler getOrder, PayOrderHandler payOrder, CustomerResolver customers) : Controller
{
    public async Task<IActionResult> Index(CancellationToken ct)
    {
        var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct);
        if (customer is null) return Challenge();
        return View(await getOrders.HandleAsync(customer.Id, ct));
    }
    public async Task<IActionResult> Details(Guid id, CancellationToken ct)
    {
        var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct);
        if (customer is null) return Challenge();
        var order = await getOrder.HandleAsync(new OrderId(id), ct);
        return order is null || order.CustomerId != customer.Id ? NotFound() : View(order);
    }
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Pay(Guid id, CancellationToken ct)
    {
        var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct);
        if (customer is null) return Challenge();
        var order = await getOrder.HandleAsync(new OrderId(id), ct);
        if (order is null || order.CustomerId != customer.Id) return NotFound();
        var result = await payOrder.HandleAsync(new OrderId(id), ct);
        TempData[result.IsSuccess ? "Success" : "Error"] = result.IsSuccess ? "Payment completed by fake gateway." : result.Error.Message;
        return RedirectToAction(nameof(Details), new { id });
    }
}

using CleanShop.Core.Application.Orders.CreateOrder;
using CleanShop.Core.SharedKernel;
using CleanShop.Web.Shared.Extensions;
using CleanShop.Web.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Features.Checkout;

[Authorize]
public sealed class CheckoutController(CreateOrderHandler createOrder, CustomerResolver customers) : Controller
{
    [HttpGet] public IActionResult Index() => View(new CheckoutViewModel());
    [HttpPost, ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(CheckoutViewModel model, CancellationToken ct)
    { if (!ModelState.IsValid) return View(model); var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct); if (customer is null) return Challenge(); var result = await createOrder.HandleAsync(new CreateOrderCommand(customer.Id, new Address(model.Line1, model.City, model.Country, model.PostalCode)), ct); if (result.IsFailure) { ModelState.AddModelError(string.Empty, result.Error.Message); return View(model); } return RedirectToAction("Details", "Orders", new { id = result.Value.Value }); }
}

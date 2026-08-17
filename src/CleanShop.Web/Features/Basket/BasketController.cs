using CleanShop.Core.Application.Basket.GetBasket;
using CleanShop.Web.Shared.Extensions;
using CleanShop.Web.Shared.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Features.Basket;

[Authorize]
public sealed class BasketController(GetBasketHandler getBasket, CustomerResolver customers) : Controller
{
    public async Task<IActionResult> Index(CancellationToken ct)
    {
        var customer = await customers.FindByIdentityIdAsync(User.GetUserId(), ct);
        if (customer is null) return Challenge();
        return View(await getBasket.HandleAsync(customer.Id, ct));
    }
}

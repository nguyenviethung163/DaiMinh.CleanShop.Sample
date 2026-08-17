using Microsoft.AspNetCore.Mvc;
namespace CleanShop.Web.Features.Home;

public sealed class HomeController : Controller { public IActionResult Index() => View(); public IActionResult Error() => View(); }

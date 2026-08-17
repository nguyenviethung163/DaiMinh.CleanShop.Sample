using CleanShop.Core.Application.Basket.AddBasketItem;
using CleanShop.Core.Application.Basket.GetBasket;
using CleanShop.Core.Application.Catalog.GetProduct;
using CleanShop.Core.Application.Catalog.ListProducts;
using CleanShop.Core.Application.Catalog.UpsertProduct;
using CleanShop.Core.Application.Orders.CreateOrder;
using CleanShop.Core.Application.Orders.GetOrder;
using CleanShop.Core.Application.Orders.GetOrders;
using CleanShop.Core.Application.Orders.PayOrder;
using CleanShop.Core.Application.Orders.ShipOrder;
using Microsoft.Extensions.DependencyInjection;
namespace CleanShop.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddCore(this IServiceCollection services) => services
        .AddScoped<ListProductsHandler>().AddScoped<GetProductHandler>().AddScoped<UpsertProductHandler>()
        .AddScoped<AddBasketItemHandler>().AddScoped<GetBasketHandler>().AddScoped<CreateOrderHandler>().AddScoped<GetOrdersHandler>()
        .AddScoped<GetOrderHandler>().AddScoped<PayOrderHandler>().AddScoped<ShipOrderHandler>();
}

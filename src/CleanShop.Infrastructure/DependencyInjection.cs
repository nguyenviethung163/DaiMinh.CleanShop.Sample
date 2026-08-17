using CleanShop.Core.Abstractions.Email;
using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.Abstractions.Payments;
using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Abstractions.ReadModels;
using CleanShop.Core.Abstractions.Time;
using CleanShop.Core.Domain.Orders.Events;
using CleanShop.Infrastructure.Email;
using CleanShop.Infrastructure.Events;
using CleanShop.Infrastructure.Identity;
using CleanShop.Infrastructure.Payments;
using CleanShop.Infrastructure.Persistence;
using CleanShop.Infrastructure.Persistence.ReadModels;
using CleanShop.Infrastructure.Persistence.Repositories;
using CleanShop.Infrastructure.Time;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
namespace CleanShop.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseProvider = configuration["Database:Provider"] ?? "SqlServer";
        services.Configure<PaymentGatewayOptions>(configuration.GetSection(PaymentGatewayOptions.SectionName));
        services.AddScoped<IDomainEventDispatcher, DomainEventDispatcher>();
        services.AddScoped<IDomainEventHandler<OrderSubmittedDomainEvent>, OrderSubmittedLoggingHandler>();
        services.AddScoped<IDomainEventHandler<OrderSubmittedDomainEvent>, OrderSubmittedNotificationHandler>();
        services.AddScoped<IEmailSender, LoggingEmailSender>();
        services.AddDbContext<AppDbContext>(o =>
        {
            if (string.Equals(databaseProvider, "InMemory", StringComparison.OrdinalIgnoreCase))
            {
                var databaseName = configuration["Database:InMemoryDatabaseName"] ?? "CleanShop";
                o.UseInMemoryDatabase(databaseName);
                return;
            }

            if (string.Equals(databaseProvider, "SqlServer", StringComparison.OrdinalIgnoreCase))
            {
                var connectionString = configuration.GetConnectionString("DefaultConnection")
                    ?? throw new InvalidOperationException("DefaultConnection is missing.");
                o.UseSqlServer(connectionString);
                return;
            }

            throw new InvalidOperationException($"Unsupported database provider '{databaseProvider}'. Use SqlServer or InMemory.");
        });
        services.AddIdentity<ApplicationUser, IdentityRole>(o => { o.Password.RequiredLength = 8; o.User.RequireUniqueEmail = true; }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
        services.AddScoped<IProductRepository, ProductRepository>().AddScoped<IBasketRepository, BasketRepository>().AddScoped<IOrderRepository, OrderRepository>().AddScoped<ICustomerRepository, CustomerRepository>().AddScoped<IPaymentRepository, PaymentRepository>();
        services.AddScoped<ICatalogReadService, CatalogReadService>().AddScoped<IBasketReadService, BasketReadService>().AddScoped<IOrderReadService, OrderReadService>();
        services.AddSingleton<IClock, SystemClock>().AddScoped<IPaymentGateway, FakePaymentGateway>();
        return services;
    }
}

using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
using CleanShop.Core.Domain.Payments;
using CleanShop.Core.SharedKernel;
using CleanShop.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options, IDomainEventDispatcher dispatcher) : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Basket> Baskets => Set<Basket>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Payment> Payments => Set<Payment>();
    protected override void OnModelCreating(ModelBuilder builder) { base.OnModelCreating(builder); builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly); }
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var aggregates = ChangeTracker.Entries<IAggregateRoot>().Select(x => x.Entity).Where(x => x.DomainEvents.Count > 0).ToList();
        var events = aggregates.SelectMany(x => x.DomainEvents).ToList();
        var result = await base.SaveChangesAsync(cancellationToken);
        foreach (var aggregate in aggregates) aggregate.ClearDomainEvents();
        await dispatcher.DispatchAsync(events, cancellationToken);
        return result;
    }
}

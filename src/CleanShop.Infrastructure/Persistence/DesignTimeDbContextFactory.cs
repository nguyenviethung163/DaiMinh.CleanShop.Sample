using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.SharedKernel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace CleanShop.Infrastructure.Persistence;

public sealed class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
            ?? "Server=127.0.0.1,1433;Database=CleanShop;User Id=sa;Password=Your_password123;TrustServerCertificate=True;Encrypt=False";
        var options = new DbContextOptionsBuilder<AppDbContext>().UseSqlServer(connectionString).Options;
        return new AppDbContext(options, new NoOpDispatcher());
    }
    private sealed class NoOpDispatcher : IDomainEventDispatcher
    {
        public Task DispatchAsync(IEnumerable<IDomainEvent> events, CancellationToken ct) => Task.CompletedTask;
    }
}

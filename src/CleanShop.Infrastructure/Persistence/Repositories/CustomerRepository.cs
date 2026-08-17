using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Customers;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence.Repositories;

public sealed class CustomerRepository(AppDbContext db) : ICustomerRepository
{
    public Task<Customer?> GetByIdentityUserIdAsync(string identityUserId, CancellationToken ct) => db.Customers.AsNoTracking().SingleOrDefaultAsync(x => x.IdentityUserId == identityUserId, ct);
}

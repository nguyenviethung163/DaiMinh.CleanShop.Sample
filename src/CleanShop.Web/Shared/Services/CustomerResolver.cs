using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Customers;
namespace CleanShop.Web.Shared.Services;

public sealed class CustomerResolver(ICustomerRepository customers)
{
    public Task<Customer?> FindByIdentityIdAsync(string userId, CancellationToken ct) => customers.GetByIdentityUserIdAsync(userId, ct);
}

using CleanShop.Core.Domain.Customers;
namespace CleanShop.Core.Abstractions.Persistence;

public interface ICustomerRepository
{
    Task<Customer?> GetByIdentityUserIdAsync(string identityUserId, CancellationToken ct);
}

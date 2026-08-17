using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Customers;

public sealed class Customer : AggregateRoot<CustomerId>
{
    private Customer() : base(default) { }
    public Customer(CustomerId id, string identityUserId, string email, string displayName) : base(id)
    { IdentityUserId = identityUserId; ChangeEmail(email); Rename(displayName); }
    public string IdentityUserId { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string DisplayName { get; private set; } = string.Empty;
    public void ChangeEmail(string email) { if (string.IsNullOrWhiteSpace(email) || !email.Contains('@')) throw new DomainException("A valid email is required."); Email = email.Trim().ToLowerInvariant(); }
    public void Rename(string name) { if (string.IsNullOrWhiteSpace(name)) throw new DomainException("Display name is required."); DisplayName = name.Trim(); }
}

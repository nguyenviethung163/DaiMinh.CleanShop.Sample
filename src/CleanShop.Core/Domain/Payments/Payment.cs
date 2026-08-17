using CleanShop.Core.Domain.Orders;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Payments;

public enum PaymentStatus { Pending = 0, Completed = 1, Failed = 2 }
public sealed class Payment : AggregateRoot<Guid>
{
    private Payment() : base(Guid.Empty) { }
    public Payment(Guid id, OrderId orderId, Money amount) : base(id) { OrderId = orderId; Amount = amount; Status = PaymentStatus.Pending; }
    public OrderId OrderId { get; private set; }
    public Money Amount { get; private set; } = Money.Zero();
    public PaymentStatus Status { get; private set; }
    public string? ProviderReference { get; private set; }
    public void Complete(string providerReference) { if (Status != PaymentStatus.Pending) throw new DomainException("Payment is already resolved."); Status = PaymentStatus.Completed; ProviderReference = providerReference; }
    public void Fail() { if (Status != PaymentStatus.Pending) throw new DomainException("Payment is already resolved."); Status = PaymentStatus.Failed; }
}

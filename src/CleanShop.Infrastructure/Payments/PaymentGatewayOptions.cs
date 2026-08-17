namespace CleanShop.Infrastructure.Payments;

public sealed class PaymentGatewayOptions
{
    public const string SectionName = "Payment";
    public string ProviderName { get; init; } = "FakePayment";
}

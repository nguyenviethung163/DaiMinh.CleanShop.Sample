namespace CleanShop.Core.SharedKernel;

public sealed record Money
{
    private Money() { Currency = "USD"; }
    public Money(decimal amount, string currency = "USD")
    {
        if (amount < 0) throw new DomainException("Money cannot be negative.");
        if (string.IsNullOrWhiteSpace(currency)) throw new DomainException("Currency is required.");
        Amount = decimal.Round(amount, 2, MidpointRounding.ToEven);
        Currency = currency.ToUpperInvariant();
    }
    public decimal Amount { get; private set; }
    public string Currency { get; private set; }
    public static Money Zero(string currency = "USD") => new(0, currency);
    public static Money operator +(Money left, Money right)
    {
        if (left.Currency != right.Currency) throw new DomainException("Cannot add money with different currencies.");
        return new Money(left.Amount + right.Amount, left.Currency);
    }
    public static Money operator *(Money money, int quantity) => new(money.Amount * quantity, money.Currency);
}

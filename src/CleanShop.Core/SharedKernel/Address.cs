namespace CleanShop.Core.SharedKernel;

public sealed record Address
{
    private Address() { }
    public Address(string line1, string city, string country, string postalCode)
    {
        if (string.IsNullOrWhiteSpace(line1) || string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(country) || string.IsNullOrWhiteSpace(postalCode))
            throw new DomainException("A complete shipping address is required.");
        Line1 = line1.Trim(); City = city.Trim(); Country = country.Trim(); PostalCode = postalCode.Trim();
    }
    public string Line1 { get; private set; } = string.Empty;
    public string City { get; private set; } = string.Empty;
    public string Country { get; private set; } = string.Empty;
    public string PostalCode { get; private set; } = string.Empty;
    public Address Normalize() => new(Line1, City, Country, PostalCode);
}

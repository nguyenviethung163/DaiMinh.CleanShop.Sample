namespace CleanShop.Core.Abstractions.Time;

public interface IClock { DateTimeOffset UtcNow { get; } }

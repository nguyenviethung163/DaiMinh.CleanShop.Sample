using CleanShop.Core.Abstractions.Time;
namespace CleanShop.Infrastructure.Time;

public sealed class SystemClock : IClock { public DateTimeOffset UtcNow => DateTimeOffset.UtcNow; }

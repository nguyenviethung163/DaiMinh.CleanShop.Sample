namespace CleanShop.Core.SharedKernel;

public interface IDomainEvent { DateTimeOffset OccurredOnUtc { get; } }

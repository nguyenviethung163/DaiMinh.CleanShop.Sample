using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Domain.Orders.Events;

public sealed record OrderSubmittedDomainEvent(OrderId OrderId, DateTimeOffset OccurredOnUtc) : IDomainEvent;

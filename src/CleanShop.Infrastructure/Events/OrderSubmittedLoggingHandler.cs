using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.Domain.Orders.Events;
using Microsoft.Extensions.Logging;
namespace CleanShop.Infrastructure.Events;

public sealed class OrderSubmittedLoggingHandler(ILogger<OrderSubmittedLoggingHandler> logger) : IDomainEventHandler<OrderSubmittedDomainEvent>
{
    public Task HandleAsync(OrderSubmittedDomainEvent domainEvent, CancellationToken ct)
    {
        logger.LogInformation("Order {OrderId} was submitted at {OccurredOnUtc}", domainEvent.OrderId, domainEvent.OccurredOnUtc);
        return Task.CompletedTask;
    }
}

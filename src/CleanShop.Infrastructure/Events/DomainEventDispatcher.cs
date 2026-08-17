using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.SharedKernel;
using Microsoft.Extensions.DependencyInjection;
namespace CleanShop.Infrastructure.Events;

public sealed class DomainEventDispatcher(IServiceProvider services) : IDomainEventDispatcher
{
    public async Task DispatchAsync(IEnumerable<IDomainEvent> events, CancellationToken ct)
    {
        foreach (var domainEvent in events)
        {
            var handlerType = typeof(IDomainEventHandler<>).MakeGenericType(domainEvent.GetType());
            foreach (var handler in services.GetServices(handlerType))
            {
                var method = handlerType.GetMethod(nameof(IDomainEventHandler<IDomainEvent>.HandleAsync))!;
                var task = (Task)method.Invoke(handler, [domainEvent, ct])!;
                await task.ConfigureAwait(false);
            }
        }
    }
}

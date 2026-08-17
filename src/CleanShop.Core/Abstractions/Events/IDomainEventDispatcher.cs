using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Abstractions.Events;

public interface IDomainEventDispatcher { Task DispatchAsync(IEnumerable<IDomainEvent> events, CancellationToken ct); }
public interface IDomainEventHandler<in TEvent> where TEvent : IDomainEvent { Task HandleAsync(TEvent domainEvent, CancellationToken ct); }

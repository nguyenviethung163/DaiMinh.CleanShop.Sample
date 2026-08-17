using CleanShop.Core.Abstractions.Email;
using CleanShop.Core.Abstractions.Events;
using CleanShop.Core.Domain.Orders.Events;
using CleanShop.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Events;

public sealed class OrderSubmittedNotificationHandler(AppDbContext db, IEmailSender email) : IDomainEventHandler<OrderSubmittedDomainEvent>
{
    public async Task HandleAsync(OrderSubmittedDomainEvent domainEvent, CancellationToken ct)
    {
        var customerId = await db.Orders.AsNoTracking()
            .Where(x => x.Id == domainEvent.OrderId)
            .Select(x => x.CustomerId)
            .SingleOrDefaultAsync(ct);
        if (customerId.Value == Guid.Empty) return;
        var recipient = await db.Customers.AsNoTracking()
            .Where(x => x.Id == customerId)
            .Select(x => x.Email)
            .SingleOrDefaultAsync(ct);
        if (recipient is not null)
            await email.SendAsync(recipient, "CleanShop order submitted", $"Order {domainEvent.OrderId} has been submitted.", ct);
    }
}

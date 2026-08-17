using CleanShop.Core.Abstractions.Persistence;
using CleanShop.Core.Domain.Payments;
namespace CleanShop.Infrastructure.Persistence.Repositories;

public sealed class PaymentRepository(AppDbContext db) : IPaymentRepository
{
    public async Task AddAsync(Payment payment, CancellationToken ct) => await db.Payments.AddAsync(payment, ct);
    public Task<int> SaveChangesAsync(CancellationToken ct) => db.SaveChangesAsync(ct);
}

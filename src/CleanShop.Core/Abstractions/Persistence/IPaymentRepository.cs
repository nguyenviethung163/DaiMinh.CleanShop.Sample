using CleanShop.Core.Domain.Payments;
namespace CleanShop.Core.Abstractions.Persistence;

public interface IPaymentRepository { Task AddAsync(Payment payment, CancellationToken ct); Task<int> SaveChangesAsync(CancellationToken ct); }

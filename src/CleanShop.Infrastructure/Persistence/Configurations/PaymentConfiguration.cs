using CleanShop.Core.Domain.Orders;
using CleanShop.Core.Domain.Payments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CleanShop.Infrastructure.Persistence.Configurations;

public sealed class PaymentConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> b) { b.ToTable("Payments"); b.HasKey(x => x.Id); b.Property(x => x.OrderId).HasConversion(x => x.Value, x => new OrderId(x)); b.OwnsOne(x => x.Amount, m => { m.Property(x => x.Amount).HasColumnName("Amount").HasPrecision(18, 2); m.Property(x => x.Currency).HasColumnName("Currency").HasMaxLength(3); }); b.Ignore(x => x.DomainEvents); }
}

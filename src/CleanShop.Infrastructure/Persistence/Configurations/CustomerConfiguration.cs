using CleanShop.Core.Domain.Customers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CleanShop.Infrastructure.Persistence.Configurations;

public sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> b) { b.ToTable("Customers"); b.HasKey(x => x.Id); b.Property(x => x.Id).HasConversion(x => x.Value, x => new CustomerId(x)); b.Property(x => x.Email).HasMaxLength(320); b.Property(x => x.DisplayName).HasMaxLength(160); b.Property(x => x.IdentityUserId).HasMaxLength(450); b.HasIndex(x => x.IdentityUserId).IsUnique(); b.Ignore(x => x.DomainEvents); }
}

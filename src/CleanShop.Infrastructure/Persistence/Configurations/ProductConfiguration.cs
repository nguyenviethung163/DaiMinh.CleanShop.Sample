using CleanShop.Core.Domain.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CleanShop.Infrastructure.Persistence.Configurations;

public sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> b)
    {
        b.ToTable("Products"); b.HasKey(x => x.Id); b.Property(x => x.Id).HasConversion(x => x.Value, x => new ProductId(x));
        b.Property(x => x.Name).HasMaxLength(200).IsRequired(); b.Property(x => x.Sku).HasMaxLength(64).IsRequired(); b.HasIndex(x => x.Sku).IsUnique();
        b.OwnsOne(x => x.Price, m => { m.Property(x => x.Amount).HasColumnName("Price").HasPrecision(18, 2); m.Property(x => x.Currency).HasColumnName("Currency").HasMaxLength(3); });
        b.Ignore(x => x.DomainEvents);
    }
}

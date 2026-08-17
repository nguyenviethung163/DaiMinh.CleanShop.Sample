using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CleanShop.Infrastructure.Persistence.Configurations;

public sealed class BasketConfiguration : IEntityTypeConfiguration<Basket>
{
    public void Configure(EntityTypeBuilder<Basket> b)
    {
        b.ToTable("Baskets"); b.HasKey(x => x.Id); b.Property(x => x.Id).HasConversion(x => x.Value, x => new BasketId(x)); b.Property(x => x.CustomerId).HasConversion(x => x.Value, x => new CustomerId(x)); b.HasIndex(x => x.CustomerId).IsUnique(); b.Ignore(x => x.Total); b.Ignore(x => x.DomainEvents);
        b.OwnsMany(x => x.Items, i => { i.ToTable("BasketItems"); i.WithOwner().HasForeignKey("BasketId"); i.HasKey(x => x.Id); i.Property(x => x.ProductId).HasConversion(x => x.Value, x => new ProductId(x)); i.OwnsOne(x => x.UnitPrice, m => { m.Property(x => x.Amount).HasColumnName("UnitPrice").HasPrecision(18, 2); m.Property(x => x.Currency).HasColumnName("Currency").HasMaxLength(3); }); i.Ignore(x => x.Subtotal); });
    }
}

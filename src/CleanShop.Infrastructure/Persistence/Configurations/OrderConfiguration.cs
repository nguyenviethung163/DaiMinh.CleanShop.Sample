using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CleanShop.Infrastructure.Persistence.Configurations;

public sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> b)
    {
        b.ToTable("Orders"); b.HasKey(x => x.Id); b.Property(x => x.Id).HasConversion(x => x.Value, x => new OrderId(x)); b.Property(x => x.CustomerId).HasConversion(x => x.Value, x => new CustomerId(x)); b.Ignore(x => x.Total); b.Ignore(x => x.DomainEvents);
        b.OwnsOne(x => x.ShippingAddress, a => { a.Property(x => x.Line1).HasColumnName("ShippingLine1").HasMaxLength(250); a.Property(x => x.City).HasColumnName("ShippingCity").HasMaxLength(100); a.Property(x => x.Country).HasColumnName("ShippingCountry").HasMaxLength(100); a.Property(x => x.PostalCode).HasColumnName("ShippingPostalCode").HasMaxLength(30); });
        b.OwnsMany(x => x.Items, i => { i.ToTable("OrderItems"); i.WithOwner().HasForeignKey("OrderId"); i.HasKey(x => x.Id); i.Property(x => x.ProductId).HasConversion(x => x.Value, x => new ProductId(x)); i.Property(x => x.ProductName).HasMaxLength(200); i.OwnsOne(x => x.UnitPrice, m => { m.Property(x => x.Amount).HasColumnName("UnitPrice").HasPrecision(18, 2); m.Property(x => x.Currency).HasColumnName("Currency").HasMaxLength(3); }); i.Ignore(x => x.Subtotal); });
    }
}

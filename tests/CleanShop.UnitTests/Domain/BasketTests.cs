using CleanShop.Core.Domain.Basket;
using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.SharedKernel;
namespace CleanShop.UnitTests.Domain;

public sealed class BasketTests { [Fact] public void AddSameProduct_IncrementsQuantity() { var p = ProductId.New(); var b = new Basket(BasketId.New(), CustomerId.New()); b.AddItem(p, "P", new Money(5), 1); b.AddItem(p, "P", new Money(5), 2); Assert.Single(b.Items); Assert.Equal(3, b.Items.Single().Quantity); Assert.Equal(15, b.Total.Amount); } }

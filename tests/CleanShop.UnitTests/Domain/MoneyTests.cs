using CleanShop.Core.SharedKernel;
namespace CleanShop.UnitTests.Domain;

public sealed class MoneyTests { [Fact] public void NegativeAmount_Throws() => Assert.Throws<DomainException>(() => new Money(-1)); [Fact] public void Add_SameCurrency_Works() => Assert.Equal(15, (new Money(10) + new Money(5)).Amount); }

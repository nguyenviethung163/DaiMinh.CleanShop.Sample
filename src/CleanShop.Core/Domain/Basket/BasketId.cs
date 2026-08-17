namespace CleanShop.Core.Domain.Basket;

public readonly record struct BasketId(Guid Value) { public static BasketId New() => new(Guid.NewGuid()); }

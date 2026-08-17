using CleanShop.Core.Domain.Customers;
using CleanShop.Core.Domain.Orders;
namespace CleanShop.Core.Application.Orders;

public sealed record OrderListItemDto(OrderId Id, DateTimeOffset CreatedAtUtc, OrderStatus Status, decimal Total, string Currency);
public sealed record OrderLineDto(string ProductName, int Quantity, decimal UnitPrice, decimal Subtotal);
public sealed record OrderDetailsDto(OrderId Id, CustomerId CustomerId, DateTimeOffset CreatedAtUtc, OrderStatus Status, string ShippingLine1, string City, string Country, string PostalCode, decimal Total, string Currency, IReadOnlyList<OrderLineDto> Lines);

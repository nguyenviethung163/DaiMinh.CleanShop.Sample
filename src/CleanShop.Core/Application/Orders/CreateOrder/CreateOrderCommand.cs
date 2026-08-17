using CleanShop.Core.Domain.Customers;
using CleanShop.Core.SharedKernel;
namespace CleanShop.Core.Application.Orders.CreateOrder;

public sealed record CreateOrderCommand(CustomerId CustomerId, Address ShippingAddress);

using System.ComponentModel.DataAnnotations;
namespace CleanShop.Web.Features.Checkout;

public sealed class CheckoutViewModel { [Required, StringLength(250)] public string Line1 { get; set; } = string.Empty; [Required, StringLength(100)] public string City { get; set; } = string.Empty; [Required, StringLength(100)] public string Country { get; set; } = string.Empty; [Required, StringLength(30)] public string PostalCode { get; set; } = string.Empty; }

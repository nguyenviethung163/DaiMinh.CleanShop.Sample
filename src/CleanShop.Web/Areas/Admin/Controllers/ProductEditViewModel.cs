using System.ComponentModel.DataAnnotations;
namespace CleanShop.Web.Areas.Admin.Controllers;

public sealed class ProductEditViewModel { public Guid Id { get; set; } [Required, StringLength(200)] public string Name { get; set; } = string.Empty; [Required, StringLength(64)] public string Sku { get; set; } = string.Empty; [Range(0.01, 1000000)] public decimal Price { get; set; } [Range(0, 1000000)] public int StockQuantity { get; set; } }

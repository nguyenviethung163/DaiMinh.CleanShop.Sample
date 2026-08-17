using CleanShop.Core.Domain.Catalog;
using CleanShop.Core.Domain.Customers;
using CleanShop.Core.SharedKernel;
using CleanShop.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
namespace CleanShop.Infrastructure.Persistence;

public static class DbInitializer
{
    public const string AdminEmail = "admin@cleanshop.local"; public const string CustomerEmail = "customer@cleanshop.local"; public const string DevelopmentPassword = "CleanShop123!";
    public static async Task InitializeAsync(AppDbContext db, UserManager<ApplicationUser> users, RoleManager<IdentityRole> roles)
    {
        if (db.Database.IsRelational())
        {
            var migrations = db.Database.GetMigrations();
            if (migrations.Any()) await db.Database.MigrateAsync(); else await db.Database.EnsureCreatedAsync();
        }
        else await db.Database.EnsureCreatedAsync();
        foreach (var role in new[] { "Admin", "Customer" }) if (!await roles.RoleExistsAsync(role)) await roles.CreateAsync(new IdentityRole(role));
        var admin = await EnsureUser(users, AdminEmail, "CleanShop Admin"); await EnsureRole(users, admin, "Admin");
        var customerUser = await EnsureUser(users, CustomerEmail, "Demo Customer"); await EnsureRole(users, customerUser, "Customer");
        var customer = await db.Customers.SingleOrDefaultAsync(x => x.IdentityUserId == customerUser.Id);
        if (customer is null) { customer = new Customer(CustomerId.New(), customerUser.Id, CustomerEmail, "Demo Customer"); db.Customers.Add(customer); }
        if (!await db.Products.AnyAsync()) db.Products.AddRange(
            new Product(ProductId.New(), "Clean Architecture T-Shirt", "TSHIRT-001", new Money(29.90m), 50),
            new Product(ProductId.New(), "DDD Coffee Mug", "MUG-001", new Money(14.90m), 100),
            new Product(ProductId.New(), "ASP.NET Core Notebook", "NOTE-001", new Money(9.90m), 75));
        await db.SaveChangesAsync();
    }
    private static async Task<ApplicationUser> EnsureUser(UserManager<ApplicationUser> users, string email, string name) { var user = await users.FindByEmailAsync(email); if (user is not null) return user; user = new ApplicationUser { UserName = email, Email = email, EmailConfirmed = true, DisplayName = name }; var result = await users.CreateAsync(user, DevelopmentPassword); if (!result.Succeeded) throw new InvalidOperationException(string.Join("; ", result.Errors.Select(x => x.Description))); return user; }
    private static async Task EnsureRole(UserManager<ApplicationUser> users, ApplicationUser user, string role) { if (!await users.IsInRoleAsync(user, role)) await users.AddToRoleAsync(user, role); }
}

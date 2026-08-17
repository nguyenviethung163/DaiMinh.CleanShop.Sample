using CleanShop.Core;
using CleanShop.Infrastructure;
using CleanShop.Infrastructure.Identity;
using CleanShop.Infrastructure.Persistence;
using CleanShop.Web;
using CleanShop.Web.Shared.Middleware;
using Microsoft.AspNetCore.Identity;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCore();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddWeb();
var app = builder.Build();
if (app.Environment.IsDevelopment()) app.UseDeveloperExceptionPage(); else { app.UseExceptionHandler("/Home/Error"); app.UseHsts(); }
app.UseMiddleware<CorrelationIdMiddleware>(); app.UseMiddleware<RequestLoggingMiddleware>(); app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseHttpsRedirection(); app.UseStaticFiles(); app.UseRouting(); app.UseAuthentication(); app.UseAuthorization();
app.MapControllerRoute(name: "areas", pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
using (var scope = app.Services.CreateScope()) { var db = scope.ServiceProvider.GetRequiredService<AppDbContext>(); var um = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>(); var rm = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>(); await DbInitializer.InitializeAsync(db, um, rm); }
app.Run();
public partial class Program { }

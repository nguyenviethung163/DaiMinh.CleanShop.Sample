using CleanShop.Web.Shared.Services;
namespace CleanShop.Web;

public static class DependencyInjection
{
    public static IServiceCollection AddWeb(this IServiceCollection services)
    {
        services.AddOptions<ApplicationOptions>().BindConfiguration(ApplicationOptions.SectionName);
        services.AddControllersWithViews().AddRazorOptions(o =>
        {
            o.ViewLocationFormats.Insert(0, "/Features/{1}/{0}.cshtml");
            o.ViewLocationFormats.Insert(1, "/Features/Shared/{0}.cshtml");
        });
        services.AddScoped<CustomerResolver>();
        services.ConfigureApplicationCookie(o => { o.LoginPath = "/Account/Login"; o.AccessDeniedPath = "/Account/AccessDenied"; });
        return services;
    }
}

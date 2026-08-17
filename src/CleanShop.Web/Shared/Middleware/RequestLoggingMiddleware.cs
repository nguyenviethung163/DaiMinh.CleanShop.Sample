using System.Diagnostics;
namespace CleanShop.Web.Shared.Middleware;

public sealed class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        try { await next(context); }
        finally { sw.Stop(); logger.LogInformation("HTTP {Method} {Path} responded {StatusCode} in {ElapsedMs}ms correlation={CorrelationId}", context.Request.Method, context.Request.Path, context.Response.StatusCode, sw.ElapsedMilliseconds, context.TraceIdentifier); }
    }
}

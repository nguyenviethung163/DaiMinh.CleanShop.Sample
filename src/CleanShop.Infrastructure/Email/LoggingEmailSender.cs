using CleanShop.Core.Abstractions.Email;
using Microsoft.Extensions.Logging;
namespace CleanShop.Infrastructure.Email;

public sealed class LoggingEmailSender(ILogger<LoggingEmailSender> logger) : IEmailSender
{
    public Task SendAsync(string to, string subject, string body, CancellationToken ct)
    {
        logger.LogInformation("DEV EMAIL to={To} subject={Subject} body={Body}", to, subject, body);
        return Task.CompletedTask;
    }
}

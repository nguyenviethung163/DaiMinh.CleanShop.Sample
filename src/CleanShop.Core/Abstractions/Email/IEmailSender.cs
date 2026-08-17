namespace CleanShop.Core.Abstractions.Email;

public interface IEmailSender { Task SendAsync(string to, string subject, string body, CancellationToken ct); }

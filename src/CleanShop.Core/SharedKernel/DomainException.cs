namespace CleanShop.Core.SharedKernel;

public sealed class DomainException(string message) : Exception(message);

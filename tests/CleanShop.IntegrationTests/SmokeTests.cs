using Microsoft.AspNetCore.Mvc.Testing;
namespace CleanShop.IntegrationTests;

public sealed class SmokeTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    public SmokeTests(WebApplicationFactory<Program> factory) => _factory = factory;
    [Fact(Skip = "Requires SQL Server configured for the application startup migration.")] public async Task Home_ReturnsSuccess() { using var client = _factory.CreateClient(); var response = await client.GetAsync("/"); response.EnsureSuccessStatusCode(); }
}

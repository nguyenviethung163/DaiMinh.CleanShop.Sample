using NetArchTest.Rules;
namespace CleanShop.ArchitectureTests;

public sealed class ArchitectureRulesTests
{
    [Fact] public void Core_DoesNotDependOn_Infrastructure() { var r = Types.InAssembly(typeof(CleanShop.Core.SharedKernel.Result).Assembly).ShouldNot().HaveDependencyOn("CleanShop.Infrastructure").GetResult(); Assert.True(r.IsSuccessful, string.Join(", ", r.FailingTypeNames ?? [])); }
    [Fact] public void Core_DoesNotDependOn_Web() { var r = Types.InAssembly(typeof(CleanShop.Core.SharedKernel.Result).Assembly).ShouldNot().HaveDependencyOn("CleanShop.Web").GetResult(); Assert.True(r.IsSuccessful, string.Join(", ", r.FailingTypeNames ?? [])); }
    [Fact] public void Domain_DoesNotDependOn_EntityFramework() { var r = Types.InAssembly(typeof(CleanShop.Core.SharedKernel.Result).Assembly).That().ResideInNamespaceStartingWith("CleanShop.Core.Domain").ShouldNot().HaveDependencyOn("Microsoft.EntityFrameworkCore").GetResult(); Assert.True(r.IsSuccessful, string.Join(", ", r.FailingTypeNames ?? [])); }
    [Fact] public void Controllers_DoNotDependOn_DbContext() { var r = Types.InAssembly(typeof(Program).Assembly).That().HaveNameEndingWith("Controller").ShouldNot().HaveDependencyOn("CleanShop.Infrastructure.Persistence").GetResult(); Assert.True(r.IsSuccessful, string.Join(", ", r.FailingTypeNames ?? [])); }
}

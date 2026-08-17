using CleanShop.Core.SharedKernel.Specifications;
namespace CleanShop.Infrastructure.Persistence.Specifications;

internal static class SpecificationExtensions
{
    public static IQueryable<T> Apply<T>(this IQueryable<T> query, ISpecification<T> specification) where T : class => query.Where(specification.Criteria);
}

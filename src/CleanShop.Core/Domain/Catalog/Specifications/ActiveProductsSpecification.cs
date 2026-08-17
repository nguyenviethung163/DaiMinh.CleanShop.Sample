using System.Linq.Expressions;
using CleanShop.Core.SharedKernel.Specifications;
namespace CleanShop.Core.Domain.Catalog.Specifications;

public sealed class ActiveProductsSpecification : ISpecification<Product>
{
    public Expression<Func<Product, bool>> Criteria => product => product.Status == ProductStatus.Active;
}

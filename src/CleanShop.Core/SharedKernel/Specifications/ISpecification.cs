using System.Linq.Expressions;
namespace CleanShop.Core.SharedKernel.Specifications;

public interface ISpecification<T> { Expression<Func<T, bool>> Criteria { get; } }

namespace CleanShop.Core.SharedKernel;

public class Result
{
    protected Result(bool isSuccess, Error error) { IsSuccess = isSuccess; Error = error; }
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }
    public static Result Success() => new(true, Error.None);
    public static Result Failure(Error error) => new(false, error);
}
public sealed class Result<T>
{
    private readonly T? _value;
    private Result(bool isSuccess, T? value, Error error) { IsSuccess = isSuccess; _value = value; Error = error; }
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public Error Error { get; }
    public T Value => IsSuccess ? _value! : throw new InvalidOperationException("A failed result has no value.");
    public static Result<T> Success(T value) => new(true, value, Error.None);
    public static Result<T> Failure(Error error) => new(false, default, error);
}

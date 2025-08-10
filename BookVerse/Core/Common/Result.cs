namespace Core.Common;

public class Result
{
    public bool IsSuccess { get; }
    public string[] Errors { get; }
    public bool IsFailure => !IsSuccess;

    protected Result(bool isSuccess, string[] errors)
    {
        IsSuccess = isSuccess;
        Errors = errors;
    }

    public static Result Success() => new(true, []);
    public static Result Failure(string[] errors) => new (false, errors);
    
    public static Result<T> Success<T>(T value) => new(value, true, []);
    public static Result<T?> Failure<T>(string[] errors) => new(default, false, errors);
}

public class Result<T> : Result
{
    private readonly T _value;
    public T Value => IsSuccess ? _value : throw new InvalidOperationException("Cannot access Value of a failed result");

    protected internal Result(T value, bool isSuccess, string[] errors)
        : base(isSuccess, errors)
    {
        _value = value;
    }
}
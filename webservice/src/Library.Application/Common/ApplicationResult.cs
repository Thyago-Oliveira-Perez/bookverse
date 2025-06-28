namespace Library.Application.Common;

public class ApplicationResult<T>
{
    public bool Success { get; init; }
    public ApplicationResultTypes Code { get; init; }
    public string? ErrorMessage { get; init; }
    public T? Data { get; init; }

    public static ApplicationResult<T> Ok(T data) => new() { Success = true, Data = data };
    public static ApplicationResult<T> Fail(string error, ApplicationResultTypes code) => new()
    {
        Success = false, Code = code, ErrorMessage = error
    };
}
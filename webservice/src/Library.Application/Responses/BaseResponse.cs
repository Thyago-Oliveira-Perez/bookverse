namespace Library.Application.Responses;

public abstract record BaseResponse
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
}
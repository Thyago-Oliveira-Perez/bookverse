namespace Library.Common.Results;

public class PaginatedResult<T>
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int Total { get; set; }
    public int TotalPages { get; set; }
    public T? Data { get; set; }
}
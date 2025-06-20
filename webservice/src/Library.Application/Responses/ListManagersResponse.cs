using Library.Domain.Entities;

namespace Library.Application.Responses;

public class ListManagersResponse
{
    public IEnumerable<Manager> Data { get; set; }
}
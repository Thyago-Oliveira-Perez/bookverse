using Library.Application.DTOs;

namespace Library.Application.Responses;

public class ListManagersResponse
{
    public IEnumerable<ManagerDto> Data { get; set; }
}
using Library.Application.DTOs.Manager;

namespace Library.Application.Responses;

public class ListManagersResponse
{
    public IEnumerable<ManagerDto> Data { get; set; }
}
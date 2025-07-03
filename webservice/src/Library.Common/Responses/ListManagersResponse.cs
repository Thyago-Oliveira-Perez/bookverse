using Library.Common.DTOs.Manager;
using Library.Common.Results;

namespace Library.Common.Responses;

public record ListManagersResponse (PaginatedResult<List<ManagerDTO>> Data);
using Library.Common.Results;
using Library.Common.DTOs.Manager;

namespace Library.Application.Services;

public interface IManagerService
{
    Task<ApplicationResult<CreateManagerResponseDTO>> Create(CreateManagerDTO request);
    Task<ApplicationResult<UpdateManagerResponseDTO>> Update(UpdateManagerDTO request);
    Task<ApplicationResult<PaginatedResult<List<ManagerDTO>>>> List(int page, int pageSize);
    Task<ApplicationResult<DeleteManagerResponseDTO>> Delete(int id);
}
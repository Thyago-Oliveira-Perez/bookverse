using Library.Application.Common;
using Library.Application.DTOs.Manager;
using Library.Application.Responses;

namespace Library.Application.Services;

public interface IManagerService
{
    Task<ApplicationResult<CreateManagerResponseDTO>> Create(CreateManagerDTO request);
    Task<ApplicationResult<UpdateManagerResponse>> Update(UpdateManagerDTO request);
    Task<ApplicationResult<ListManagersResponse>> List();
    Task<ApplicationResult<DeleteManagerResponseDTO>> Delete(int id);
}
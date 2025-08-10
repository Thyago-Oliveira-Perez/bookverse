using Library.Common.Requests;
using Library.Common.Results;
using Library.Common.DTOs.Manager;
using Library.Application.Mappings;
using MediatR;

namespace Library.Application.Services;

public class ManagerService(IMediator mediator) : IManagerService
{
    public async Task<ApplicationResult<CreateManagerResponseDTO>> Create(CreateManagerDTO request)
    {
        var result = await mediator.Send(request.ToRequest());

        return ApplicationResult<CreateManagerResponseDTO>.Ok(result.ToDto());
    }

    public async Task<ApplicationResult<UpdateManagerResponseDTO>> Update(UpdateManagerDTO request)
    {
        var result = await mediator.Send(request.ToRequest());

        return ApplicationResult<UpdateManagerResponseDTO>.Ok(result.ToDto());
    }

    public async Task<ApplicationResult<PaginatedResult<List<ManagerDTO>>>> List(int page = 1, int pageSize = 25)
    {
        var response = await mediator.Send(new ListManagersRequest(page, pageSize));
        return ApplicationResult<PaginatedResult<List<ManagerDTO>>>.Ok(response.Data);
    }

    public async Task<ApplicationResult<DeleteManagerResponseDTO>> Delete(int id)
    {
        await mediator.Send(new DeleteManagerRequest(id));
        return ApplicationResult<DeleteManagerResponseDTO>.Ok(new DeleteManagerResponseDTO("Success"));
    }
}
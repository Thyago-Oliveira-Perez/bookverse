using Library.Application.Requests;
using Library.Application.Common;
using Library.Application.DTOs.Manager;
using Library.Application.Exceptions;
using Library.Application.Mappings;
using Library.Application.Responses;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Services;

public class ManagerService(ILogger<ManagerService> log, IMediator mediator, IManagerRepository repository) : IManagerService
{
    public async Task<ApplicationResult<CreateManagerResponseDTO>> Create(CreateManagerDTO request)
    {
        var result = await mediator.Send(request.ToRequest());

        return ApplicationResult<CreateManagerResponseDTO>.Ok(result.ToDto());
    }
    
    public async Task<ApplicationResult<UpdateManagerResponse>> Update(UpdateManagerDTO request)
    {
        var manager = await Exists(nameof(Update), request.Id);
        
        manager.Update(request.Name, request.Email);
        
        var result = await mediator.Send(new UpdateManagerRequest(manager));

        return ApplicationResult<UpdateManagerResponse>.Ok(result);
    }

    public Task<ApplicationResult<ListManagersResponse>> List()
    {
        throw new NotImplementedException();
    }

    public async Task<ApplicationResult<DeleteManagerResponseDTO>> Delete(int id)
    {
        var manager = await Exists(nameof(Update), id);
        
        manager.Delete();
        
        await mediator.Send(new UpdateManagerRequest(manager));

        return ApplicationResult<DeleteManagerResponseDTO>.Ok(new DeleteManagerResponseDTO("Success"));
    }

    private async Task<Manager> Exists(string className, int id)
    {
        var manager = await repository.GetByIdAsync(id);

        if (manager == null)
        {
            var message = $"({className}) Manager {id} not found";
            log.LogError(message);
            throw new NotFoundException(message);
        }
        
        return manager;
    }
}
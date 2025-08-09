using Library.Application.Exceptions;
using Library.Common.Requests;
using Library.Common.Responses;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class UpdateManagerHandler(ILogger<UpdateManagerHandler> log, IManagerRepository repository) : IRequestHandler<UpdateManagerRequest, UpdateManagerResponse>
{
    public async Task<UpdateManagerResponse> Handle(UpdateManagerRequest request, CancellationToken cancellationToken)
    {
        var manager = await repository.GetByIdAsync(request.Id);

        if (manager == null)
        {
            var message = $"Manager {request.Id} not found";
            log.LogError(message);
            throw new NotFoundException(message);
        }
        
        manager.Update(request.Name, request.Email);
        
        await repository.UpdateAsync(manager);

        return new UpdateManagerResponse(manager.Name.Value, manager.Email.Value);
    }
}
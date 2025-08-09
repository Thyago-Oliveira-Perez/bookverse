using Library.Application.Exceptions;
using Library.Common.Requests;
using Library.Common.Responses;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class DeleteManagerHandler(ILogger<DeleteManagerHandler> log, IManagerRepository repository) : IRequestHandler<DeleteManagerRequest, DeleteManagerResponse>
{
    public async Task<DeleteManagerResponse> Handle(DeleteManagerRequest request, CancellationToken cancellationToken)
    {
        var manager = await repository.GetByIdAsync(request.Id);

        if (manager == null)
        {
            var message = $"Manager {request.Id} not found";
            log.LogError(message);
            throw new NotFoundException(message);
        }
        
        manager.Delete();
        
        await repository.UpdateAsync(manager);

        return new DeleteManagerResponse();
    }
}
using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class CreateManagerHandler(IManagerRepository repository) : IRequestHandler<CreateManagerRequest, CreateManagerResponse>
{
    public async Task<CreateManagerResponse> Handle(CreateManagerRequest request, CancellationToken cancellationToken)
    {
        var manager = Manager.Create(request.Name, request.Email);
        await repository.AddAsync(manager);
        
        return new CreateManagerResponse(manager.Name, manager.Email);
    }
}
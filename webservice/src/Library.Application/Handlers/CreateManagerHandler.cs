using Library.Application.Commands;
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class CreateManagerHandler(IManagerRepository repository, ILogger<CreateManagerHandler> logger) : IRequestHandler<CreateManagerCommand, int>
{
    public async Task<int> Handle(CreateManagerCommand request, CancellationToken cancellationToken)
    {
        try
        {
            logger.LogInformation("Creating manager");
            var manager = new Manager();
            manager.Create(request.Name, request.Email);
            logger.LogInformation("Manager created");
            return await repository.AddManagerAsync(manager);
        }
        catch (Exception ex)
        {
            logger.LogError($"Error during manager creation. Ex: {ex.Message}");
            return -1;
        }
    }
}
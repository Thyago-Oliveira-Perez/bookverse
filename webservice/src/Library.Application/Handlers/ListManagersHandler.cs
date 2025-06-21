using Library.Application.DTOs;
using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class ListManagersHandler(IManagerRepository repository, ILogger<CreateManagerHandler> logger) : IRequestHandler<ListManagersRequest, ListManagersResponse>
{
    public async Task<ListManagersResponse> Handle(ListManagersRequest request, CancellationToken cancellationToken)
    {
        try
        {
            logger.LogInformation("Listing managers");
            var managers = await repository.GetManagersAsync();
            
            var result = managers.Select(e => new ManagerDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                CreatedAt = e.CreatedAt,
            });
            
            logger.LogInformation("Manager retrieved");
            return new ListManagersResponse
            {
                Data = result
            };
        }
        catch (Exception ex)
        {
            logger.LogError($"Error during manager list. Ex: {ex.Message}");
            return new ListManagersResponse();
        }
    }
}
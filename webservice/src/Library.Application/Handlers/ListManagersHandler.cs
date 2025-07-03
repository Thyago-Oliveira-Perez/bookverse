using Library.Common.DTOs.Manager;
using Library.Common.Requests;
using Library.Common.Responses;
using Library.Common.Results;
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
            var data = await repository.GetPaginatedAsync(request.Page, request.PageSize);

            logger.LogInformation("Manager retrieved");
            return new ListManagersResponse(data);
        }
        catch (Exception ex)
        {
            logger.LogError($"Error during manager list. Ex: {ex.Message}");
            return new ListManagersResponse(new PaginatedResult<List<ManagerDTO>>()
            {
                Page = request.Page,
                PageSize = request.PageSize,
                TotalPages = 0,
                Total = 0,
                Data = []
            });
        }
    }
}
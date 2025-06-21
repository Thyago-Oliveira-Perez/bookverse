using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class DeleteManagerHandler(IManagerRepository repository, ILogger<DeleteManagerHandler> logger) : IRequestHandler<DeleteManagerRequest, DeleteManagerResponse>
{
    public async Task<DeleteManagerResponse> Handle(DeleteManagerRequest request, CancellationToken cancellationToken)
    {
        try
        {
            logger.LogInformation("Deleting manager");
            var manager = await repository.GetManagerByIdAsync(request.Id);

            if (manager == null)
            {
                logger.LogWarning("Manager not found");
                return new DeleteManagerResponse
                {
                    IsSuccess = false,
                    Message = "Manager not found"
                };
            }

            await repository.DeleteManagerAsync(manager);

            return new DeleteManagerResponse
            {
                IsSuccess = true,
                Message = "Manager deleted"
            };
        }
        catch (Exception ex)
        {
            logger.LogError($"Error during manager delete. Ex: {ex.Message}");
            return new DeleteManagerResponse
            {
                IsSuccess = false,
                Message = ex.Message
            };
        }
    }
}
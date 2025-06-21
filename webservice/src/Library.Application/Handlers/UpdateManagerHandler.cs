using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Library.Application.Handlers;

public class UpdateManagerHandler(IManagerRepository repository, ILogger<UpdateManagerHandler> logger) : IRequestHandler<UpdateManagerRequest, UpdateManagerResponse>
{
    public async Task<UpdateManagerResponse> Handle(UpdateManagerRequest request, CancellationToken cancellationToken)
    {
        try
        {
            logger.LogInformation("Updating manager");
            var manager = await repository.GetManagerByIdAsync(request.Id);

            if (manager == null)
            {
                logger.LogWarning("Manager not found");
                return new UpdateManagerResponse
                {
                    IsSuccess = false,
                    Message = "Manager not found"
                };
            }

            manager.Update(request.Name, request.Email);
            
            await repository.UpdateManagerAsync(manager);

            return new UpdateManagerResponse
            {
                IsSuccess = true,
                Message = "Manager updated"
            };
        }
        catch (Exception ex)
        {
            logger.LogError($"Error during manager update. Ex: {ex.Message}");
            return new UpdateManagerResponse
            {
                IsSuccess = false,
                Message = ex.Message
            };
        }
    }
}
using Library.Application.Requests;
using Library.Application.Responses;
using Library.Domain.Interfaces;
using MediatR;

namespace Library.Application.Handlers;

public class UpdateManagerHandler(IManagerRepository repository) : IRequestHandler<UpdateManagerRequest, UpdateManagerResponse>
{
    public async Task<UpdateManagerResponse> Handle(UpdateManagerRequest request, CancellationToken cancellationToken)
    {
        await repository.UpdateAsync(request.manager);

        return new UpdateManagerResponse(request.manager.Name, request.manager.Email);
    }
}
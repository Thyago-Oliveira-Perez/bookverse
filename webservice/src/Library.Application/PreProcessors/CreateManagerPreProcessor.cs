using Library.Domain.Interfaces;
using Library.Common.Requests;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using ApplicationException = Library.Application.Exceptions.ApplicationException;

namespace Library.Application.PreProcessors;

public class CreateManagerPreProcessor(ILogger<CreateManagerPreProcessor> log, IManagerRepository repository) : IRequestPreProcessor<CreateManagerRequest>
{
    public async Task Process(CreateManagerRequest request, CancellationToken cancellationToken)
    {
        var exist = await repository.ExistsByEmailAsync(request.Email, cancellationToken);

        if (exist)
        {
            var message = $"Email already exists.";
            log.LogWarning(message);
            throw new ApplicationException(message);
        }
    }
}
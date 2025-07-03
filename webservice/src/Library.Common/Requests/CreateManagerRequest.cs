using Library.Common.Responses;
using MediatR;

namespace Library.Common.Requests;

public record CreateManagerRequest(string Name, string Email) : IRequest<CreateManagerResponse>;
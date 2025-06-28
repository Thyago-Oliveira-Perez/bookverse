using Library.Application.Responses;
using MediatR;

namespace Library.Application.Requests;

public record CreateManagerRequest(string Name, string Email) : IRequest<CreateManagerResponse>;
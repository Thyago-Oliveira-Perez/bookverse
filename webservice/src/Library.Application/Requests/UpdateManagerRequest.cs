using Library.Application.Responses;
using MediatR;

namespace Library.Application.Requests;

public record UpdateManagerRequest(int Id, string Name, string Email) : IRequest<UpdateManagerResponse>;

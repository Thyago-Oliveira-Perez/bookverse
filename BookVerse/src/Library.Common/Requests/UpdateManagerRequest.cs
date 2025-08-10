using Library.Common.Responses;
using MediatR;

namespace Library.Common.Requests;

public record UpdateManagerRequest(int Id, string? Name, string? Email) : IRequest<UpdateManagerResponse>;

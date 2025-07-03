using Library.Common.Responses;
using MediatR;

namespace Library.Common.Requests;

public record DeleteManagerRequest(int Id) : IRequest<DeleteManagerResponse> { }
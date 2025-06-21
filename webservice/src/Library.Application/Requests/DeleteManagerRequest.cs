using Library.Application.Responses;
using MediatR;

namespace Library.Application.Requests;

public record DeleteManagerRequest(int Id) : IRequest<DeleteManagerResponse> { }
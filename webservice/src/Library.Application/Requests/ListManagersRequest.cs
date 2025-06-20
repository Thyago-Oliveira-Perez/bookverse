using Library.Application.Responses;
using MediatR;

namespace Library.Application.Requests;

public record ListManagersRequest : IRequest<ListManagersResponse> { }
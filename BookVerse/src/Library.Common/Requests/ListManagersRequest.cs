using Library.Common.Responses;
using MediatR;

namespace Library.Common.Requests;

public record ListManagersRequest(int Page, int PageSize) : IRequest<ListManagersResponse> { }
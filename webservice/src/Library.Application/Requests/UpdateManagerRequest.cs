using Library.Application.Responses;
using Library.Domain.Entities;
using MediatR;

namespace Library.Application.Requests;

public record UpdateManagerRequest(Manager manager) : IRequest<UpdateManagerResponse>;

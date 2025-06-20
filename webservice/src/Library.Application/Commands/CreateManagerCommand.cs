using MediatR;

namespace Library.Application.Commands;

public record CreateManagerCommand(string Name, string Email) : IRequest<int>;
using Core.Application.DTOs;
using Core.Common;
using MediatR;

namespace Core.Application.Commands.CreateBook;

public record CreateBookCommand : IRequest<Result<BookDto>>
{
    public string Title { get; init; }
    public string Author { get; init; }
    public string Isbn { get; init; }
    public int PublicationYear { get; init; }
}
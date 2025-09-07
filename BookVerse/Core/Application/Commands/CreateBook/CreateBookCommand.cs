using Core.Application.DTOs;
using Core.Common;
using MediatR;

namespace Core.Application.Commands.CreateBook;

public record CreateBookCommand : IRequest<Result<BookDto>>
{
    public string Title { get; init; }
    public string Author { get; init; }
    public string Isbn { get; init; }
    public int Category { get; init; }
    public int PublicationYear { get; init; }
    public string Publisher { get; init; }
    public int NumberOfPages { get; init; }
    public string Description { get; init; }
    public int NumberOfExamples { get; init; }
    public string Section { get; init; }
    public string Stand { get; init; }
    public string Shelf { get; init; }
}
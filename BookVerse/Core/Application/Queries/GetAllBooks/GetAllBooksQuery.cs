using Core.Application.DTOs;
using Core.Common;
using MediatR;

namespace Core.Application.Queries.GetAllBooks;

public record GetAllBooksQuery : IRequest<Result<List<BookDto>>> { }
using Core.Application.DTOs;
using Core.Application.Mappings;
using Core.Common;
using Core.Exceptions;
using Core.Ports.Out;
using MediatR;

namespace Core.Application.Queries.GetAllBooks;

public class GetAllBooksQueryHandler(IBookRepository bookRepository)
    : IRequestHandler<GetAllBooksQuery, Result<List<BookDto>>>
{
  public async Task<Result<List<BookDto>>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
  {
    try
    {
      var books = await bookRepository.GetAllAsync();

      var bookDtos = books.Select(book => book.ToDto()).ToList();

      return Result.Success(bookDtos);
    }
    catch (DomainException ex)
    {
      return Result.Failure<List<BookDto?>>([ex.Message]);
    }
    catch (Exception ex)
    {
      return Result.Failure<List<BookDto>>([$"An error occurred while fetching the books. Ex: {ex}"]);
    }
  }
}
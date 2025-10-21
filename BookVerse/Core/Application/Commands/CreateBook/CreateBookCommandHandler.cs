using Core.Application.DTOs;
using Core.Application.Mappings;
using Core.Common;
using Core.Domain;
using Core.Exceptions;
using Core.Ports.Out;
using MediatR;

namespace Core.Application.Commands.CreateBook;

public class CreateBookCommandHandler(IBookRepository bookRepository)
    : IRequestHandler<CreateBookCommand, Result<BookDto>>
{
    public async Task<Result<BookDto>> Handle(CreateBookCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var book = new Book(
                request.Title, request.Author, request.Isbn, request.PublicationYear,
                request.Category, request.Publisher, request.NumberOfPages, request.Section,
                request.Stand, request.Shelf, request.NumberOfExamples, request.Description);

            await bookRepository.AddAsync(book);

            var bookDto = book.ToDto();

            // await notificationService.PublishBookCreatedAsync(bookDto);

            return Result.Success(bookDto);
        }
        catch (DomainException ex)
        {
            return Result.Failure<BookDto?>([ex.Message]);
        }
        catch (Exception ex)
        {
            return Result.Failure<BookDto?>([$"An error occurred while creating the book. Ex: {ex}"]);
        }
    }
}
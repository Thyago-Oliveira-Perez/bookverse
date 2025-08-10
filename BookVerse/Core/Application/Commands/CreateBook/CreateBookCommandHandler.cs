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
                request.Title,
                request.Author,
                request.Isbn,
                request.PublicationYear);

            await bookRepository.AddAsync(book);

            var bookDto = book.ToDto();

            // await notificationService.PublishBookCreatedAsync(bookDto);
            
            return Result<BookDto>.Success(bookDto);
        }
        catch (DomainException ex)
        {
            return Result<BookDto>.Failure<BookDto>([ex.Message]);
        }
        catch (Exception ex)
        {
            return Result<BookDto>.Failure<BookDto>([$"An error occurred while creating the book. Ex: {ex}"]);
        }
    }
}
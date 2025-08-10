using Core.Application.DTOs;
using Core.Domain;

namespace Core.Application.Mappings;

public static class BookMappings
{
    public static BookDto ToDto(this Book book)
    {
        return new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            Isbn = book.Isbn,
            PublicationYear = book.PublicationYear,
            IsAvailable = book.IsAvailable,
            CreatedAt = book.CreatedAt,
        };
    }
}
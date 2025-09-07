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
            Category = book.Category,
            PublicationYear = book.PublicationYear,
            Publisher = book.Publisher,
            NumberOfPages = book.NumberOfPages,
            Description = book.Description,
            NumberOfExamples = book.NumberOfExamples,
            Section = book.Section,
            Stand = book.Stand,
            Shelf = book.Shelf,
            CreatedAt = book.CreatedAt
        };
    }
}
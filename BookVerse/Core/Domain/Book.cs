using System.Security.Cryptography.X509Certificates;
using Core.Domain.Common;
using Core.Exceptions;

namespace Core.Domain;

public class Book : Entity
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
    public bool IsAvailable { get; private set; } = true;
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    protected Book() { }

    public Book(
        string title, string author, string isbn, int publicationYear,
        int category, string publisher, int numberOfPages, string section,
        string stand, string shelf, int numberOfExamples = 0, string description = "")
    {
        Title = title ?? throw new ArgumentNullException(nameof(title));
        Author = author ?? throw new ArgumentNullException(nameof(author));
        Isbn = isbn ?? throw new ArgumentNullException(nameof(isbn));
        PublicationYear = publicationYear;
        Category = category;
        Publisher = publisher ?? throw new ArgumentNullException(nameof(publisher));
        NumberOfPages = numberOfPages <= 0 ? throw new ArgumentOutOfRangeException(nameof(numberOfPages), "Number of pages must be greater than zero") : numberOfPages;
        Description = description ?? throw new ArgumentNullException(nameof(description));
        NumberOfExamples = numberOfExamples;
        Section = section ?? throw new ArgumentNullException(nameof(section));
        Stand = stand ?? throw new ArgumentNullException(nameof(stand));
        Shelf = shelf ?? throw new ArgumentNullException(nameof(shelf));
        IsAvailable = numberOfExamples > 0;
        CreatedAt = DateTime.UtcNow;

        Validate();
    }

    private void Validate()
    {
        if (PublicationYear > DateTime.Now.Year + 1)
            throw new DomainException("Publication year cannot be in the future");

        if (string.IsNullOrWhiteSpace(Isbn) || Isbn.Length < 10)
            throw new DomainException("ISBN must be at least 10 characters");
    }

    public void MarkAsUnavailable() => IsAvailable = false;
    public void MarkAsAvailable() => IsAvailable = true;
}
using Core.Domain.Common;
using Core.Exceptions;

namespace Core.Domain;

public class Book : Entity
{
    public string Title { get; private set; }
    public string Author { get; private set; }
    public string Isbn { get; private set; }
    public int PublicationYear { get; private set; }
    public bool IsAvailable { get; private set; }
    public DateTime CreatedAt { get; private set; }

    protected Book() { }

    public Book(string title, string author, string isbn, int publicationYear)
    {
        Title = title ?? throw new ArgumentNullException(nameof(title));
        Author = author ?? throw new ArgumentNullException(nameof(author));
        Isbn = isbn ?? throw new ArgumentNullException(nameof(isbn));
        PublicationYear = publicationYear;
        IsAvailable = true;
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
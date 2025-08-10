namespace Core.Application.DTOs;

public record BookDto
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Author { get; init; }
    public string Isbn { get; init; }
    public int PublicationYear { get; init; }
    public bool IsAvailable { get; init; }
    public DateTime CreatedAt { get; init; }
}
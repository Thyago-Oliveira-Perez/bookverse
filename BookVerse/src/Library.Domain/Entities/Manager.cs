using Library.Domain.ValueObjects;

namespace Library.Domain.Entities;

public class Manager : BaseEntity
{
    public Name Name { get; private set; } = null!;
    public Email Email { get; private set; } = null!;

    public static Manager Create(string name, string email)
    {
        return new Manager
        {
            Name = new Name(name),
            Email = new Email(email),
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Update(string? newName, string? newEmail)
    {
        Name = newName != null ? new Name(newName) : Name;
        Email = newEmail != null ? new Email(newEmail) : Email;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Delete()
    {
        DeletedAt = DateTime.UtcNow;
    }
}
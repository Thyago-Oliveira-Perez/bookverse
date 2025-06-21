using Library.Domain.ValueObjects;

namespace Library.Domain.Entities;

public class Manager : BaseEntity
{
    public Name Name { get; private set; } = null!;
    public Email Email { get; private set; } = null!;

    public void Create(string name, string email)
    {
        Name = new Name(name);
        Email = new Email(email);
        CreatedAt = DateTime.UtcNow;
    }

    public void Update(string newName, string newEmail)
    {
        Name = new Name(newName);
        Email = new Email(newEmail);
        UpdatedAt = DateTime.UtcNow;
    }

    public void Delete()
    {
        DeletedAt = DateTime.UtcNow;
    }
}
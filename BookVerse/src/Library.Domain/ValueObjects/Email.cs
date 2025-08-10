using System.Text.RegularExpressions;

namespace Library.Domain.ValueObjects;

public class Email
{
    public string Value { get; }

    public Email(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Email cannot be empty");

        if (!Regex.IsMatch(value, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            throw new ArgumentException("Email is invalid");

        Value = value;
    }

    public override string ToString() => Value;

    public override bool Equals(object? obj) => obj is Email email && Value == email.Value;
    public override int GetHashCode() => Value.GetHashCode();

    public static implicit operator string(Email email) => email.Value;
}
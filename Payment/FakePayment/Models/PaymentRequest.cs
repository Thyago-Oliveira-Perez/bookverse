namespace FakePayment.Models;

public record PaymentRequest
{
    public decimal Amount { get; init; }
    public string Currency { get; init; } = "BRL";
    public string CardNumber { get; init; } = null!; // em ambiente fake aceitar qualquer
    public string CardHolder { get; init; } = null!;
    public string ExpMonth { get; init; } = null!;
    public string ExpYear { get; init; } = null!;
    public string Cvv { get; init; } = null!;
    public string? OrderId { get; init; }
}
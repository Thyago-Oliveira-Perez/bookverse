namespace FakePayment.Models;

public record RefundRequest
{
    public decimal Amount { get; init; }
    public string? Reason { get; init; }
}
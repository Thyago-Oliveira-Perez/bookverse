namespace FakePayment.Models.Payment;

public record PaymentRequest
{
    public decimal Amount { get; init; }
    public string Currency { get; init; }
}
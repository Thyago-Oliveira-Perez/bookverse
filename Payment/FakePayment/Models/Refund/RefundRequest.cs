namespace FakePayment.Models.Refund;

public record RefundRequest
{
    public int TransactionId { get; init; }
}
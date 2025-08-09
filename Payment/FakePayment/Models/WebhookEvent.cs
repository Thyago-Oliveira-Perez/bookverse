namespace FakePayment.Models;

public record WebhookEvent
{
    public string EventType { get; init; } = "payment.created"; // payment.created, payment.captured, payment.refunded
    public string PaymentId { get; init; } = string.Empty;
    public object? Data { get; init; }
}
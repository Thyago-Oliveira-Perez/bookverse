namespace FakePayment.Models;

public class PaymentResponse
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Status { get; set; } = "authorized"; // authorized, captured, refunded, failed
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "BRL";
    public string? OrderId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
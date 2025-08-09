namespace FakePayment.Models;

public class RefundResponse
{
    public string RefundId { get; set; } = Guid.NewGuid().ToString();
    public string PaymentId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Status { get; set; } = "succeeded";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
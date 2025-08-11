namespace FakePayment.Models;

public class Transaction
{
  public int Id { get; set; }
  public DateTime TransactionDate { get; set; }
  public TransactionCurrency Currency { get; set; }
  public decimal Amount { get; set; }
  public TransactionStatus Status { get; set; }
  public DateTimeOffset CreatedAt { get; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? UpdatedAt { get; set; }
}

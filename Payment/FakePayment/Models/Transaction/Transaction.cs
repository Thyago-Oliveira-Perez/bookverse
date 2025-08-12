namespace FakePayment.Models.Transaction;

public class Transaction
{
  public int Id { get; init; }
  public TransactionCurrency Currency { get; set; }
  public decimal Amount { get; set; }
  public TransactionStatus Status { get; set; }
  public DateTimeOffset CreatedAt { get; } = DateTimeOffset.UtcNow;
  public DateTimeOffset? UpdatedAt { get; set; }
}

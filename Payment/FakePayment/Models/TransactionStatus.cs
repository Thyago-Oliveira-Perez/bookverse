namespace FakePayment.Models;

public enum TransactionStatus
{
  Pending = 1,
  Completed = 2,
  Declined = 3,
  Refunded = 4,
  Failed = 5
}

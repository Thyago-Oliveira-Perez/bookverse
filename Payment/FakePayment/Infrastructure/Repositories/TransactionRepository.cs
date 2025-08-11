using FakePayment.Models;
using Microsoft.EntityFrameworkCore;

namespace FakePayment.Infrastructure.Repositories;

public class TransactionRepository(PaymentDbContext context) : ITransactionRepository
{

  public async Task<IEnumerable<Transaction?>> GetPendingTransactionsAsync()
  {
    return await context.Transactions
      .Where(t => t.Status.Equals(TransactionStatus.Pending))
      .ToListAsync();
  }

  public async Task AddTransactionAsync(Transaction transaction)
  {
    await context.AddAsync(transaction);
    await context.SaveChangesAsync();
  }

  public async Task UpdateTransactionAsync(Transaction transaction)
  {
    var existingTransaction = await context.Transactions.FindAsync(transaction.Id);
    if (existingTransaction != null)
    {
      existingTransaction.Status = transaction.Status;
      existingTransaction.UpdatedAt = DateTimeOffset.UtcNow;
      await context.SaveChangesAsync();
    }
  }
}

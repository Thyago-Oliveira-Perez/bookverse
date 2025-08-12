using FakePayment.Models.Transaction;
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

  public async Task<Transaction?> GetTransactionByIdAsync(int id)
  {
    return await context.Transactions.FirstOrDefaultAsync(t => t.Id == id);
  }

  public async Task UpdateTransactionAsync(Transaction transaction)
  {
    transaction.Status = transaction.Status;
    transaction.UpdatedAt = DateTimeOffset.UtcNow;
    await context.SaveChangesAsync();
  }
}

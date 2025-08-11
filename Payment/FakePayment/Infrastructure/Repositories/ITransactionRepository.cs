using FakePayment.Models;

namespace FakePayment.Infrastructure.Repositories;

public interface ITransactionRepository
{
  Task<IEnumerable<Transaction?>> GetPendingTransactionsAsync();
  Task AddTransactionAsync(Transaction transaction);
  Task UpdateTransactionAsync(Transaction transaction);
}
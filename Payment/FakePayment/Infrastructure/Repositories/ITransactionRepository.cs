using FakePayment.Models.Transaction;

namespace FakePayment.Infrastructure.Repositories;

public interface ITransactionRepository
{
  Task<IEnumerable<Transaction?>> GetPendingTransactionsAsync();
  Task AddTransactionAsync(Transaction transaction);
  Task<Transaction?> GetTransactionByIdAsync(int id);
  Task UpdateTransactionAsync(Transaction transaction);
}

using FakePayment.Infrastructure.Repositories;
using FakePayment.Models;

namespace FakePayment.Tasks;

public class TransactionProcessorService(ILogger<TransactionProcessorService> logger, ITransactionRepository repository) : BackgroundService
{
  protected override async Task ExecuteAsync(CancellationToken stoppingToken)
  {
    logger.LogInformation($"({nameof(ExecuteAsync)}) Transaction Processor started.");

    while (!stoppingToken.IsCancellationRequested)
    {
      logger.LogInformation($"({nameof(ExecuteAsync)}) Checking for pending transactions...");

      await ProcessTransactionsAsync();

      await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
    }

    logger.LogInformation($"({nameof(ExecuteAsync)}) Transaction Processor stopping.");
  }

  private async Task ProcessTransactionsAsync()
  {
    logger.LogInformation($"({nameof(ProcessTransactionsAsync)}) Processing pending transactions...");

    var pendingTransactions = await repository.GetPendingTransactionsAsync();

    foreach (var transaction in pendingTransactions)
    {
      if (transaction == null) continue; // Skip null transactions

      transaction.TransactionDate = DateTime.UtcNow;
      transaction.CreatedAt = DateTimeOffset.UtcNow;
      transaction.UpdatedAt = null;

      transaction.Status = ApproveOrDecline() ? TransactionStatus.Completed : TransactionStatus.Declined;
      await repository.AddTransactionAsync(transaction);
    }

    logger.LogInformation($"({nameof(ProcessTransactionsAsync)}) Processed {pendingTransactions.Count()} transactions.");
  }

  private static bool ApproveOrDecline()
  {
    // rule: randomly approve or decline
    return new Random().Next(0, 2) == 1; // 50% chance of approval
  }
}

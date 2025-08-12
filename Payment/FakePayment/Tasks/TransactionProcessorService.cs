using FakePayment.Infrastructure.Repositories;
using FakePayment.Models.Transaction;

namespace FakePayment.Tasks;

public class TransactionProcessorService(ILogger<TransactionProcessorService> logger,IServiceScopeFactory scopeFactory)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation($"({nameof(ExecuteAsync)}) Transaction Processor started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation($"({nameof(ExecuteAsync)}) Checking for pending transactions...");

            await ProcessTransactionsAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }

        logger.LogInformation($"({nameof(ExecuteAsync)}) Transaction Processor stopping.");
    }

    private async Task ProcessTransactionsAsync(CancellationToken cancellationToken)
    {
        using var scope = scopeFactory.CreateScope();
        var repository = scope.ServiceProvider.GetRequiredService<ITransactionRepository>();
        
        logger.LogInformation($"({nameof(ProcessTransactionsAsync)}) Processing pending transactions...");

        try
        {
            var pendingTransactions = await repository.GetPendingTransactionsAsync();

            foreach (var transaction in pendingTransactions)
            {
                if (transaction == null) continue;

                // Check for cancellation between transactions
                cancellationToken.ThrowIfCancellationRequested();

                transaction.UpdatedAt = DateTimeOffset.Now;
                transaction.Status = ApproveOrDecline() 
                    ? TransactionStatus.Completed 
                    : TransactionStatus.Declined;

                await repository.UpdateTransactionAsync(transaction);
            }

            logger.LogInformation($"({nameof(ProcessTransactionsAsync)}) Processed {pendingTransactions.Count()} transactions.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Error processing transactions");
        }
    }

    // rule: randomly approve or decline - 50% chance of approval
    private static bool ApproveOrDecline() => new Random().Next(0, 2) == 1;
}
using FakePayment.Infrastructure.Repositories;
using FakePayment.Models.Payment;
using FakePayment.Models.Refund;
using FakePayment.Models.Transaction;

namespace FakePayment.Services;

public class PaymentService(ITransactionRepository transactionRepository) : IPaymentService
{
    public async Task<PaymentResponse> CreatePayment(PaymentRequest req)
    {
        try
        {
            var currency = GetCurrency(req.Currency);

            if (currency.Equals(TransactionCurrency.Unknown))
            {
                throw new ArgumentException($"Unknown currency: {req.Currency}");
            }

            var transaction = new Transaction
            {
                Currency = currency,
                Amount = req.Amount,
                Status = TransactionStatus.Pending
            };

            await transactionRepository.AddTransactionAsync(transaction);

            return new PaymentResponse
            {
                Id = transaction.Id,
                Status = transaction.Status.ToString(),
                Amount = transaction.Amount,
                Currency = transaction.Currency.ToString(),
                CreatedAt = transaction.CreatedAt
            };
        }
        catch (ArgumentException)
        {
            throw;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error to create transaction. Error: {ex}");
            throw;
        }
    }

    public async Task<RefundResponse> Refund(RefundRequest r)
    {
        var transaction = await transactionRepository.GetTransactionByIdAsync(r.TransactionId);

        if (transaction == null)
        {
            throw new ArgumentException($"Transaction with id: {r.TransactionId} does not exist");
        }
        
        transaction.Status = TransactionStatus.Refunded;
        await transactionRepository.UpdateTransactionAsync(transaction);
        return new RefundResponse
        {
            Status = transaction.Status.ToString()
        };
    }

    private static TransactionCurrency GetCurrency(string currency)
    {
        return currency switch
        {
            "USD" => TransactionCurrency.Usd,
            "EUR" => TransactionCurrency.Eur,
            _ => TransactionCurrency.Unknown
        };
    }
}
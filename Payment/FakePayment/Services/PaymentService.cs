using FakePayment.Models;

namespace FakePayment.Services;

public class PaymentService
{
    private readonly Dictionary<string, PaymentResponse> _store = new();

    public PaymentResponse CreatePayment(PaymentRequest req)
    {
        var p = new PaymentResponse
        {
            Id = Guid.NewGuid().ToString(),
            Amount = req.Amount,
            Currency = req.Currency,
            OrderId = req.OrderId,
            CreatedAt = DateTime.UtcNow,
            Status = ApproveOrDecline(req) ? "authorized" : "failed"
        };
        _store[p.Id] = p;
        return p;
    }

    public PaymentResponse? GetPayment(string id)
    {
        _store.TryGetValue(id, out var p);
        return p;
    }

    public PaymentResponse? Capture(string id)
    {
        if (!_store.TryGetValue(id, out var p)) return null;
        if (p.Status != "authorized") return p;
        p.Status = "captured";
        return p;
    }

    public RefundResponse? Refund(string id, RefundRequest r)
    {
        if (!_store.TryGetValue(id, out var p)) return null;
        var amount = Math.Min(r.Amount, p.Amount);
        p.Status = "refunded";
        var rf = new RefundResponse
        {
            PaymentId = id,
            Amount = amount,
            CreatedAt = DateTime.UtcNow,
            Status = "succeeded"
        };
        return rf;
    }

    private static bool ApproveOrDecline(PaymentRequest req)
    {
        /*
         * rule: if it ends with 0 it should decline, if no it should automatically capture
         */
        if (string.IsNullOrWhiteSpace(req.CardNumber)) return false;
        var last = req.CardNumber.Trim().Last();
        return last != '0';
    }
}
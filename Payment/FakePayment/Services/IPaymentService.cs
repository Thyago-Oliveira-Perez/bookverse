using FakePayment.Models.Payment;
using FakePayment.Models.Refund;

namespace FakePayment.Services;

public interface IPaymentService
{
    Task<PaymentResponse> CreatePayment(PaymentRequest req);
    Task<RefundResponse> Refund(RefundRequest r);
}
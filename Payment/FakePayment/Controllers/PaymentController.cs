using Microsoft.AspNetCore.Mvc;
using FakePayment.Models.Payment;
using FakePayment.Models.Refund;
using FakePayment.Services;

namespace FakePayment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController(IPaymentService service) : ControllerBase
{
    [HttpPost("create")]
    public async Task<ActionResult<PaymentResponse>> CreatePayment([FromBody] PaymentRequest req)
    {
        var resp = await service.CreatePayment(req);
        return CreatedAtAction(nameof(CreatePayment), new { id = resp.Id }, resp);
    }

    [HttpPost("refund")]
    public async Task<ActionResult<RefundResponse>> Refund([FromBody] RefundRequest r)
    {
        var resp = await service.Refund(r);
        if (resp == null) return NotFound();
        return Ok(resp);
    }
}
using Microsoft.AspNetCore.Mvc;
using FakePayment.Models;
using FakePayment.Services;

namespace FakePayment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController(PaymentService service) : ControllerBase
{
    [HttpPost("create")]
    public ActionResult<PaymentResponse> CreatePayment([FromBody] PaymentRequest req)
    {
        var resp = service.CreatePayment(req);
        return CreatedAtAction(nameof(GetPayment), new { id = resp.Id }, resp);
    }

    [HttpGet("{id}")]
    public ActionResult<PaymentResponse> GetPayment(string id)
    {
        var p = service.GetPayment(id);
        if (p == null) return NotFound();
        return Ok(p);
    }

    [HttpPost("{id}/capture")]
    public ActionResult<PaymentResponse> Capture(string id)
    {
        var p = service.Capture(id);
        if (p == null) return NotFound();
        return Ok(p);
    }

    [HttpPost("{id}/refund")]
    public ActionResult<RefundResponse> Refund(string id, [FromBody] RefundRequest r)
    {
        var resp = service.Refund(id, r);
        if (resp == null) return NotFound();
        return Ok(resp);
    }
}
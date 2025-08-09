using Microsoft.AspNetCore.Mvc;
using FakePayment.Models;

namespace FakePayment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebhookController(ILogger<WebhookController> logger) : ControllerBase
{
    [HttpPost]
    public IActionResult Receive([FromBody] WebhookEvent ev)
    {
        logger.LogInformation("Webhook received: {eventType} id={id}", ev.EventType, ev.PaymentId);
        return Ok(new { received = true });
    }
}
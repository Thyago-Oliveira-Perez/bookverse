using Library.Application.Commands;
using Library.Application.Requests;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Library.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ManagerController(IMediator mediator) : ControllerBase
{
    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Create([FromBody] CreateManagerCommand createManagerCommand)
    {
        await mediator.Send(createManagerCommand);
        return Ok();
    }
    
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> List()
    {
        var manager = await mediator.Send(new ListManagersRequest());
        return Ok(manager);
    }
}
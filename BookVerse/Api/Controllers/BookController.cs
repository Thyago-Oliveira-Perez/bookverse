using Core.Application.Commands.CreateBook;
using Core.Application.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(IMediator mediator, ILogger<BooksController> logger) : ControllerBase
{
    [HttpPost("Create")]
    [ProducesResponseType(typeof(BookDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateBook([FromBody] CreateBookCommand command)
    {
        logger.LogInformation("Creating new book with ISBN: {Isbn}", command.Isbn);

        var result = await mediator.Send(command);

        if (!result.IsSuccess)
        {
            logger.LogWarning("Failed to create book: {Errors}", result.Errors);
            return BadRequest(result.Errors);
        }

        logger.LogInformation("Book created with ID: {BookId}", result.Value.Id);
        return CreatedAtAction(nameof(CreateBook), new { id = result.Value.Id }, result.Value);
    }
}
using Core.Application.Commands.CreateBook;
using Core.Application.DTOs;
using Core.Application.Queries.GetAllBooks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController(IMediator mediator, ILogger<BooksController> logger) : ControllerBase
{
    [Authorize]
    [HttpPost("Create")]
    [ProducesResponseType(typeof(BookDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateBookCommand command)
    {
        logger.LogInformation("Creating new book with ISBN: {Isbn}", command.Isbn);

        var result = await mediator.Send(command);

        if (!result.IsSuccess)
        {
            logger.LogWarning("Failed to create book: {Errors}", result.Errors);
            return BadRequest(result.Errors);
        }

        logger.LogInformation("Book created with ID: {BookId}", result.Value.Id);
        return CreatedAtAction(nameof(Create), new { id = result.Value.Id }, result.Value);
    }

    [HttpGet()]
    [ProducesResponseType(typeof(BookDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAll()
    {
        logger.LogInformation("Fetching all books");

        var result = await mediator.Send(new GetAllBooksQuery());

        if (!result.IsSuccess)
        {
            logger.LogWarning("Failed to fetch books: {Errors}", result.Errors);
            return BadRequest(result.Errors);
        }

        logger.LogInformation("Fetched {BookCount} books", result.Value.Count);
        return Ok(result.Value);
    }
}
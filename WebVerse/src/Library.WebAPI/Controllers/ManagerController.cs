using Library.Common.Results;
using Library.Common.DTOs.Manager;
using Library.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Library.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
[ProducesResponseType(StatusCodes.Status500InternalServerError)]
public class ManagerController(IMediator mediator, IManagerService service) : ControllerBase
{
    [HttpPost("create")]
    [ProducesResponseType(typeof(ApplicationResult<CreateManagerResponseDTO>), StatusCodes.Status201Created)]
    public async Task<ActionResult<ApplicationResult<CreateManagerResponseDTO>>> Create([FromBody] CreateManagerDTO request)
    {
        return await service.Create(request);
    }

    [HttpPatch("update")]
    [ProducesResponseType(typeof(ApplicationResult<UpdateManagerResponseDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApplicationResult<UpdateManagerResponseDTO>>> Update([FromBody] UpdateManagerDTO request)
    {
        return await service.Update(request);
    }

    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ApplicationResult<PaginatedResult<List<ManagerDTO>>>>> List(int page = 1, int pageSize = 25)
    {
        return await service.List(page, pageSize);
    }

    [HttpDelete("delete")]
    [ProducesResponseType(typeof(ApplicationResult<DeleteManagerResponseDTO>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ApplicationResult<DeleteManagerResponseDTO>>> Delete([FromQuery] int id)
    {
        return await service.Delete(id);
    }
}
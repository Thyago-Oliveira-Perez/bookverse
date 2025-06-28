using Library.Application.DTOs.Manager;
using Library.Application.Requests;
using Library.Application.Responses;

namespace Library.Application.Mappings;

public static class CreateManagerMappings
{
    public static CreateManagerRequest ToRequest(this CreateManagerDTO request)
    {
        return new CreateManagerRequest(request.Name, request.Email);
    }

    public static CreateManagerResponseDTO ToDto(this CreateManagerResponse response)
    {
        return new CreateManagerResponseDTO(response.Name, response.Email);
    }
}
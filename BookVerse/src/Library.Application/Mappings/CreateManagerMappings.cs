using Library.Common.DTOs.Manager;
using Library.Common.Requests;
using Library.Common.Responses;

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
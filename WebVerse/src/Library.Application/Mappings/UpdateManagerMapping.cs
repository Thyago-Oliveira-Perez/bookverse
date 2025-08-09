using Library.Common.DTOs.Manager;
using Library.Common.Requests;
using Library.Common.Responses;

namespace Library.Application.Mappings;

public static class UpdateManagerMapping
{
    public static UpdateManagerRequest ToRequest(this UpdateManagerDTO request)
    {
        return new UpdateManagerRequest(request.Id, request.Name, request.Email);
    }
    public static UpdateManagerResponseDTO ToDto(this UpdateManagerResponse response)
    {
        return new UpdateManagerResponseDTO(response.Name, response.Email);
    }
}
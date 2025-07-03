using Library.Common.DTOs.Manager;
using Library.Domain.Entities;

namespace Library.Application.Mappings;

public static class ManagerMapping
{
    public static ManagerDTO ToDto(this Manager manager)
    {
        return new ManagerDTO(manager.Id, manager.Name.Value, manager.Email.Value, manager.CreatedAt);
    }
}
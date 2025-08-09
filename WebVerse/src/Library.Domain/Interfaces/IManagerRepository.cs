using Library.Domain.Entities;
using Library.Common.DTOs.Manager;
using Library.Common.Results;

namespace Library.Domain.Interfaces;

public interface IManagerRepository
{
    Task<int> AddAsync(Manager manager);
    Task<PaginatedResult<List<ManagerDTO>>> GetPaginatedAsync(int page, int pageSize, bool includeDeleted = false);
    Task<Manager?> GetByIdAsync(int id);
    Task UpdateAsync(Manager manager);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
}
using Library.Domain.Entities;

namespace Library.Domain.Interfaces;

public interface IManagerRepository
{
    Task<int> AddAsync(Manager manager);
    Task<IEnumerable<Manager>> ListAsync(bool includeDeleted = false);
    Task<Manager?> GetByIdAsync(int id);
    Task UpdateAsync(Manager manager);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken);
}
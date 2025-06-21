using Library.Domain.Entities;

namespace Library.Domain.Interfaces;

public interface IManagerRepository
{
    Task<int> AddManagerAsync(Manager manager);
    Task<IEnumerable<Manager>> GetManagersAsync(bool includeDeleted = false);
    Task<Manager?> GetManagerByIdAsync(int id);
    Task UpdateManagerAsync(Manager manager);
    Task DeleteManagerAsync(Manager manager);
}
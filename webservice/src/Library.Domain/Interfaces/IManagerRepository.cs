using Library.Domain.Entities;

namespace Library.Domain.Interfaces;

public interface IManagerRepository
{
    Task<int> AddManager(Manager manager);
    Task<IEnumerable<Manager>> GetManagers();
}
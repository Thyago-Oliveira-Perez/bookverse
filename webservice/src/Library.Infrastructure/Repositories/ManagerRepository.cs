using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Library.Infrastructure.Repositories;

public class ManagerRepository(LibraryDbContext context) : IManagerRepository
{
    public async Task<int> AddManager(Manager manager)
    {
        await context.Managers.AddAsync(manager);
        await context.SaveChangesAsync();
        return manager.Id;
    }

    public async Task<IEnumerable<Manager>> GetManagers()
    {
        return await context.Managers.ToListAsync();
    }
}
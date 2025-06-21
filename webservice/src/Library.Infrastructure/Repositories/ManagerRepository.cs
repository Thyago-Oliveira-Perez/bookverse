using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Library.Infrastructure.Repositories;

public class ManagerRepository(LibraryDbContext context) : IManagerRepository
{
    public async Task<int> AddManagerAsync(Manager manager)
    {
        await context.Managers.AddAsync(manager);
        await context.SaveChangesAsync();
        return manager.Id;
    }

    public async Task<IEnumerable<Manager>> GetManagersAsync(bool includeDeleted = false)
    {
        return (await context
            .Managers
            .AsNoTracking()
            .ToListAsync())
            .Where(e => includeDeleted ? e.DeletedAt != null : e.DeletedAt == null);
    }

    public async Task<Manager?> GetManagerByIdAsync(int id)
    {
        return await context.Managers.FindAsync(id);
    }

    public async Task UpdateManagerAsync(Manager manager)
    {
        context.Managers.Update(manager);
        await context.SaveChangesAsync();
    }

    public async Task DeleteManagerAsync(Manager manager)
    {
        manager.Delete();
        await UpdateManagerAsync(manager);
    }
}
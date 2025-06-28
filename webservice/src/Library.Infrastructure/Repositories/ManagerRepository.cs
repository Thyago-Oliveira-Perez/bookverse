using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using Library.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Library.Infrastructure.Repositories;

public class ManagerRepository(LibraryDbContext context) : IManagerRepository
{
    public async Task<int> AddAsync(Manager manager)
    {
        try
        {
            await context.Managers.AddAsync(manager);
            await context.SaveChangesAsync();
            return manager.Id;
        }
        catch (Exception ex)
        {
            throw new DatabaseException("Failed to save changes to database", ex);
        }
    }

    public async Task<IEnumerable<Manager>> ListAsync(bool includeDeleted = false)
    {
        return (await context
            .Managers
            .AsNoTracking()
            .ToListAsync())
            .Where(e => includeDeleted ? e.DeletedAt != null : e.DeletedAt == null);
    }

    public async Task<Manager?> GetByIdAsync(int id)
    {
        return await context.Managers.FindAsync(id);
    }

    public async Task UpdateAsync(Manager manager)
    {
        context.Managers.Update(manager);
        await context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken cancellationToken)
    {
        return await context.Managers.AnyAsync(e => e.Email.Value == email, cancellationToken);
    }
}
using Library.Domain.Entities;
using Library.Domain.Interfaces;
using Library.Infrastructure.Data;
using Library.Infrastructure.Exceptions;
using Library.Common.DTOs.Manager;
using Library.Common.Results;
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

    public async Task<PaginatedResult<List<ManagerDTO>>> GetPaginatedAsync(int page, int pageSize, bool includeDeleted = false)
    {
        var totalCount = context.Managers.Count();
        var result = await context.Managers
            .AsNoTracking()
            .Where(e => includeDeleted || e.DeletedAt == null)
            .OrderByDescending(e => e.Id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new ManagerDTO(m.Id, m.Name.Value, m.Email.Value, m.CreatedAt))
            .ToListAsync();

        return new PaginatedResult<List<ManagerDTO>>()
        {
            Page = page,
            PageSize = pageSize,
            Total = totalCount,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize),
            Data = result
        };
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
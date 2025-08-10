using Core.Domain;
using Core.Ports.Out;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class BookRepository(BookVerseDbContext context) : IBookRepository
{
    public async Task AddAsync(Book? book)
    {
        await context.Books.AddAsync(book);
        await context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByIsbnAsync(string isbn)
    {
        return await context.Books
            .AnyAsync(b => b.Isbn == isbn);
    }

    public async Task<Book?> GetByIdAsync(Guid id)
    {
        return await context.Books
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<IEnumerable<Book?>> SearchAsync(string searchTerm)
    {
        return await context.Books
            .Where(b => b.Title.Contains(searchTerm) || 
                        b.Author.Contains(searchTerm) ||
                        b.Isbn.Contains(searchTerm))
            .ToListAsync();
    }

    public async Task UpdateAsync(Book? book)
    {
        context.Books.Update(book);
        await context.SaveChangesAsync();
    }
}
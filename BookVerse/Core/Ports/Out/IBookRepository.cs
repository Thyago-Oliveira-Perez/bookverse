using Core.Domain;

namespace Core.Ports.Out;

public interface IBookRepository
{
    Task<Book?> GetByIdAsync(int id);
    Task<IEnumerable<Book?>> SearchAsync(string searchTerm);
    Task AddAsync(Book? book);
    Task UpdateAsync(Book? book);
    Task<bool> ExistsByIsbnAsync(string isbn);
}
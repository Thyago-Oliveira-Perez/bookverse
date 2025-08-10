using Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class BookVerseDbContext(DbContextOptions<BookVerseDbContext> options) : DbContext(options)
{
    public DbSet<Book?> Books { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.Property(b => b.Title).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Author).IsRequired().HasMaxLength(200);
            entity.Property(b => b.Isbn).IsRequired().HasMaxLength(20);
            entity.HasIndex(b => b.Isbn).IsUnique();
        });
    }
}
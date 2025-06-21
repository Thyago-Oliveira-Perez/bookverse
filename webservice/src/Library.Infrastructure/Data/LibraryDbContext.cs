using Library.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Library.Infrastructure.Data;

public class LibraryDbContext(DbContextOptions<LibraryDbContext> options) : DbContext(options)
{
    public DbSet<Manager> Managers => Set<Manager>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Manager>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.OwnsOne(e => e.Name, name =>
            {
                name.Property(e => e.Value).HasColumnName("Name").IsRequired();
            });
            entity.OwnsOne(e => e.Email, owned =>
            {
                owned.Property(e => e.Value)
                    .HasColumnName("Email")
                    .IsRequired();
                owned.WithOwner();
                owned.HasIndex(e => e.Value).IsUnique();
            });
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt);
            entity.Property(e => e.DeletedAt);
        });
    }
}
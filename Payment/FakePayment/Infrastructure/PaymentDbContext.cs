using FakePayment.Models;
using Microsoft.EntityFrameworkCore;

namespace FakePayment.Infrastructure;

public class PaymentDbContext(DbContextOptions<PaymentDbContext> options) : DbContext(options)
{
    public DbSet<Transaction?> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.Property(b => b.TransactionDate).IsRequired();
            entity.Property(b => b.Amount).IsRequired().HasColumnType("decimal(18,2)");
            entity.Property(b => b.Status).IsRequired();
        });
    }
}
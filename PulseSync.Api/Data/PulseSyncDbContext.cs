using Microsoft.EntityFrameworkCore;
using PulseSync.Api.Models;

namespace PulseSync.Api.Data
{
    public class PulseSyncDbContext : DbContext
    {
        public PulseSyncDbContext(DbContextOptions<PulseSyncDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            });
        }
    }
}

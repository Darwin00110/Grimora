using Grimora.Domain;
using Microsoft.EntityFrameworkCore;

namespace Grimora.Infrastructure;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
    public DbSet<Player> Players {get; set;}
    public DbSet<NPCEntity> NPC {get; set;}
    public DbSet<SpellsEntity> Spells {get; set;}
    public DbSet<WorldEntity> Worlds {get; set;}
}

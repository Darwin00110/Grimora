using Grimora.Application;
using Grimora.Domain;
using Microsoft.EntityFrameworkCore;

namespace Grimora.Infrastructure;

public class PlayerRepository : IPlayerRepository
{
    private readonly AppDbContext _context;
    public PlayerRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<bool> PlayerExists(Guid id)
    {
        try
        {
            var query = (await _context.Players.FindAsync(id) != null) ? true : false;
            return query;
        } catch(Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }
    public async Task<bool> VerifyUserExists_WithEmail(string email)
    {
        try
        {
            var query = (await _context.Players.Where(x => x.Email == email).FirstOrDefaultAsync() != null) ? true : false;
            return query;
        } catch(Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }
    
    public async Task Create(Player data)
    {
        try
        {
            var query = await _context.Players.AddAsync(data);
            await _context.SaveChangesAsync();
        } catch(Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }
    public async Task<Player> GetDataPlayer(Guid id)
    {
        try
        {
            var query = await _context.Players.FindAsync(id);
            if(query == null)
            {
                throw new InfrastructureException("O usuario não existe");
            }
            return query;
        } catch(Exception e)
        {
            throw new InfrastructureException(e.Message);
        }
    }   
}

namespace Grimora.Domain;

public interface IPlayerRepository
{
    public Task<bool> PlayerExists(Guid id);
    public Task<bool> VerifyUserExists_WithEmail(string email);
    public Task<Player> GetDataPlayer(Guid id);
}

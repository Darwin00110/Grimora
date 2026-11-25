using Grimora.Domain;

namespace Grimora.Application;

public class PlayerUseCases : IPlayerUsecase
{
    private readonly IPlayerRepository _repo;
    private readonly IHashService _hash;
    public PlayerUseCases(IPlayerRepository repo, IHashService hash)
    {
        _repo = repo;
        _hash = hash;
    }
    public async Task Create(CreatePlayerRequest request)
    {
        var verifyUser = await _repo.VerifyUserExists_WithEmail(request.Email);
        if(verifyUser == true)
        {
            throw new ApplicationException("Usuario ja existente com esse email.");
        }
        var hash = await _hash.HashPassword(request.Password);
        var DataUser = new Player
        {
            Email = request.Email,
            Name = request.Name,
            Password = hash,
            Sendmessages_forStudy = false,
            Telephone = request.Telefone,
            unlockedSpellIds = [],
            stats = new PlayerStats
            {
                Level = 1,
                experience = 0,
                experienceToNextLevel = 100,
                magicPoints = 0,
                MaxmagicPoints = 
            }
        };
    }
}

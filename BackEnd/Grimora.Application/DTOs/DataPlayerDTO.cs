using Grimora.Domain;

namespace Grimora.Application;

public class DataPlayerDTO
{
    public required Guid ID {get; set;}
    public required string Name { get; set; }
    public PlayerStateEnum state { get; set; }
    public required PlayerStats stats {get; set;}
    public required string[] unlockedSpellIds {get; set;}
    public string[]? completedChallengeIds {get; set;}
    public string? currentWorldId {get; set;}
}

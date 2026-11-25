namespace Grimora.Domain;

public class PlayerStats
{
    public required double Level {get; set;}
    public required double experience {get; set;}
    public required double experienceToNextLevel {get; set;}
    public required double magicPoints {get; set;}
    public required double MaxmagicPoints {get; set;} 
}
public class Player
{
    public Guid ID { get; set; }
    public required string Email {get; set;}
    public string? Telephone {get; set;}
    public required bool Sendmessages_forStudy {get; set;}
    public required string Name { get; set; }
    public required string Password {get; set;}
    public PlayerStateEnum state { get; set; }
    public required PlayerStats stats {get; set;}
    public required string[] unlockedSpellIds {get; set;}
    public string[]? completedChallengeIds {get; set;}
    public string? currentWorldId {get; set;}
}

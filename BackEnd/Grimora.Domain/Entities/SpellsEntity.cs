namespace Grimora.Domain;

public class SpellsEntity
{
    public required string ID {get; set;}
    public required string Name {get; set;}
    public required string description {get; set;}
    public required string mathConcept {get; set;}
    public required string formula {get; set;}
    public required string category {get; set;}
    public required string iconEmoji {get; set;}
    public required string missionId {get; set;}
    public required bool unlocked {get; set;}
    public required string rarity {get; set;}
}

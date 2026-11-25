namespace Grimora.Domain;

public class Position
{
    public required double x {get; set;}
    public required double y {get; set;}
}
public class Steps
{
    public required string ID {get; set;}
    public required string Title {get; set;}
    public required string challengeID {get; set;}
    public required string status {get; set;}
    public required string position {get; set;}
}
public class Stages
{
    public required string ID {get; set;}
    public required string title {get; set;}
    public required string world_ID {get; set;}
    public required string Status {get; set;}
    public required Position position {get; set;}
    public required List<Steps> steps {get; set;}
}
public class WorldEntity
{
    public required string ID {get; set;}
    public required string Title {get; set;}
    public required string subtitle {get; set;}
    public required string themeColor {get; set;}
    public required string accentColor {get; set;}
    public required string backgroundGradient {get; set;}
    public required char iconEmoji {get; set;}
    public required string status {get; set;}
    public required List<Stages> stages {get; set;}   
}

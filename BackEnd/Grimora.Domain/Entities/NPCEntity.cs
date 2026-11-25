namespace Grimora.Domain;

public class Dialogues
{
    public required string id { get; set; }
    public required string Text { get; set; }
    public required string Expression { get; set; }
}
public class NPCEntity
{
    public required string ID { get; set; }
    public required string Name { get; set; }
    public required string Title { get; set; }
    public required string spriteColor { get; set; }
    public required string accentColor { get; set; }
    public required List<Dialogues> IntroDialogues { get; set; }
    public required List<Dialogues> sucessDialogues { get; set; }
    public required List<Dialogues> failDialogues { get; set; }
}

using System.ComponentModel.DataAnnotations;

namespace Grimora.Application;

public class CreatePlayerRequest
{
    [Required(ErrorMessage = "Nome não informado.")]
    public required string Name { get; set; }
    [Required(ErrorMessage = "Email não informado.")]
    [EmailAddress(ErrorMessage = "Formato de email invalido, ex: (exemplo@gmail.com)")]
    public required string Email { get; set; }
    [Required(ErrorMessage = "Senha não informada.")]
    public required string Password { get; set; }
    public string Telefone { get; set; } = string.Empty;
}

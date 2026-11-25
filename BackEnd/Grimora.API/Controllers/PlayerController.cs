using Grimora.Application;
using Microsoft.AspNetCore.Mvc;

namespace Grimora.API;

[Route("users")]
public class PlayerController : ControllerBase
{
    private readonly IPlayerUsecase _playerUsecase;
    public PlayerController(IPlayerUsecase playerUsecase)
    {
        _playerUsecase = playerUsecase;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreatePlayer()
    {
        try
        {
            var query = await _playerUsecase.Create();
            return Ok();
        }
        catch (Exception e)
        {
            BadRequest($"Error: {e.Message}");
        }
    }
    [HttpGet]
    [Route(":{id}")]
    public async Task<IActionResult> ReadPlayer(Guid id)
    {
        try
        {
            var query = await _playerUsecase.GetPlayerData();
            return Ok();
        }
        catch (Exception e)
        {
            BadRequest($"Error: {e.Message}");
        }
    }
    [HttpPut]
    [Route(":{id}")]
    public async Task<IActionResult> UpdatePlayer(Guid id)
    {
        try
        {
            var query = await _playerUsecase.UpdateData();
            return Ok();
        }
        catch (Exception e)
        {
            BadRequest($"Error: {e.Message}");
        }
    }
    [HttpDelete]
    [Route(":{id}")]
    public async Task<IActionResult> RemovePlayer(Guid id)
    {
        try
        {
            var query = await _playerUsecase.Remove();
            return Ok();
        }
        catch (Exception e)
        {
            BadRequest($"Error: {e.Message}");
        }
    }
}

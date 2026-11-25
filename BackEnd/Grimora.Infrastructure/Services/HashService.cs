using Grimora.Application;

namespace Grimora.Infrastructure;

public class HashService : IHashService 
{
    public async Task<string> HashPassword(string password)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        return hash;
    }
    public async Task<bool> VerifyPassword(string password, string hash)
    {
        var compare = BCrypt.Net.BCrypt.Verify(password, hash);
        return compare;
    }
}

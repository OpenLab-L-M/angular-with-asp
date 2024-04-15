using Microsoft.AspNetCore.Identity;

namespace AspNetCoreAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? PictureURL { get; set; }
    }
}

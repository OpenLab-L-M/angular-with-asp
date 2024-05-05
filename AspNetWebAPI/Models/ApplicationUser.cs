using Microsoft.AspNetCore.Identity;

namespace AspNetCoreAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public byte[]? PictureURL { get; set; }

    
    }
}

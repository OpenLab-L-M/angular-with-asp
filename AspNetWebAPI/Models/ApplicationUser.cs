using Microsoft.AspNetCore.Identity;

namespace AspNetCoreAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? PictureURL { get; set; }

        public virtual ICollection<Recipe>? Favourites { get; } = new List<Recipe>();
    }
}

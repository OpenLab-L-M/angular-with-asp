using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    
    public class ApplicationUserRecipe
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int RecipeId { get; set;}

        public ApplicationUser user { get; set; } = default!;
        public Recipe recept { get; set; } = default!;
    }
}

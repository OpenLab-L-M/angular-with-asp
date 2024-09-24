using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class Recensions
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int RecipeId { get; set; }
        public string? Content { get; set; }
        public string? UserName { get; set; }
        public int? AmountOfLikes { get; set; } = 0;



        public ApplicationUser user { get; set; } = default!;
        public Recipe recept { get; set; } = default!;
    }
}

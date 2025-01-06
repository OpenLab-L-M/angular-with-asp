using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class Postupy
    {
        [Key] public int Id { get; set; }

        public string? postupy {  get; set; } 
        public int? RecipesId {  get; set; }
    }
}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspNetCoreAPI.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageURL { get; set; }
        public string? Difficulty { get; set; }
        public string? CheckID { get; set; }
        public string? Ingrediencie {  get; set; }
        public int? Cas {  get; set; }
        
        public ICollection<Postupy>? Postupies { get; set; }
        public bool? Veganske { get; set; }
        public bool? Vegetarianske { get; set; }
        public bool? NizkoKaloricke { get; set; }
        public string? userID { get; set; }

        public int? ImageId { get; set; }

        [ForeignKey("ImageId")]
        public Images Images { get; set; }

    }
}

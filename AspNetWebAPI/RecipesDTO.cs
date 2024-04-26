using System.Security.Cryptography.X509Certificates;

namespace AspNetCoreAPI
{
    public class RecipesDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Difficulty { get; set; }
        public string? ImageURL { get; set; }
        public string? CheckID { get; set; }
        public string? userID { get; set; }
        public bool? Favourite { get; set; }
        
    }
}

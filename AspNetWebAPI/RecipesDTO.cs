namespace AspNetCoreAPI
{
    public class RecipesDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Difficulty { get; set; }
        public string? ImageURL { get; set; }
    }
}

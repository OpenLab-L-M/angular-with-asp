namespace AspNetCoreAPI
{
    public class RecensionDTO
    {
        public int Id { get; set; }
        public int RecipesID { get; set; }
        public string? UserID { get; set; }
        public string? Content { get; set; }
        public string? UserName { get; set; }
        public bool? Liked { get; set; }
        public int? AmountOfLikes { get; set; } = 0;
        public int? AmountOfDisslikes { get; set; } = 0;

    }
}

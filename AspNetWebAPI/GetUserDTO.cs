namespace AspNetCoreAPI
{
    public class GetUserDTO
    {
        public string? UserName { get; set;}
        public string? PictureURL { get; set;}
        IEnumerable<RecipesDTO>? oblubeneReceptiky { get; set;}
        
    }
}

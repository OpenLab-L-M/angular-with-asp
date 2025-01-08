namespace AspNetCoreAPI
{
    public class EditDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Ingrediencie { get; set; }
        public string? Description { get; set; }
        public string? ImgURL { get; set; }
        public List<string>? Postupicky { get; set; }
       
        public int? Cas { get; set; }
    }
}

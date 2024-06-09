namespace AspNetCoreAPI
{
    public class EditDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Ingrediencie { get; set; }
        public string? Postup { get; set; }
        public string? ImgURL { get; set; }
       
        public int? Cas { get; set; }
    }
}

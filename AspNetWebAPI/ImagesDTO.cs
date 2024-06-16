using AspNetCoreAPI.Models;

namespace AspNetCoreAPI
{
    public class ImagesDTO
    {
        public int Id { get; set; }
        public byte[]? image { get; set; }

        public Recipe Recipe { get; set; }
    }
}

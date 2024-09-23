using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class LikeRecensions
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public int RecenziaId { get; set; }
        public bool? IsLiked { get; set; }


        public ApplicationUser User { get; set; } = default!;
        public Recensions Recenzia { get; set; } = default!;
    }
}

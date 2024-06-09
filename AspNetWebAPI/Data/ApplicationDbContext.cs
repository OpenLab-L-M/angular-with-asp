using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
         
    public DbSet<Recipe> Recipes { get; set; } = default!;
    public DbSet<ApplicationUser> Userik { get; set; } = default!;
    public DbSet<ApplicationUserRecipe> UserRecipes { get; set; } = default!;

    public DbSet<Ingredience> Ingredience { get; set; } = default!;
    }
}

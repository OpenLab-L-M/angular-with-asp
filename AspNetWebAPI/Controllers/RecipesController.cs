using AspNetCoreAPI.Data;
using AspNetCoreAPI.Migrations;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class RecipesController : Controller
    {
        private readonly ApplicationDbContext _context;
        public RecipesController(ApplicationDbContext context) => _context = context;

        [HttpGet]
        public IEnumerable<RecipesDTO> GetRecipesList()
        {
            IEnumerable<Recipe> dbRecipes = _context.Recipes;

            return dbRecipes.Select(dbRecipe =>
                new RecipesDTO
                {
                    Id = dbRecipe.Id,
                    Name = dbRecipe.Name,
                    Description = dbRecipe.Description,
                    Difficulty = dbRecipe.Difficulty,
                    ImageURL = dbRecipe.ImageURL,
                });
        }
        [HttpGet("{id:int}")]
        public RecipesDTO GetRecipes(int id)
        {
            var recipe = _context.Recipes.Single(savedId => savedId.Id == id);
            return new RecipesDTO
            {
                Name = recipe.Name,
                Description = recipe.Description,
                Difficulty = recipe.Difficulty,
                ImageURL = recipe.ImageURL,

            };

        }
        [HttpPost("createRecipe")]
        public string CreateRecipe(RecipesDTO receptik)
        {
            Recipe nReceptik = new Recipe
            {
                Name = receptik.Name,
                Description = receptik.Description,
                Difficulty = receptik.Difficulty,
                ImageURL = receptik.ImageURL,
                CheckID = int.Parse(GetCurrentUser().Id),
            };
            _context.Add(nReceptik);
            _context.SaveChanges();
            return "Hotovo";
        }
        protected ApplicationUser? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }

    }
}

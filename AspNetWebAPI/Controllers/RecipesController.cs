using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}

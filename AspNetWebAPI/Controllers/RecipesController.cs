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


    

        public RecipesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<RecipesDTO> GetRecipesList()
        {
            IEnumerable<Recipe> dbRecipes = _context.Recipes;

            return dbRecipes.Select(dbRecipe =>
                new RecipesDTO
                {
                    Id = dbRecipe.Id,
                    Name = dbRecipe.Name,
                    Postup = dbRecipe.Postup,
                    Difficulty = dbRecipe.Difficulty,
                    ImageURL = dbRecipe.ImageURL,
                    CheckID = dbRecipe.CheckID,
                    userID = GetCurrentUser().Id,
                    Ingrediencie = dbRecipe.Ingrediencie,
                    Veganske = dbRecipe.Veganske,
                    Vegetarianske = dbRecipe.Vegetarianske,
                    NizkoKaloricke = dbRecipe.NizkoKaloricke,
                    Cas = dbRecipe.Cas
                });
        }
        [HttpGet("{id:int}")]
        public RecipesDTO GetRecipes(int id)
        {
            var recipe = _context.Recipes.Single(savedId => savedId.Id == id);
            return new RecipesDTO
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Postup = recipe.Postup,
                Difficulty = recipe.Difficulty,
                ImageURL = recipe.ImageURL,
                CheckID = recipe.CheckID,
                userID = GetCurrentUser().Id,
                Ingrediencie = recipe.Ingrediencie,
                Veganske = recipe.Veganske,
                Vegetarianske = recipe.Vegetarianske,
                NizkoKaloricke = recipe.NizkoKaloricke,
                Cas = recipe.Cas
            };
            
        }
        [HttpPost("/CreateRecipe")]
        public RecipesDTO CreateRecipe(RecipesDTO receptik)
        {
            var user = GetCurrentUser();

            var nReceptik = new Recipe()
            {
                Id = receptik.Id,
                Name = receptik.Name,
                Postup = receptik.Postup,
                Difficulty = receptik.Difficulty,
                ImageURL = receptik.ImageURL,
                CheckID = receptik.CheckID,
                userID = GetCurrentUser().Id,
                Ingrediencie = receptik.Ingrediencie,
                Veganske = receptik.Veganske,
                Vegetarianske = receptik.Vegetarianske,
                NizkoKaloricke = receptik.NizkoKaloricke,
                Cas = receptik.Cas

            };
            nReceptik.CheckID = user?.Id;
            _context.Add(nReceptik);
            _context.SaveChanges();
            return receptik;
        }
        

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteRecipe(int id)
        {
            var recipe = _context.Recipes.FirstOrDefault(savedId => savedId.Id == id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            _context.SaveChanges();
            return NoContent();
        }

        protected ApplicationUser? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }


        /*   [HttpPost("upload")]
           public IActionResult UploadImage()
           {
               return Ok(new { message = "Image uploaded successfully" });
           }
           */

   

        


    }
}

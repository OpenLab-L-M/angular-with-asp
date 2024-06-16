using AspNetCoreAPI.Data;
using AspNetCoreAPI.Migrations;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Expressions;
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
                    userID = dbRecipe.userID,
                    Ingrediencie = dbRecipe.Ingrediencie,
                    Veganske = dbRecipe.Veganske,
                    Vegetarianske = dbRecipe.Vegetarianske,
                    NizkoKaloricke = dbRecipe.NizkoKaloricke,
                    Cas = dbRecipe.Cas,
                    imageId = dbRecipe.ImageId
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
                Cas = recipe.Cas,
                imageId = recipe.ImageId
            };
           
        }

        [HttpGet("/getImage/{id:int}")]
        public ImagesDTO GetImage(int id)
        {
            var image = _context.Images.Single(savedId => savedId.Id == id);
            return new ImagesDTO
            {
                Id = image.Id,
                image = image.image
            };

        }


        [HttpGet("/getAllImages")]
        public ActionResult<List<ImagesDTO>> GetImages()
        {
            var images = _context.Images.ToList();
            var imagesDTO = images.Select(image => new ImagesDTO
            {
                Id = image.Id,
                image = image.image
            }).ToList();

            return Ok(imagesDTO);

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
                Cas = receptik.Cas,
                ImageId = receptik.imageId

            };
            nReceptik.CheckID = user?.Id;
            _context.Add(nReceptik);
            _context.SaveChanges();
            return receptik;
        }

        [Route("upload")]
        [HttpPost]
        public int SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                var filename = postedFile.FileName;

                byte[] fileBytes;
                using (var memoryStream = new MemoryStream())
                {
                    postedFile.CopyTo(memoryStream);
                    fileBytes = memoryStream.ToArray();
                }


                var images = new Models.Images()
                {
                    image = fileBytes
                };
         
                _context.Images.Add(images);
                _context.SaveChanges();

                return images.Id;
            }
            catch (Exception)
            {
                return 0;
            }

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
        [HttpPut("Editujem")]
        public IActionResult Edit(EditDTO receptik)
        {
            var nReceptik = _context.Recipes.FirstOrDefault(x => x.Id == receptik.Id);

            nReceptik.Name = receptik.Name;
            nReceptik.Ingrediencie = receptik.Ingrediencie;
            nReceptik.Postup = receptik.Postup;
            nReceptik.ImageURL = receptik.ImgURL;
            nReceptik.Cas = receptik.Cas;
            _context.SaveChanges();
            return Ok();
        }






    }
}

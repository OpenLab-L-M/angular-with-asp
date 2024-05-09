
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;
using System;
using System.Linq;
using System.Security.Claims;

namespace AspNetCoreAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserController : ControllerBase

    {
        private readonly ApplicationDbContext _context;

        private readonly IWebHostEnvironment _environment;
        

        public UserController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet("/userProfile")]
        public GetUserDTO? ReturnUserInfo()
        {
            var user = GetCurrentUser();
            GetUserDTO userik = new GetUserDTO();
            {
                userik.UserName = user.UserName;
                userik.PictureURL = user.PictureURL;

            }
            return userik;
            
        }
        [HttpGet("/userProfile/usersRecipes")]
        public IEnumerable<RecipesDTO> UserRecipes()
        {
            IEnumerable<Recipe> dbRecipes = _context.Recipes.Where(x => x.CheckID == GetCurrentUser().Id).ToList();

            return dbRecipes.Select(dbRecipe => 
                new RecipesDTO
                {
                    Id = dbRecipe.Id,
                    Name = dbRecipe.Name,
                    Description = dbRecipe.Description,
                    Difficulty = dbRecipe.Difficulty,
                    ImageURL = dbRecipe.ImageURL,
                    CheckID = dbRecipe.CheckID,
                    userID = GetCurrentUser().Id,
                });
        }
        [HttpPost("/recipes/addtofav/{id:int}")]
         public IActionResult addtofav([FromRoute] int id)
         {
             var novyOblubenec = _context.Recipes.Where(x => x.Id == id).FirstOrDefault();
             var userik = GetCurrentUser();

            ApplicationUserRecipe pridajOblubeny = new ApplicationUserRecipe()
            {
                RecipeId = novyOblubenec.Id,
                UserId = GetCurrentUser().Id,
            };
            _context.UserRecipes.Add(pridajOblubeny);
            _context.SaveChanges();
            return Ok();
             

         }

        [HttpGet("/userprofile/usersfavrecipes")]
        public IActionResult userfavrecipes()
        {
            var favouriteRecipeIds = _context.UserRecipes.Select(f => f.RecipeId).ToList();
            var fav = _context.UserRecipes
              .Include(f => f.recept)
              .Where(f => f.UserId == GetCurrentUser().Id && favouriteRecipeIds.Contains(f.RecipeId))
              .ToList();

            return Ok(fav);
            
        }
       
        protected ApplicationUser? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }
        
        [Route("upload")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _environment.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                var currentUser = GetCurrentUser();
                if (currentUser != null)
                {
                    byte[] fileBytes;
                    using (var fileStream = new FileStream(physicalPath, FileMode.Open, FileAccess.Read))
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            fileStream.CopyTo(memoryStream);
                            fileBytes = memoryStream.ToArray();
                        }
                    }
                    currentUser.PictureURL = fileBytes;
                    _context.SaveChanges();
                }


                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }

        }


        [HttpDelete("/user/deleteImage")]
        public IActionResult DeleteImage()
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }

            user.PictureURL = null;
            _context.SaveChanges();

            return Ok();
        }


    }

}

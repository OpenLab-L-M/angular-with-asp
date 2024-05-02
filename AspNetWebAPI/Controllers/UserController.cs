﻿using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
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
        [HttpGet("/recipes/AddToFav/{id:int}")]
        public bool AddToFav([FromRoute] int id)
        {
            var novyOblubenec = _context.Recipes.Where(x => x.Id == id).FirstOrDefault();
            var userik = GetCurrentUser();

            userik.Favourites.Add(novyOblubenec);

            
            _context.SaveChanges();
            if (novyOblubenec != null)
            {
                return true;
            }
            else { return false; }

        }
        [HttpGet("/userProfile/usersFavRecipes")]
        public IEnumerable<RecipesDTO> UserFavRecipes()
        {
            var userik = GetCurrentUser();

            var favouriteRecipeIds = userik.Favourites.Select(f => f.Id).ToList();
            IEnumerable<Recipe> dbRecipes = _context.Recipes
             .Where(recipe => favouriteRecipeIds.Any(id => id == recipe.Id))
             .ToList();

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
    }

}

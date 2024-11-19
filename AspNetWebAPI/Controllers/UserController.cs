
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
        
        /*[HttpGet("/clickedUserProfile")]
        public GetUserDTO? returnClickedUser([FromRoute] string userName)
        {
            
            var user = _context.Userik.Where(x => x.UserName == userName.ToString()).Single();
            GetUserDTO userik = new GetUserDTO();
            {
                userik.UserName = user.UserName;
                userik.PictureURL = user.PictureURL;

            }
            return userik;

        }*/



        [HttpGet("/getUserCreators")]
        public ActionResult<List<GetUserDTO>> GetAllUserCreators()
        {
            var users = _context.Userik.ToList();
            var userImages = users.Select(user => new GetUserDTO
            {
                Id = user.Id,
                PictureURL= user.PictureURL
            }).ToList();

            return Ok(userImages);
        }



        [HttpGet("/userProfile/usersRecipes")]
        public IEnumerable<RecipesDTO> UserRecipes()
        {
            IEnumerable<Recipe> dbRecipes = _context.Recipes.Where(x => x.CheckID == GetCurrentUser().Id).ToList();

            return dbRecipes.Select(dbRecipe => mapReceptToDto(dbRecipe));
        }
        [HttpPost("/recipes/addtofav/{id:int}")]
         public IActionResult addtofav([FromRoute] int id)
         {
             var novyOblubenec = _context.Recipes.Where(x => x.Id == id).FirstOrDefault();
             var userik = GetCurrentUser();
            var nachadzaSa = _context.UserRecipes.Any(x => x.RecipeId == id);
            
            
            ApplicationUserRecipe pridajOblubeny = new ApplicationUserRecipe()
            {
                RecipeId = novyOblubenec.Id,
                UserId = GetCurrentUser().Id,
            };
            
            if (!nachadzaSa)
            {
                _context.UserRecipes.Add(pridajOblubeny);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                var vymaz = _context.UserRecipes.Where(x => x.RecipeId == id).Single<ApplicationUserRecipe>();
                _context.UserRecipes.Remove(vymaz);
                _context.SaveChanges();
                return null;
            }



        }

        [HttpGet("/userprofile/usersfavrecipes")]
        public IEnumerable<RecipesDTO> userfavrecipes()
        {
            var favouriteRecipeIds = _context.UserRecipes.Select(f => f.RecipeId).ToList();
            var fav = _context.UserRecipes
              .Include(f => f.recept)
              .Where(f => f.UserId == f.UserId  )
              .ToList();
            return fav.Select(f => mapReceptToDto(f.recept));
            
        }

        private RecipesDTO mapReceptToDto(Recipe dbRecipe)
        {
            return
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
                    Cas = dbRecipe.Cas
                };
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
                var filename = postedFile.FileName;

                byte[] fileBytes;
                using (var memoryStream = new MemoryStream())
                {
                    postedFile.CopyTo(memoryStream);
                    fileBytes = memoryStream.ToArray();
                }

                var currentUser = GetCurrentUser();
                if (currentUser != null)
                {
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
        [HttpGet("vratMojeKomenty")]
        public IEnumerable<RecensionDTO> MyRecensions()
        {
            IEnumerable<Recensions> mojeRecenzie = _context.Recensions.Where(x => x.UserId == GetCurrentUser().Id);
            return mojeRecenzie.Select(dbRecension => RecensionsToDTO(dbRecension)).ToList();
            
        }
        private RecensionDTO RecensionsToDTO(Recensions dbRecension)
        {
            return
                new RecensionDTO
                {
                    Id = dbRecension.Id,
                    UserID = dbRecension.UserId,
                    Content = dbRecension.Content,
                    CheckID = dbRecension.CheckId,
                    UserName = dbRecension.UserName,
                    AmountOfDisslikes = dbRecension.AmountOfDisslikes,
                    AmountOfLikes = dbRecension.AmountOfDisslikes,
                    Datetime = dbRecension.Datetime,
                    RecipesID = dbRecension.RecipeId,
                };
        }

    }

}

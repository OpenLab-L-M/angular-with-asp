﻿namespace AspNetCoreAPI
{
    public class GetUserDTO
    {
        public string? Id {  get; set; }
        public string? UserName { get; set;}
        public byte[]? PictureURL { get; set;}
        IEnumerable<RecipesDTO>? oblubeneReceptiky { get; set;}
        
    }
}

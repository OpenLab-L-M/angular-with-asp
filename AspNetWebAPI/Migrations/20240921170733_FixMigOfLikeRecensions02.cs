using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixMigOfLikeRecensions02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdOfLikedRecipe",
                table: "LikeRecensions",
                newName: "IdOfLikedRecension");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdOfLikedRecension",
                table: "LikeRecensions",
                newName: "IdOfLikedRecipe");
        }
    }
}

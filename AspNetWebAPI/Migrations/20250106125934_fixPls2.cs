using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class fixPls2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RecipeId",
                table: "Postupiky",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Postupiky_RecipeId",
                table: "Postupiky",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Postupiky_Recipes_RecipeId",
                table: "Postupiky",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postupiky_Recipes_RecipeId",
                table: "Postupiky");

            migrationBuilder.DropIndex(
                name: "IX_Postupiky_RecipeId",
                table: "Postupiky");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "Postupiky");
        }
    }
}

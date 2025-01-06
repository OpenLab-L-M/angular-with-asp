using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixLeboTOZaseBuguje5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_PostupyId",
                table: "PostupikyRecipe");

            migrationBuilder.DropIndex(
                name: "IX_PostupikyRecipe_PostupyId",
                table: "PostupikyRecipe");

            migrationBuilder.AddColumn<int>(
                name: "PostupyRecipesId",
                table: "Postupiky",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Postupiky_PostupyRecipesId",
                table: "Postupiky",
                column: "PostupyRecipesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Postupiky_PostupikyRecipe_PostupyRecipesId",
                table: "Postupiky",
                column: "PostupyRecipesId",
                principalTable: "PostupikyRecipe",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postupiky_PostupikyRecipe_PostupyRecipesId",
                table: "Postupiky");

            migrationBuilder.DropIndex(
                name: "IX_Postupiky_PostupyRecipesId",
                table: "Postupiky");

            migrationBuilder.DropColumn(
                name: "PostupyRecipesId",
                table: "Postupiky");

            migrationBuilder.CreateIndex(
                name: "IX_PostupikyRecipe_PostupyId",
                table: "PostupikyRecipe",
                column: "PostupyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_PostupyId",
                table: "PostupikyRecipe",
                column: "PostupyId",
                principalTable: "Postupiky",
                principalColumn: "Id");
        }
    }
}

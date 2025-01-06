using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixLeboTOZaseBuguje7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Postupiky_PostupikyRecipe_PostupyRecipesId",
                table: "Postupiky");

            migrationBuilder.DropTable(
                name: "PostupikyRecipe");

            migrationBuilder.DropIndex(
                name: "IX_Postupiky_PostupyRecipesId",
                table: "Postupiky");

            migrationBuilder.RenameColumn(
                name: "PostupyRecipesId",
                table: "Postupiky",
                newName: "RecipesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RecipesId",
                table: "Postupiky",
                newName: "PostupyRecipesId");

            migrationBuilder.CreateTable(
                name: "PostupikyRecipe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    iRecipeId = table.Column<int>(type: "int", nullable: true),
                    PostupyId = table.Column<int>(type: "int", nullable: true),
                    RecipesID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostupikyRecipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostupikyRecipe_Recipes_iRecipeId",
                        column: x => x.iRecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Postupiky_PostupyRecipesId",
                table: "Postupiky",
                column: "PostupyRecipesId");

            migrationBuilder.CreateIndex(
                name: "IX_PostupikyRecipe_iRecipeId",
                table: "PostupikyRecipe",
                column: "iRecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Postupiky_PostupikyRecipe_PostupyRecipesId",
                table: "Postupiky",
                column: "PostupyRecipesId",
                principalTable: "PostupikyRecipe",
                principalColumn: "Id");
        }
    }
}

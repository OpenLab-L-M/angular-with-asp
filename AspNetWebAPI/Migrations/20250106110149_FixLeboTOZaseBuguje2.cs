using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixLeboTOZaseBuguje2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostupikyRecipe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    postupyId = table.Column<int>(type: "int", nullable: true),
                    RecipesID = table.Column<int>(type: "int", nullable: true),
                    iRecipeId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostupikyRecipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostupikyRecipe_Postupiky_postupyId",
                        column: x => x.postupyId,
                        principalTable: "Postupiky",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PostupikyRecipe_Recipes_iRecipeId",
                        column: x => x.iRecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostupikyRecipe_iRecipeId",
                table: "PostupikyRecipe",
                column: "iRecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_PostupikyRecipe_postupyId",
                table: "PostupikyRecipe",
                column: "postupyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostupikyRecipe");
        }
    }
}

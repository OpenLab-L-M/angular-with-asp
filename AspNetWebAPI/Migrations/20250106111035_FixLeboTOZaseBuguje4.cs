using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixLeboTOZaseBuguje4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_postupyId",
                table: "PostupikyRecipe");

            migrationBuilder.RenameColumn(
                name: "postupyId",
                table: "PostupikyRecipe",
                newName: "PostupyId");

            migrationBuilder.RenameIndex(
                name: "IX_PostupikyRecipe_postupyId",
                table: "PostupikyRecipe",
                newName: "IX_PostupikyRecipe_PostupyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_PostupyId",
                table: "PostupikyRecipe",
                column: "PostupyId",
                principalTable: "Postupiky",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_PostupyId",
                table: "PostupikyRecipe");

            migrationBuilder.RenameColumn(
                name: "PostupyId",
                table: "PostupikyRecipe",
                newName: "postupyId");

            migrationBuilder.RenameIndex(
                name: "IX_PostupikyRecipe_PostupyId",
                table: "PostupikyRecipe",
                newName: "IX_PostupikyRecipe_postupyId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostupikyRecipe_Postupiky_postupyId",
                table: "PostupikyRecipe",
                column: "postupyId",
                principalTable: "Postupiky",
                principalColumn: "Id");
        }
    }
}

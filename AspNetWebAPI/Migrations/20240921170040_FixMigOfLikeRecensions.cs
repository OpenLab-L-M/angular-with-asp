using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixMigOfLikeRecensions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikeRecensions_Recipes_ReceptId",
                table: "LikeRecensions");

            migrationBuilder.DropColumn(
                name: "AmountOfLikes",
                table: "LikeRecensions");

            migrationBuilder.RenameColumn(
                name: "ReceptId",
                table: "LikeRecensions",
                newName: "RecenziaId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeRecensions_ReceptId",
                table: "LikeRecensions",
                newName: "IX_LikeRecensions_RecenziaId");

            migrationBuilder.AddForeignKey(
                name: "FK_LikeRecensions_Recensions_RecenziaId",
                table: "LikeRecensions",
                column: "RecenziaId",
                principalTable: "Recensions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LikeRecensions_Recensions_RecenziaId",
                table: "LikeRecensions");

            migrationBuilder.RenameColumn(
                name: "RecenziaId",
                table: "LikeRecensions",
                newName: "ReceptId");

            migrationBuilder.RenameIndex(
                name: "IX_LikeRecensions_RecenziaId",
                table: "LikeRecensions",
                newName: "IX_LikeRecensions_ReceptId");

            migrationBuilder.AddColumn<int>(
                name: "AmountOfLikes",
                table: "LikeRecensions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_LikeRecensions_Recipes_ReceptId",
                table: "LikeRecensions",
                column: "ReceptId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

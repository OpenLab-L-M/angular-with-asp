using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class fixMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikeRecensions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdOfLikingUser = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdOfLikedRecipe = table.Column<int>(type: "int", nullable: false),
                    AmountOfLikes = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReceptId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikeRecensions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikeRecensions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LikeRecensions_Recipes_ReceptId",
                        column: x => x.ReceptId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Recensions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RecipeId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recensions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recensions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Recensions_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikeRecensions_ReceptId",
                table: "LikeRecensions",
                column: "ReceptId");

            migrationBuilder.CreateIndex(
                name: "IX_LikeRecensions_UserId",
                table: "LikeRecensions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Recensions_RecipeId",
                table: "Recensions",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Recensions_UserId",
                table: "Recensions",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikeRecensions");

            migrationBuilder.DropTable(
                name: "Recensions");
        }
    }
}

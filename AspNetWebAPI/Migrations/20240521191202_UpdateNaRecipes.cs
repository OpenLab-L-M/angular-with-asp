using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNaRecipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Recipes",
                newName: "userID");

            migrationBuilder.AddColumn<int>(
                name: "Cas",
                table: "Recipes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ingrediencie",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "NizkoKaloricke",
                table: "Recipes",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Postup",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Veganske",
                table: "Recipes",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Vegetarianske",
                table: "Recipes",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cas",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Ingrediencie",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "NizkoKaloricke",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Postup",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Veganske",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Vegetarianske",
                table: "Recipes");

            migrationBuilder.RenameColumn(
                name: "userID",
                table: "Recipes",
                newName: "Description");
        }
    }
}

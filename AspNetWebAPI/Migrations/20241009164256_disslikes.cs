using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class disslikes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLiked",
                table: "LikeRecensions");

            migrationBuilder.AddColumn<int>(
                name: "AmountOfDisslikes",
                table: "Recensions",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountOfDisslikes",
                table: "Recensions");

            migrationBuilder.AddColumn<bool>(
                name: "IsLiked",
                table: "LikeRecensions",
                type: "bit",
                nullable: true);
        }
    }
}

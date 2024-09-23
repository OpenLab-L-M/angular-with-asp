using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AspNetCoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class WhatHappened : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdOfLikedRecension",
                table: "LikeRecensions");

            migrationBuilder.DropColumn(
                name: "IdOfLikingUser",
                table: "LikeRecensions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdOfLikedRecension",
                table: "LikeRecensions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "IdOfLikingUser",
                table: "LikeRecensions",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

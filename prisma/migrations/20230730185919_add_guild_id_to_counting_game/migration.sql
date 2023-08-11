/*
  Warnings:

  - Added the required column `guild_id` to the `counting_game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "counting_game" ADD COLUMN     "guild_id" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the `EconomySettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "guild_config" DROP CONSTRAINT "guild_config_guild_id_fkey";

-- DropTable
DROP TABLE "EconomySettings";

-- AlterTable
ALTER TABLE "guild_config" ADD COLUMN     "bannedWords" TEXT[] DEFAULT ARRAY[]::TEXT[];

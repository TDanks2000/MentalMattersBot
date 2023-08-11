/*
  Warnings:

  - You are about to drop the column `guild_icon` on the `guild_config` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guild_config" DROP COLUMN "guild_icon",
ADD COLUMN     "join_messages" BOOLEAN DEFAULT false,
ADD COLUMN     "rankup_messages" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "EconomySettings" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "random_message_coins" BOOLEAN DEFAULT true,
    "min_random_coins" INTEGER DEFAULT 0,
    "max_random_coins" INTEGER DEFAULT 1,
    "daily_coins" INTEGER DEFAULT 5,
    "weekly_coins" INTEGER DEFAULT 25,
    "monthly_coins" INTEGER DEFAULT 30,
    "yearly_coins" INTEGER DEFAULT 100,

    CONSTRAINT "EconomySettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EconomySettings_guild_id_key" ON "EconomySettings"("guild_id");

-- AddForeignKey
ALTER TABLE "guild_config" ADD CONSTRAINT "guild_config_guild_id_fkey" FOREIGN KEY ("guild_id") REFERENCES "EconomySettings"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CountingGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GuildConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PollVotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "CountingGame";

-- DropTable
DROP TABLE "GuildConfig";

-- DropTable
DROP TABLE "Level";

-- DropTable
DROP TABLE "PollVotes";

-- CreateTable
CREATE TABLE "guild_config" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "guild_icon" TEXT,

    CONSTRAINT "guild_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poll_votes" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "up_members" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "down_members" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "poll_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balance" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counting_game" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "last_person_id" TEXT NOT NULL,

    CONSTRAINT "counting_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guild_config_guild_id_key" ON "guild_config"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "counting_game_channel_id_key" ON "counting_game"("channel_id");

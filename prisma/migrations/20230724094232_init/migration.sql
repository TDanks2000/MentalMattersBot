-- CreateTable
CREATE TABLE "GuildConfig" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "guild_icon" TEXT,

    CONSTRAINT "GuildConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollVotes" (
    "id" SERIAL NOT NULL,
    "guild_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "ownder_id" TEXT NOT NULL,
    "up_members" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "down_members" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PollVotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CountingGame" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "last_person_id" TEXT NOT NULL,

    CONSTRAINT "CountingGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildConfig_guild_id_key" ON "GuildConfig"("guild_id");

-- CreateIndex
CREATE UNIQUE INDEX "CountingGame_channel_id_key" ON "CountingGame"("channel_id");

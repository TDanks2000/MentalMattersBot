import {
  ActivityType,
  ClientOptions,
  GatewayIntentBits,
  Options,
} from "discord.js";

export const clientOptions: ClientOptions = {
  presence: {
    status: "dnd",
    activities: [{ name: "You will be okay", type: ActivityType.Playing }],
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  makeCache: Options.cacheEverything(),
};

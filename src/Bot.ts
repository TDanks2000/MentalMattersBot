require("dotenv").config();
import { Client, GatewayIntentBits } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";

const console = new Console();

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
});

const TOKEN = process.env.BotToken;

(async () => {
  try {
    await client.login(TOKEN);
    console.info("Bot is ready");
  } catch (error) {
    console.error((error as Error).message);
  }
})();

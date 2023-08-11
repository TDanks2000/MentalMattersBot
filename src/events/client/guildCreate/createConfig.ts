import { EmbedBuilder, AutocompleteInteraction, PermissionsBitField, Guild } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "../../../structure/Client";
const console = new Console();

module.exports = async (guild: Guild, client: ClientClass) => {
  const db = client.db.guild_config;

  const hasConfig = await db.findUnique({
    where: {
      guild_id: guild.id,
    },
  });

  if (hasConfig) return;

  await db.create({
    data: {
      guild_id: guild.id,
    },
  });

  console.info("Guild Config Created", guild.name);
};

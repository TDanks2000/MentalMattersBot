import { EmbedBuilder } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "../../../structure/Client";

const console = new Console();

module.exports = async (queue: any, song: any, client: ClientClass) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "MUSIC | Queue finished",
      iconURL:
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif",
    })
    .setColor(client.config.color)
    .setDescription(`The queue has finished!`)
    .setTimestamp();

  return await queue.textChannel.send({
    embeds: [embed],
  });
};

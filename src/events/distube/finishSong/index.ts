import { EmbedBuilder } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "../../../structure/Client";

const console = new Console();

module.exports = async (queue: any, song: any, client: ClientClass) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "MUSIC | SONG Finished",
      iconURL:
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif",
    })
    .setColor(client.config.color)
    .setDescription(
      `added [${song.name}](${song.url}) to the queue!
    requested by ${song.user}`
    )
    .setThumbnail(song.thumbnail)
    .setFooter({
      text: `Requested by ${song.user.tag}`,
      iconURL: song.user.displayAvatarURL(),
    })
    .setTimestamp();

  return await queue.textChannel.send({
    embeds: [embed],
  });
};

import { EmbedBuilder } from "discord.js";
import { ClientClass } from "../../../structure/Client";

module.exports = async (queue: any, song: any, client: ClientClass) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "MUSIC | Playing",
      iconURL:
        "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif",
    })
    .setColor(client.config.color)
    .setDescription(`[${song.name}](${song.url})`)
    .addFields({
      name: "Duration",
      value: song.formattedDuration,
      inline: true,
    })
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

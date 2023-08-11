import { ApplicationCommandOptionType, SlashCommandBuilder } from "discord.js";

import { SlashCommandObject } from "../../types";

const command: SlashCommandObject = {
  data: {
    name: "volume",
    description: "changes the volume of the song",
    options: [
      {
        max_value: 100,
        min_value: 0,
        name: "volume",
        description: "min: 0, max: 100",
        type: ApplicationCommandOptionType.Integer,
      },
    ],
  },
  async run({ interaction, client }) {
    const queue = client.distube.getQueue(interaction.guildId);

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return await interaction.reply({
        content: "You need to be in a voice channel to pause the song!",
        ephemeral: true,
      });

    if (!queue)
      return await interaction.reply({
        content: "There is no song that I could set the volume for!",
        ephemeral: true,
      });

    queue.setVolume(interaction.options.getInteger("volume")!);

    return interaction.reply({
      content: `The volume has been set to ${interaction.options.getInteger("volume")}`,
      ephemeral: true,
    });
  },
};

module.exports = command;

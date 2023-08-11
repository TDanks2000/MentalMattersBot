import { SlashCommandBuilder } from "discord.js";

import { SlashCommandObject } from "../../types";

const command: SlashCommandObject = {
  data: {
    name: "stop",
    description: "Stop the music",
  },
  async run({ interaction, client }) {
    const queue = client.distube.getQueue(interaction.guildId);

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return await interaction.reply({
        content: "You need to be in a voice channel to stop music!",
        ephemeral: true,
      });

    if (!queue)
      return await interaction.reply({
        content: "There is no music playing!",
        ephemeral: true,
      });

    client.distube.stop(interaction.guildId);
    return await interaction.reply({
      content: "Stopped the music!",
    });
  },
};

module.exports = command;

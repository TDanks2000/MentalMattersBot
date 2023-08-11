import { SlashCommandObject } from "../../types";

import { Client, Interaction, SlashCommandBuilder, ApplicationCommandOptionType } from "discord.js";
import youtube from "youtube-sr";

const command: SlashCommandObject = {
  data: {
    name: "play",
    description: "Play a song",
    options: [
      {
        name: "song",
        description: "The song you want to play",
        type: ApplicationCommandOptionType.String,
        autocomplete: true,
        required: true,
      },
    ],
  },

  async autocomplete(interaction, client) {
    try {
      const focusedValue = interaction.options.getFocused()?.toLowerCase()?.slice(0, 99);

      if (focusedValue.startsWith("https://") || focusedValue?.length < 1)
        return await interaction.respond([
          {
            name: focusedValue,
            value: focusedValue,
          },
        ]);

      // let results = await yts(focusedValue).catch(() => null);
      let results = await youtube
        .search(focusedValue, {
          type: "video",
          limit: 25,
          safeSearch: true,
        })
        .catch(() => {});

      if (!results || results?.length < 1)
        return await interaction.respond([
          {
            name: focusedValue,
            value: focusedValue,
          },
        ]);

      await interaction.respond(
        results.map((choice) => ({
          name:
            choice?.title?.replace(/[^a-zA-Z ]/g, "")?.slice(0, 99) ?? focusedValue?.slice(0, 10),
          value: choice?.url ?? focusedValue,
        }))
      );
    } catch (error) {
      console.log({
        time: new Date().toLocaleString(),
        command: "play",
        type: "autocomplete",
        error: (error as Error).message,
      });
      console.error(error);
    }
  },

  async run({ interaction, client }) {
    const song = interaction.options.getString("song")!;
    const queue = client.distube.getQueue(interaction.guildId);

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return await interaction.reply({
        content: "You need to be in a voice channel to play music!",
        ephemeral: true,
      });

    client.distube.play(voiceChannel, song, {
      textChannel: interaction.channel!,
      member: interaction.member,
    });

    if (queue) {
      return await interaction.reply({
        content: `Added ${song} to the queue!`,
        ephemeral: true,
      });
    }

    return await interaction.reply({
      content: `Playing ${song}!`,
      ephemeral: true,
    });
  },
};

module.exports = command;

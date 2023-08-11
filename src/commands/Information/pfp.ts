import { ApplicationCommandOptionType } from "discord.js";
import { SlashCommandObject } from "../../types";

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const command: SlashCommandObject = {
  data: {
    name: "pfp",
    description: "displays your profile picture",
    options: [
      {
        name: "user",
        description: "the user to display the profile picture of",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },

  run: async ({ interaction, client }) => {
    const user = interaction.options.getUser("user") || interaction.user;
    const avatar = user.displayAvatarURL({ size: 1024, forceStatic: false });

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s profile picture`)
      .setImage(avatar)
      .setColor(user?.accentColor ?? "Random");

    return interaction.reply({ embeds: [embed] });
  },
};

module.exports = command;

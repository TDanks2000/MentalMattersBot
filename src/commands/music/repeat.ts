const { SlashCommandBuilder } = require("discord.js");

import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { SlashCommandObject } from "../../types";

import { ProgressBar } from "../../utils";

const command: SlashCommandObject = {
  data: {
    name: "repeat",
    description: "repeat the current song or queue",
  },

  async run({ interaction, client }) {
    interaction.reply({
      content: "Not implemented yet",
      ephemeral: true,
    });
  },
};

module.exports = command;

import { ApplicationCommandOptionType, Embed, EmbedBuilder } from "discord.js";
import { SlashCommandObject } from "../../types";

type Affirmation = {
  affirmation: string;
};

const command: SlashCommandObject = {
  data: {
    name: "affirmation",
    description: "Sends a random affirmation",
  },

  run: async ({ interaction, client }) => {
    const data = await fetch("https://www.affirmations.dev/");
    const affirmation = (await data.json()) as Affirmation;

    if (!affirmation) return await interaction.reply("There was an error, please try again.");

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Affirmation")
      .setDescription(`**${affirmation.affirmation}**`)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });
  },
};

module.exports = command;

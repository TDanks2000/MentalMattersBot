import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  Embed,
  EmbedBuilder,
  HexColorString,
} from "discord.js";
import { SlashCommandObject } from "../../types";

const command: SlashCommandObject = {
  data: {
    name: "invite",
    description: "invite the bot to your server",
  },

  run: async ({ interaction, client }) => {
    const inviteEmbed = new EmbedBuilder()
      .setTitle("Invite me to your server!")
      .setColor(client.config.color);

    // return interaction with embed and button to invite the bot
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Invite")
        .setStyle(ButtonStyle.Link)

        .setURL(
          `https://discord.com/api/oauth2/authorize?client_id=${
            interaction.client.user!.id
          }&permissions=8&scope=bot%20applications.commands`
        )
    );

    return interaction
      .reply({ embeds: [inviteEmbed], components: [actionRow] })
      .catch(console.error);
  },
};

module.exports = command;

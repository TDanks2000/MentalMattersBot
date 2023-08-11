import { SlashCommandObject } from "../../types";
import { pingStats, toFixedNumber } from "../../functions";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  HexColorString,
} from "discord.js";
import { ClientClass } from "../../structure/Client";
import { config, console } from "../../utils";

const command: SlashCommandObject = {
  data: {
    name: "config_create",
    description: "creates a config for your guild",
  },
  options: {
    userPermissions: ["Administrator"],
  },

  run: async ({ interaction, client }) => {
    const db = client.db.guild_config;

    const hasConfig = await db.findUnique({
      where: {
        guild_id: interaction.guild.id,
      },
    });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Config")
      .setDescription("There is already a config for this server")
      .setTimestamp();

    if (hasConfig) return await interaction.reply({ embeds: [embed], ephemeral: true });

    await db.create({
      data: {
        guild_id: interaction.guild.id,
      },
    });

    embed
      .setColor("Green")
      .setTitle("Config")
      .setDescription(`Config created for server ${interaction.guild.name}`)
      .setTimestamp();

    console.info("Guild Config Created", interaction.guild.name, interaction.guild.id);

    return await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};

module.exports = command;

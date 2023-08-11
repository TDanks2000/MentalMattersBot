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
import { config } from "../../utils";

const command: SlashCommandObject = {
  data: {
    name: "poll",
    description: "creates a poll",
    options: [
      {
        name: "topic",
        description: "topic of the poll",
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  options: {
    userPermissions: ["Administrator"],
  },

  run: async ({ interaction, client }) => {
    await interaction.reply({
      content: "Creating a poll",
      ephemeral: true,
    });

    const topic = await interaction.options.getString("topic");

    const embed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle("📌 Poll started")
      .setDescription(`> ${topic}`)
      .addFields({ name: "✅ Yes", value: "0", inline: true })
      .addFields({ name: "❌ No", value: "0", inline: true })
      .setFooter({
        text: `Started by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("upvotePoll")
        .setLabel("✅ YES")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("downvotePoll").setLabel("❌ NO").setStyle(ButtonStyle.Danger)
    );

    const msg = await interaction.channel!.send({
      embeds: [embed],
      components: [buttons],
    });

    msg.createMessageComponentCollector();

    await (client as ClientClass).db.poll_votes.create({
      data: {
        guild_id: interaction.guild!.id,
        owner_id: interaction.user.id,
        message_id: msg.id,
        down_members: [],
        up_members: [],
        downvotes: 0,
        upvotes: 0,
      },
    });
  },
};

module.exports = command;

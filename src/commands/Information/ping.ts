import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

import { SlashCommandObject } from "../../types";
import { pingStats, toFixedNumber } from "../../functions";
import { EmbedBuilder, HexColorString } from "discord.js";
import { ClientClass } from "../../structure/Client";

const command: SlashCommandObject = {
  data: {
    name: "ping",
    description: "Pong!",
  },

  run: async ({ interaction, client }) => {
    const data = await pingStats(client);
    const uptime = dayjs.duration(client.uptime!).humanize();

    const embed = new EmbedBuilder()
      .setTitle("🏓 PONG!")
      .setColor((client as ClientClass).config.color as HexColorString)
      .addFields(
        {
          name: "Api Latency",
          value: `${data.apiLatency}ms`,
          inline: true,
        },
        {
          name: "Client Latency",
          value: `${
            Date.now() - (new Date(interaction.createdTimestamp) as any)
          }ms`,
          inline: true,
        },
        {
          name: "Memory Usage",
          value: `${toFixedNumber(data.memoryUsage)}mb`,
          inline: true,
        }
      )
      .setFooter({
        text: `Up for  ${uptime}`,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

module.exports = command;

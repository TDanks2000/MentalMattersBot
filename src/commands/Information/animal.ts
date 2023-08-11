import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

import { SlashCommandObject } from "../../types";
import { pingStats, toFixedNumber } from "../../functions";
import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  HexColorString,
} from "discord.js";
import { ClientClass } from "../../structure/Client";
import { config } from "../../utils";

const command: SlashCommandObject = {
  data: {
    name: "animal",
    description: "Get a random picture and fact about an animal, and a short fact!",
    options: [
      {
        name: "animal_name",
        description: "name of the animal",
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      },
    ],
  },
  autocomplete: async (interaction, client) => {
    const focusedValue = interaction.options.getFocused()?.toLowerCase();

    const choices = ["Dog", "Cat", "Koala", "Panda", "Red panda", "Bird", "Raccoon", "Kangaroo"];
    const filtered = choices.filter((choice) => choice?.toLowerCase().includes(focusedValue));

    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  },
  run: async ({ interaction, client }) => {
    const animal_name = await (interaction as ChatInputCommandInteraction).options
      .getString("animal_name")
      ?.replaceAll(" ", "_");

    const data = await (await fetch(`https://some-random-api.com/animal/${animal_name}`)).json();

    const embed = new EmbedBuilder()
      .setTitle(`${animal_name}`)
      .setColor(config.color)
      .setImage(data.image)
      .setDescription(data.fact)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    return await interaction.reply({
      embeds: [embed],
    });
  },
};

module.exports = command;

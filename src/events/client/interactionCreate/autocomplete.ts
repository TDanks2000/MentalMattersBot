import {
  EmbedBuilder,
  AutocompleteInteraction,
  InteractionType,
  PermissionsBitField,
} from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "../../../structure/Client";
import { SlashCommandObject } from "../../../types";

const console = new Console();

module.exports = async (interaction: AutocompleteInteraction<"cached">, client: ClientClass) => {
  if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) {
    return;
  }

  const { commands } = client;
  const { commandName } = interaction;

  const command = commands.get(commandName) as SlashCommandObject;

  if (!command) return;
  try {
    if (command.autocomplete) command.autocomplete(interaction, client);
  } catch (err) {
    console.error((err as Error).message);
  }
};

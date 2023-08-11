import {
  Client,
  APIApplicationCommandOption,
  ContextMenuCommandType,
  Interaction,
  PermissionResolvable,
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  CommandInteraction,
  ContextMenuCommandInteraction,
  AutocompleteInteraction,
  TextChannel,
  ChatInputCommandInteraction,
} from "discord.js";
import { ClientClass } from "../structure/Client";
import { VoiceConnection } from "@discordjs/voice";

export interface HandlerOptions {
  client: ClientClass;
  commandsPath?: string;
  eventsPath?: string;
  validationsPath?: string;
  componentsPath?: string;
  devGuildIds?: string[];
  devUserIds?: string[];
}

export interface HandlerData extends HandlerOptions {
  commands: Array<SlashCommandObject | ContextCommandObject>;
}

export interface SlashCommandObject {
  data:
    | SlashCommandBuilder
    | {
        name: string;
        name_localizations?: any;
        description: string;
        dm_permission?: boolean;
        options?: APIApplicationCommandOption[];
      };
  options?: {
    guildOnly?: boolean;
    devOnly?: boolean;
    deleted?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
  };
  autocomplete?: (Interaction: AutocompleteInteraction<"cached">, client: ClientClass) => void;
  run: ({
    interaction,
    client,
  }: {
    interaction: ChatInputCommandInteraction<"cached">;
    client: ClientClass;
  }) => void;
}

export interface ContextCommandObject {
  data:
    | ContextMenuCommandBuilder
    | {
        name: string;
        name_localizations?: any;
        type: ContextMenuCommandType;
        dm_permission?: boolean;
      };
  options?: {
    guildOnly?: boolean;
    devOnly?: boolean;
    deleted?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
  };
  autocomplete: ({}: { interaction: CommandInteraction; client: ClientClass }) => void;
  run: ({}: { interaction: Interaction; client: ClientClass }) => void;
}

export type CommandProps = {
  interaction: CommandInteraction;
  client: Client;
};

export interface QueueOptions {
  interaction: CommandInteraction;
  textChannel: TextChannel;
  connection: VoiceConnection;
}

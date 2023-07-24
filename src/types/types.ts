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
} from "discord.js";

export interface HandlerOptions {
  client: Client;
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
  run: ({}: { interaction: CommandInteraction; client: Client }) => void;
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
  run: ({}: { interaction: Interaction; client: Client }) => void;
}

export type CommandProps = {
  interaction: CommandInteraction;
  client: Client;
};

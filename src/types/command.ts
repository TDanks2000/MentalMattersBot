import { Client } from "discord.js";
import { ContextCommandObject, SlashCommandObject } from ".";
import { ClientClass } from "../structure/Client";

export interface CommandHandlerOptions {
  client: ClientClass;
  commandsPath: string;
  devGuildIds: string[];
  devUserIds: string[];
  validations: Function[];
}

export interface CommandHandlerData extends CommandHandlerOptions {
  commands: Array<SlashCommandObject | ContextCommandObject>;
}

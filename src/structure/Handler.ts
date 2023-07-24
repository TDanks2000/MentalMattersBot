import {
  CommandHandler,
  ComponentHandler,
  ValidationHandler,
} from "..//handlers";
import { EventHandler } from "./../handlers/eventHandler";
import { HandlerData, HandlerOptions } from "./../types/types";
import { ClientClass } from "./Client";

export class Handler {
  private _data: HandlerData;

  constructor({ ...options }: HandlerOptions) {
    if (!options.client) {
      throw new Error('"client" is required when instantiating Handler class.');
    }

    if (options.validationsPath && !options.commandsPath) {
      throw new Error(
        '"commandsPath" is required when "validationsPath" is set.'
      );
    }

    this._data = {
      ...options,
      commands: [],
    };

    this._init();
  }

  private _init() {
    // Event handler
    if (this._data.eventsPath) {
      new EventHandler({
        client: this._data.client,
        eventsPath: this._data.eventsPath,
      });
    }

    // Validation handler
    let validationFunctions: Function[] = [];

    if (this._data.validationsPath) {
      const validationHandler = new ValidationHandler({
        validationsPath: this._data.validationsPath,
      });

      validationFunctions = validationHandler.getValidations();
    }

    // Command handler
    if (this._data.commandsPath) {
      const commandHandler = new CommandHandler({
        client: this._data.client,
        commandsPath: this._data.commandsPath,
        devGuildIds: this._data.devGuildIds || [],
        devUserIds: this._data.devUserIds || [],
        validations: validationFunctions,
      });

      this._data.commands = commandHandler.getCommands();
    }

    // Components Handler
    if (this._data.componentsPath) {
      new ComponentHandler({
        client: this._data.client as ClientClass,
        componentsPath: this._data.componentsPath,
      });
    }
  }

  get commands() {
    return this._data.commands.map((cmd) => {
      const { run, ...command } = cmd;
      return command;
    });
  }
}

import { Client, GatewayIntentBits, Options, Collection, ActivityType } from "discord.js";
import fs, { promises } from "node:fs";
import { pathToFileURL } from "node:url";
import path, { basename, dirname, resolve } from "node:path";
import Console from "@tdanks2000/fancyconsolelog";
import { clientOptions } from "./utils/ClientOptions";
import { Database } from "../database/Prisma";

import { config } from "../utils";
import { Handler } from "./Handler";

import { AsciiTable3, AlignmentEnum } from "ascii-table3";
import { SlashCommandObject } from "../types";
import { DisTube } from "distube";

var table = new AsciiTable3();
table.setHeading("Command", "Stats", "Description");

const console = new Console();

export class ClientClass extends Client {
  public buttons = new Collection();
  public commands = new Collection();
  public db = new Database();
  public distube: DisTube = new DisTube(this);

  public config = config;

  constructor() {
    super(clientOptions);

    const handler = new Handler({
      client: this,
      commandsPath: path.join(__dirname, "..", "commands"),
      eventsPath: path.join(__dirname, "..", "events"),
      validationsPath: path.join(__dirname, "..", "validations"),
      componentsPath: path.join(__dirname, "..", "components"),
    });

    handler.commands.map((item) => {
      this.commands.set(item.data.name, item);
      table.addRow(item.data.name, "✅", (item as SlashCommandObject).data.description);
    });
    console.log(table.toString());

    this.init();
  }

  public async init() {
    console.info("Bot is loading...");

    const TOKEN =
      process.env.NODE_ENV! === "production" ? process.env.BotToken : process.env.BotToken_DEV;
    this.login(TOKEN);
  }
}

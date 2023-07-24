import {
  Client,
  GatewayIntentBits,
  Options,
  Collection,
  ActivityType,
} from "discord.js";
import fs, { promises } from "node:fs";
import { pathToFileURL } from "node:url";
import { basename, dirname, resolve } from "node:path";
import Console from "@tdanks2000/fancyconsolelog";
import { clientOptions } from "./utils/ClientOptions";
import { Database } from "../database/Prisma";

import config from "../config.json";

const console = new Console();

export class ClientClass extends Client {
  public buttons = new Collection();
  public db = new Database();
  public distube: any;

  public config = config;

  constructor() {
    super(clientOptions);
  }

  public async init() {
    console.info("Bot is loading...");

    const TOKEN = process.env.BotToken;
    this.login(TOKEN);
  }
}

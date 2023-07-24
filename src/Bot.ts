import fs from "node:fs";
import Console from "@tdanks2000/fancyconsolelog";
import { ClientClass } from "./structure/Client";
import path from "node:path";
import { config } from "dotenv";
import { Handler } from "./structure/Handler";
config();

const console = new Console();

export const client = new ClientClass();

new Handler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  validationsPath: path.join(__dirname, "validations"),
  componentsPath: path.join(__dirname, "components"),
});

client.init();

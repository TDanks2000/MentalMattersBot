import { Client } from "discord.js";
import Console from "@tdanks2000/fancyconsolelog";

const console = new Console();

module.exports = (c: any, client: Client) => {
  console.info(`${c.user.username} is ready!`);
};

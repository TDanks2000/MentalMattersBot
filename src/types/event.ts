import { Client } from "discord.js";
import { ClientClass } from "../structure/Client";

export interface EventHandlerOptions {
  client: ClientClass;
  eventsPath: string;
}

export interface EventHandlerData extends EventHandlerOptions {
  events: { name: string; functions: Function[] }[];
  distubeEvents: { name: string; functions: Function[] }[];
}

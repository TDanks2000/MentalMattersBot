import { ClientClass } from "./structure/Client";
import { config } from "dotenv";
config();

export const client = new ClientClass();

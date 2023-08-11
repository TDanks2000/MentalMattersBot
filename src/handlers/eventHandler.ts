import { Client } from "discord.js";
import { ClientClass } from "../structure/Client";
import { getFilePaths, getFolderPaths, console } from "../utils";
import { EventHandlerData, EventHandlerOptions } from "./../types";

export class EventHandler {
  _data: EventHandlerData;

  constructor({ ...options }: EventHandlerOptions) {
    this._data = {
      ...options,
      events: [],
      distubeEvents: [],
    };

    this._buildEvents();
    this._registerEvents();
  }

  _buildEvents() {
    const eventFolderPaths = getFolderPaths(this._data.eventsPath);
    for (const folder of eventFolderPaths) {
      const folderName = folder.replace(/\\/g, "/").split("/").pop() as string;

      switch (folderName) {
        case "client":
          this.getFolderEvents(folder, this._data.events);
          break;
        case "distube":
          this.getFolderEvents(folder, this._data.distubeEvents);
      }
    }
  }

  private getFolderEvents = (folder: string, toPushTo: any[]) => {
    const clientFolderPaths = getFolderPaths(folder);

    for (const eventFolderPath of clientFolderPaths) {
      const eventName = eventFolderPath.replace(/\\/g, "/").split("/").pop() as string;

      const eventFilePaths = getFilePaths(eventFolderPath, true).filter(
        (path) => path.endsWith(".js") || path.endsWith(".ts")
      );

      const eventObj = {
        name: eventName,
        functions: [] as Function[],
      };

      toPushTo.push(eventObj);

      for (const eventFilePath of eventFilePaths) {
        const eventFunction = require(eventFilePath);

        if (typeof eventFunction !== "function") {
          console.error(`Ignoring: Event ${eventFilePath} does not export a function.`);
          continue;
        }

        eventObj.functions.push(eventFunction);
      }
    }
  };

  _registerEvents() {
    const client = this._data.client;

    for (const eventObj of this._data.events) {
      client.on(eventObj.name, async (...params) => {
        this.runEvent(eventObj, params, client);
      });
    }

    for (const eventObj of this._data.distubeEvents) {
      this._data.client.distube.on(eventObj.name as any, async (...params: any): Promise<any> => {
        this.runEvent(eventObj, params, client);
      });
    }
  }

  private runEvent = async (eventObj: any, params: any[], client: ClientClass) => {
    for (const eventFunction of eventObj.functions) {
      const stopEventLoop = await eventFunction(...params, client);

      if (stopEventLoop) {
        break;
      }
    }
  };

  getEvents() {
    return this._data.events.concat(this._data.distubeEvents);
  }
}

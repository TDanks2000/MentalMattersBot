import fs from "node:fs";
import { AsciiTable3, AlignmentEnum } from "ascii-table3";

var table = new AsciiTable3();
table.setHeading("Buttons", "Stats");

import { ComponentHandlerOptions } from "../types/index.js";

export class ComponentHandler {
  _data: ComponentHandlerOptions;

  constructor({ ...options }: ComponentHandlerOptions) {
    this._data = {
      ...options,
    };

    this._init();
  }

  async _init() {
    const componentFolders = fs.readdirSync(this._data.componentsPath);
    for (const folder of componentFolders) {
      const componentFile = fs
        .readdirSync(`${this._data.componentsPath}/${folder}`)
        .filter((path) => path.endsWith(".js") || path.endsWith(".ts"));

      switch (folder) {
        case "buttons":
          for (const file of componentFile) {
            const button = require(`../components/${folder}/${file}`);
            table.addRow(button.data.name, "✅");
            this._data.client.buttons.set(button.data.name, button);
          }
          break;

        default:
          break;
      }
    }

    console.log(table.toString());
  }
}

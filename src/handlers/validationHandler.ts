import { console, getFilePaths } from "../utils";
import { ValidationHandlerData, ValidationHandlerOptions } from "./../types";

export class ValidationHandler {
  _data: ValidationHandlerData;

  constructor({ ...options }: ValidationHandlerOptions) {
    this._data = {
      ...options,
      validations: [],
    };

    this._buildValidations();
  }

  _buildValidations() {
    const validationFilePaths = getFilePaths(
      this._data.validationsPath,
      true
    ).filter((path) => path.endsWith(".js") || path.endsWith(".ts"));

    for (const validationFilePath of validationFilePaths) {
      const validationFunction = require(validationFilePath);

      if (typeof validationFunction !== "function") {
        console.error(
          `Ignoring: Validation ${validationFilePath} does not export a function.`
        );
        continue;
      }

      this._data.validations.push(validationFunction);
    }
  }

  getValidations() {
    return this._data.validations;
  }
}

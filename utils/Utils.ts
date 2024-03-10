import fs from "fs";
import Logger from "./Logger"

export class Utils {
  static async clearDirectory(directoryPath: string) {
    try {
      const files = await fs.promises.readdir(directoryPath);
      for (const file of files) {
        await fs.promises.unlink(`${directoryPath}/${file}`);
      }

      Logger.info(`Directory ${directoryPath} cleared successfully.`);
    } catch (error) {
      Logger.error(`Error while clearing directory ${directoryPath}: ${error}`);
    }
  }
}

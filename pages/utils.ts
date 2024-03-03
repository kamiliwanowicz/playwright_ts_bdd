import fs from "fs";
import LoggerService from "../src/logger"

export class Utils {
  static async clearDirectory(directoryPath: string) {
    try {
      const files = await fs.promises.readdir(directoryPath);
      for (const file of files) {
        await fs.promises.unlink(`${directoryPath}/${file}`);
      }

      LoggerService.logInfo(`Directory ${directoryPath} cleared successfully.`);
    } catch (error) {
      LoggerService.logError(`Error while clearing directory ${directoryPath}: ${error}`);
    }
  }
}

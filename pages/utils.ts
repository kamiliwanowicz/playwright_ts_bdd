import fs from "fs";

export class Utils {
  static async clearDirectory(directoryPath: string) {
    try {
      const files = await fs.promises.readdir(directoryPath);
      for (const file of files) {
        await fs.promises.unlink(`${directoryPath}/${file}`);
      }

      console.log(`Directory ${directoryPath} cleared successfully.`);
    } catch (error) {
      console.error(`Error while clearing directory ${directoryPath}: ${error}`);
    }
  }
}

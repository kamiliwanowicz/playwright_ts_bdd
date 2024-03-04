import winston from "winston";

class LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.simple(),
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: "app.log" })],
    });
  }

  public logInfo(message: string): void {
    this.logger.info(message);
  }

  public logWarning(message: string): void {
    this.logger.warn(message);
  }

  public logError(message: string): void {
    this.logger.error(message);
  }
}

export default new LoggerService();

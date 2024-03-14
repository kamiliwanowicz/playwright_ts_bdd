import winston from "winston";

class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "../test-results/app.log" }),
      ],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warning(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}

export default new Logger();

/**
 * Production Server Logger
 * Provides structured log output with timestamping and error tracking
 */

export type LogLevel = "info" | "warn" | "error" | "debug";

export class ServerLogger {
  private static formatMessage(level: LogLevel, context: string, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const metaStr = data ? ` | Data: ${JSON.stringify(data)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] [${context}]: ${message}${metaStr}`;
  }

  public static info(context: string, message: string, data?: unknown): void {
    console.log(this.formatMessage("info", context, message, data));
  }

  public static warn(context: string, message: string, data?: unknown): void {
    console.warn(this.formatMessage("warn", context, message, data));
  }

  public static error(context: string, message: string, error?: unknown): void {
    const errObj = error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.error(this.formatMessage("error", context, message, errObj));
  }

  public static debug(context: string, message: string, data?: unknown): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.formatMessage("debug", context, message, data));
    }
  }
}

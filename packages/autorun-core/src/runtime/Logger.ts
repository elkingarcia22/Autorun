export interface LoggerConfig {
  debug?: boolean;
  prefix?: string;
  timestamps?: boolean;
}

export class Logger {
  private config: Required<LoggerConfig>;

  constructor(config: LoggerConfig = {}) {
    this.config = {
      debug: config.debug ?? false,
      prefix: config.prefix ?? '[Autorun]',
      timestamps: config.timestamps ?? false,
    };
  }

  /**
   * Log a message at the specified level
   *
   * @param level - Log level
   * @param message - Message to log
   * @param args - Additional arguments
   */
  log(
    level: 'debug' | 'info' | 'warn' | 'error',
    message: string,
    ...args: any[]
  ) {
    if (level === 'debug' && !this.config.debug) {
      return;
    }
    const prefix = this.config.prefix;
    const timestamp = this.config.timestamps
      ? `[${new Date().toISOString()}]`
      : '';
    const fullMessage = `${timestamp}${prefix} ${message}`.trim();
    switch (level) {
      case 'error':
        console.error(fullMessage, ...args);
        break;
      case 'warn':
        console.warn(fullMessage, ...args);
        break;
      case 'info':
        console.log(fullMessage, ...args);
        break;
      case 'debug':
        console.log(fullMessage, ...args);
        break;
    }
  }

  /**
   * Log debug message (only if debug enabled)
   *
   * @param message - Message to log
   * @param args - Additional arguments
   */
  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  /**
   * Log info message
   *
   * @param message - Message to log
   * @param args - Additional arguments
   */
  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  /**
   * Log warning message
   *
   * @param message - Message to log
   * @param args - Additional arguments
   */
  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  /**
   * Log error message
   *
   * @param message - Message to log
   * @param args - Additional arguments
   */
  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }

  /**
   * Enable debug logging
   */
  enableDebug() {
    this.config.debug = true;
  }

  /**
   * Disable debug logging
   */
  disableDebug() {
    this.config.debug = false;
  }

  /**
   * Check if debug is enabled
   */
  isDebugEnabled() {
    return this.config.debug;
  }

  /**
   * Update configuration
   *
   * @param config - Partial configuration to update
   */
  configure(config: LoggerConfig) {
    this.config = { ...this.config, ...config };
  }
}

let globalLogger: Logger | null = null;
export function getLogger(): Logger {
  if (!globalLogger) {
    const debug =
      typeof window !== 'undefined' ? !!(window as any).AUTORUN_DEBUG : false;
    globalLogger = new Logger({ debug });
  }
  return globalLogger;
}

export function configureLogger(config: LoggerConfig) {
  getLogger().configure(config);
}

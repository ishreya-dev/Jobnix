// lib/logger.ts
import pino from 'pino';

// Create a logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // Pretty print in development
  ...(process.env.NODE_ENV !== 'production' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  }),
});

// Create a child logger for specific contexts
export function createLogger(context: string) {
  return logger.child({ context });
}

// Log helper functions - NOW EXPORTED
export const log = {
  info: (message: string, data?: Record<string, any>) => {
    logger.info(data || {}, message);
  },
  error: (message: string, error?: Error | unknown, data?: Record<string, any>) => {
    if (error instanceof Error) {
      logger.error({ ...data, error: error.message, stack: error.stack }, message);
    } else {
      logger.error({ ...data, error }, message);
    }
  },
  warn: (message: string, data?: Record<string, any>) => {
    logger.warn(data || {}, message);
  },
  debug: (message: string, data?: Record<string, any>) => {
    logger.debug(data || {}, message);
  },
};
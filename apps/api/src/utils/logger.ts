/**
 * Production-ready logger using Pino for asynchronous, high-performance logging
 */

import pino from 'pino';
import { ENVIRONMENTS } from '../constants/index.js';

export interface LogContext {
  requestId?: string;
  userId?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  duration?: number;
  userAgent?: string;
  ip?: string;
  [key: string]: unknown;
}

/**
 * Create Pino logger instance with environment-specific configuration
 */
const createLogger = () => {
  const isProduction = process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION;
  
  return pino({
    level: isProduction ? 'info' : 'debug',
    
    // Production: JSON format for structured logging
    // Development: Pretty print for better readability
    transport: isProduction ? undefined : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
    
    // Base fields for all log entries
    base: {
      service: 'rihib-api',
      environment: process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT,
    },
    
    // Format timestamp for production
    timestamp: isProduction ? pino.stdTimeFunctions.isoTime : pino.stdTimeFunctions.epochTime,
    
    // Redact sensitive information
    redact: {
      paths: ['password', 'token', 'key', 'secret', 'authorization'],
      censor: '[REDACTED]',
    },
  });
};

class Logger {
  private pinoLogger = createLogger();
  private requestId: string | null = null;

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  private createChildLogger(context?: LogContext) {
    const logContext = {
      ...context,
      ...(this.requestId && { requestId: this.requestId }),
    };

    return Object.keys(logContext).length > 0
      ? this.pinoLogger.child(logContext)
      : this.pinoLogger;
  }

  info(message: string, context?: LogContext): void {
    const childLogger = this.createChildLogger(context);
    childLogger.info(message);
  }

  warn(message: string, context?: LogContext): void {
    const childLogger = this.createChildLogger(context);
    childLogger.warn(message);
  }

  error(message: string, context?: LogContext, error?: Error): void {
    const childLogger = this.createChildLogger(context);
    
    if (error) {
      childLogger.error({
        err: error,
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
      }, message);
    } else {
      childLogger.error(message);
    }
  }

  debug(message: string, context?: LogContext): void {
    const childLogger = this.createChildLogger(context);
    childLogger.debug(message);
  }

  /**
   * Log with custom level and additional data
   */
  log(level: 'info' | 'warn' | 'error' | 'debug', message: string, data?: Record<string, unknown>): void {
    const childLogger = this.createChildLogger();
    childLogger[level](data, message);
  }

  /**
   * Create a child logger with persistent context
   */
  child(context: LogContext) {
    const childLogger = this.createChildLogger(context);
    return {
      info: (msg: string, ctx?: LogContext) => childLogger.info(ctx, msg),
      warn: (msg: string, ctx?: LogContext) => childLogger.warn(ctx, msg),
      error: (msg: string, ctx?: LogContext, err?: Error) => {
        if (err) {
          childLogger.error({ ...ctx, err }, msg);
        } else {
          childLogger.error(ctx, msg);
        }
      },
      debug: (msg: string, ctx?: LogContext) => childLogger.debug(ctx, msg),
    };
  }
}

export const logger = new Logger();
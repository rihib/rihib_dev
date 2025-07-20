/**
 * Production-ready logger using Pino for asynchronous, high-performance logging
 */
import pino from 'pino';
import { ENVIRONMENTS } from '../constants/index.js';
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
    pinoLogger = createLogger();
    requestId = null;
    setRequestId(requestId) {
        this.requestId = requestId;
    }
    createChildLogger(context) {
        const logContext = {
            ...context,
            ...(this.requestId && { requestId: this.requestId }),
        };
        return Object.keys(logContext).length > 0
            ? this.pinoLogger.child(logContext)
            : this.pinoLogger;
    }
    info(message, context) {
        const childLogger = this.createChildLogger(context);
        childLogger.info(message);
    }
    warn(message, context) {
        const childLogger = this.createChildLogger(context);
        childLogger.warn(message);
    }
    error(message, context, error) {
        const childLogger = this.createChildLogger(context);
        if (error) {
            childLogger.error({
                err: error,
                errorName: error.name,
                errorMessage: error.message,
                stack: error.stack,
            }, message);
        }
        else {
            childLogger.error(message);
        }
    }
    debug(message, context) {
        const childLogger = this.createChildLogger(context);
        childLogger.debug(message);
    }
    /**
     * Log with custom level and additional data
     */
    log(level, message, data) {
        const childLogger = this.createChildLogger();
        childLogger[level](data, message);
    }
    /**
     * Create a child logger with persistent context
     */
    child(context) {
        const childLogger = this.createChildLogger(context);
        return {
            info: (msg, ctx) => childLogger.info(ctx, msg),
            warn: (msg, ctx) => childLogger.warn(ctx, msg),
            error: (msg, ctx, err) => {
                if (err) {
                    childLogger.error({ ...ctx, err }, msg);
                }
                else {
                    childLogger.error(ctx, msg);
                }
            },
            debug: (msg, ctx) => childLogger.debug(ctx, msg),
        };
    }
}
export const logger = new Logger();

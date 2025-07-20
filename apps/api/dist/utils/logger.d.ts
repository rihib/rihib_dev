/**
 * Production-ready logger using Pino for asynchronous, high-performance logging
 */
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
declare class Logger {
    private pinoLogger;
    private requestId;
    setRequestId(requestId: string): void;
    private createChildLogger;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, context?: LogContext, error?: Error): void;
    debug(message: string, context?: LogContext): void;
    /**
     * Log with custom level and additional data
     */
    log(level: 'info' | 'warn' | 'error' | 'debug', message: string, data?: Record<string, unknown>): void;
    /**
     * Create a child logger with persistent context
     */
    child(context: LogContext): {
        info: (msg: string, ctx?: LogContext) => void;
        warn: (msg: string, ctx?: LogContext) => void;
        error: (msg: string, ctx?: LogContext, err?: Error) => void;
        debug: (msg: string, ctx?: LogContext) => void;
    };
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map
/**
 * Production-ready logger with structured logging support
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
export interface LogEntry {
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    timestamp: string;
    context?: LogContext;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}
declare class Logger {
    private requestId;
    setRequestId(requestId: string): void;
    private formatLog;
    private output;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, context?: LogContext, error?: Error): void;
    debug(message: string, context?: LogContext): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map
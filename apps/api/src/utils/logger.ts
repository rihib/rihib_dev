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

class Logger {
  private requestId: string | null = null;

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  private formatLog(level: LogEntry['level'], message: string, context?: LogContext, error?: Error): LogEntry {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    if (context || this.requestId) {
      logEntry.context = {
        ...context,
        ...(this.requestId && { requestId: this.requestId }),
      };
    }

    if (error) {
      logEntry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    }

    return logEntry;
  }

  private output(logEntry: LogEntry): void {
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(logEntry));
    } else {
      const { level, message, timestamp, context, error } = logEntry;
      const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
      
      console.log(`${prefix} ${message}`);
      
      if (context && Object.keys(context).length > 0) {
        console.log('Context:', JSON.stringify(context, null, 2));
      }
      
      if (error) {
        console.error('Error:', error);
      }
    }
  }

  info(message: string, context?: LogContext): void {
    this.output(this.formatLog('info', message, context));
  }

  warn(message: string, context?: LogContext): void {
    this.output(this.formatLog('warn', message, context));
  }

  error(message: string, context?: LogContext, error?: Error): void {
    this.output(this.formatLog('error', message, context, error));
  }

  debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV !== 'production') {
      this.output(this.formatLog('debug', message, context));
    }
  }
}

export const logger = new Logger();
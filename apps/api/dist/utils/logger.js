/**
 * Production-ready logger with structured logging support
 */
class Logger {
    requestId = null;
    setRequestId(requestId) {
        this.requestId = requestId;
    }
    formatLog(level, message, context, error) {
        const logEntry = {
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
    output(logEntry) {
        if (process.env.NODE_ENV === 'production') {
            console.log(JSON.stringify(logEntry));
        }
        else {
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
    info(message, context) {
        this.output(this.formatLog('info', message, context));
    }
    warn(message, context) {
        this.output(this.formatLog('warn', message, context));
    }
    error(message, context, error) {
        this.output(this.formatLog('error', message, context, error));
    }
    debug(message, context) {
        if (process.env.NODE_ENV !== 'production') {
            this.output(this.formatLog('debug', message, context));
        }
    }
}
export const logger = new Logger();

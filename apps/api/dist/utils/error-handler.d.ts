/**
 * Centralized error handling utilities
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly context?: Record<string, unknown>;
    constructor(message: string, statusCode?: number, isOperational?: boolean, context?: Record<string, unknown>);
}
export declare class ValidationError extends AppError {
    constructor(message: string, context?: Record<string, unknown>);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string, context?: Record<string, unknown>);
}
export declare class DatabaseError extends AppError {
    constructor(message: string, context?: Record<string, unknown>);
}
/**
 * Determines if an error is safe to expose to clients
 */
export declare function isOperationalError(error: unknown): boolean;
/**
 * Safely extracts error message for client response
 */
export declare function getClientSafeErrorMessage(error: unknown): string;
/**
 * Extracts HTTP status code from error
 */
export declare function getErrorStatusCode(error: unknown): number;
/**
 * Type guard for Error instances
 */
export declare function isError(error: unknown): error is Error;
/**
 * Type guard for AppError instances
 */
export declare function isAppError(error: unknown): error is AppError;
//# sourceMappingURL=error-handler.d.ts.map
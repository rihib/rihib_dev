/**
 * Centralized error handling utilities
 */
import { logger } from './logger.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../constants/index.js';
export class AppError extends Error {
    statusCode;
    isOperational;
    context;
    constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, isOperational = true, context) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.context = context;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class ValidationError extends AppError {
    constructor(message, context) {
        super(message, HTTP_STATUS.BAD_REQUEST, true, context);
    }
}
export class NotFoundError extends AppError {
    constructor(message = 'Resource not found', context) {
        super(message, HTTP_STATUS.NOT_FOUND, true, context);
    }
}
export class DatabaseError extends AppError {
    constructor(message, context) {
        super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, true, context);
    }
}
/**
 * Determines if an error is safe to expose to clients
 */
export function isOperationalError(error) {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}
/**
 * Safely extracts error message for client response
 */
export function getClientSafeErrorMessage(error) {
    if (error instanceof AppError && error.isOperational) {
        return error.message;
    }
    if (error instanceof Error) {
        logger.error('Unexpected error occurred', {}, error);
        return RESPONSE_MESSAGES.UNKNOWN_ERROR;
    }
    logger.error('Unknown error type', { error });
    return RESPONSE_MESSAGES.UNKNOWN_ERROR;
}
/**
 * Extracts HTTP status code from error
 */
export function getErrorStatusCode(error) {
    if (error instanceof AppError) {
        return error.statusCode;
    }
    return HTTP_STATUS.INTERNAL_SERVER_ERROR;
}
/**
 * Type guard for Error instances
 */
export function isError(error) {
    return error instanceof Error;
}
/**
 * Type guard for AppError instances
 */
export function isAppError(error) {
    return error instanceof AppError;
}

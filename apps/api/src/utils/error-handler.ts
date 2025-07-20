/**
 * Centralized error handling utilities
 */

import { logger } from './logger.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../constants/index.js';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    // Capture stack trace if available (Node.js specific)
    if ('captureStackTrace' in Error && typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, HTTP_STATUS.BAD_REQUEST, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', context?: Record<string, unknown>) {
    super(message, HTTP_STATUS.NOT_FOUND, true, context);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, true, context);
  }
}

/**
 * Determines if an error is safe to expose to clients
 */
export function isOperationalError(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Safely extracts error message for client response
 */
export function getClientSafeErrorMessage(error: unknown): string {
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
export function getErrorStatusCode(error: unknown): number {
  if (error instanceof AppError) {
    return error.statusCode;
  }
  return HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

/**
 * Type guard for Error instances
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Type guard for AppError instances
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
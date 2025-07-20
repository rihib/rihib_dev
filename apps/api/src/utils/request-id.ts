/**
 * Request ID generation and middleware utilities
 */

import { createMiddleware } from 'hono/factory';
import { logger } from './logger.js';

/**
 * Generates a unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Middleware to add request ID to all requests
 */
export const requestIdMiddleware = createMiddleware(async (c, next) => {
  const requestId = c.req.header('x-request-id') || generateRequestId();
  
  // Set request ID in logger context
  logger.setRequestId(requestId);
  
  // Add request ID to response headers
  c.header('x-request-id', requestId);
  
  // Store request ID in context for use in other middlewares/handlers
  c.set('requestId', requestId);
  
  await next();
});
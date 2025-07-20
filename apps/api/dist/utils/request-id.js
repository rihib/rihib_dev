/**
 * Request ID generation and middleware utilities
 */
import { randomUUID } from 'crypto';
import { createMiddleware } from 'hono/factory';
import { logger } from './logger.js';
/**
 * Generates a unique request ID using cryptographically secure UUID
 */
export function generateRequestId() {
    return `req_${randomUUID()}`;
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

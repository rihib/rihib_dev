/**
 * Request ID generation and middleware utilities
 */
/**
 * Generates a unique request ID
 */
export declare function generateRequestId(): string;
/**
 * Middleware to add request ID to all requests
 */
export declare const requestIdMiddleware: import("hono").MiddlewareHandler<any, string, {}>;
//# sourceMappingURL=request-id.d.ts.map
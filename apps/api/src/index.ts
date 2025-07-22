import 'dotenv/config';
import { Hono } from 'hono';
import type { Context } from 'hono';
import { cors } from 'hono/cors';
import { logger as honoLogger } from 'hono/logger';
import { serve } from '@hono/node-server';
import { articleRoutes } from './routes/index.js';
import {
  SERVER_PORTS,
  ENVIRONMENTS,
  ALLOWED_ORIGINS,
  ALLOWED_METHODS,
  ALLOWED_HEADERS,
  HTTP_STATUS,
  RESPONSE_MESSAGES,
} from './constants/index.js';
import {
  logger,
  requestIdMiddleware,
  getClientSafeErrorMessage,
  getErrorStatusCode,
  isValidEnvironment,
  AppError
} from './utils/index.js';

// Define the context variables type
type ContextVariables = {
  requestId: string;
};

const app = new Hono<{ Variables: ContextVariables }>();

// Add request ID middleware first
app.use('*', requestIdMiddleware);

// Add Hono's built-in logger
app.use('*', honoLogger());

/**
 * Gets allowed origins based on current environment
 */
const getAllowedOrigins = () => {
  const env = process.env.NODE_ENV;
  
  if (!isValidEnvironment(env)) {
    logger.warn('Invalid NODE_ENV, defaulting to development', { env });
    return ALLOWED_ORIGINS[ENVIRONMENTS.DEVELOPMENT];
  }
  
  if (env === ENVIRONMENTS.PRODUCTION) {
    return ALLOWED_ORIGINS[ENVIRONMENTS.PRODUCTION];
  }
  
  return ALLOWED_ORIGINS[ENVIRONMENTS.DEVELOPMENT];
};

app.use('*', cors({
  origin: getAllowedOrigins(),
  allowMethods: ALLOWED_METHODS,
  allowHeaders: ALLOWED_HEADERS,
}));

/**
 * Error handling middleware
 */
const errorHandler = async (c: Context<{ Variables: ContextVariables }>, next: () => Promise<void>) => {
  try {
    await next();
  } catch (error) {
    const statusCode = getErrorStatusCode(error);
    const message = getClientSafeErrorMessage(error);
    const requestId = c.get('requestId');
    
    logger.error('Request failed', {
      requestId,
      endpoint: c.req.path,
      method: c.req.method,
      statusCode,
    }, error instanceof Error ? error : undefined);
    
    return new Response(JSON.stringify({ error: message }), {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Apply error handling middleware
app.use('*', errorHandler);

// RPC-style routes
const api = app
  .basePath('/api')
  .get('/', (c) => {
    return c.json({ message: RESPONSE_MESSAGES.SERVER_RUNNING });
  })
  .route('/articles', articleRoutes);

// Health check endpoint
app.get('/', (c) => {
  return c.json({ message: 'Rihib API Server' });
});

// Export API type for RPC client
export type ApiType = typeof api;

// Re-export types for frontend consumption
export type {
  Article,
  ArticleType,
  Locale,
  ArticleParams,
  LocaleParams,
  ArticlesResponse,
  ErrorResponse,
  CreateArticle,
  UpdateArticle
} from './schemas.js';

const port = Number(process.env.PORT) || SERVER_PORTS.DEFAULT;

logger.info('Starting API server', {
  port,
  environment: process.env.NODE_ENV || 'development',
  nodeVersion: process.version
});

serve({
  fetch: app.fetch,
  port
});

logger.info('API server is running', { port });
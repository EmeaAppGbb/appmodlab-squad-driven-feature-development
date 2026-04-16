import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { config } from './config';
import { databasePlugin } from './plugins/database';
import { redisPlugin } from './plugins/redis';
import { productRoutes } from './modules/products/product.routes';
import { userRoutes } from './modules/users/user.routes';
import { orderRoutes } from './modules/orders/order.routes';
import { reviewRoutes } from './modules/reviews/review.routes';

const fastify = Fastify({
  logger: {
    level: config.logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

async function start() {
  try {
    await fastify.register(cors, {
      origin: true,
    });

    await fastify.register(jwt, {
      secret: config.jwtSecret,
    });

    await fastify.register(databasePlugin);
    await fastify.register(redisPlugin);

    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    await fastify.register(productRoutes, { prefix: '/api/products' });
    await fastify.register(userRoutes, { prefix: '/api/users' });
    await fastify.register(orderRoutes, { prefix: '/api/orders' });
    await fastify.register(reviewRoutes, { prefix: '/api' });

    await fastify.listen({ port: config.port, host: '0.0.0.0' });
    fastify.log.info(`ShopSmart API listening on port ${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

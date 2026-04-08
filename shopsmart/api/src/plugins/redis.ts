import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import Redis from 'ioredis';
import { config } from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    redis: Redis;
  }
}

async function redisPlugin(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    lazyConnect: true,
  });

  redis.on('error', (err) => {
    fastify.log.error('Redis error', err);
  });

  try {
    await redis.connect();
    fastify.log.info('Redis connected successfully');
  } catch (err) {
    fastify.log.error('Failed to connect to Redis', err);
    throw err;
  }

  fastify.decorate('redis', redis);

  fastify.addHook('onClose', async () => {
    await redis.quit();
    fastify.log.info('Redis connection closed');
  });
}

export default fp(redisPlugin);
export { redisPlugin };

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { Pool } from 'pg';
import { config } from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    db: Pool;
  }
}

async function databasePlugin(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const pool = new Pool(config.database);

  pool.on('error', (err) => {
    fastify.log.error('Unexpected database error', err);
  });

  try {
    const client = await pool.connect();
    fastify.log.info('Database connected successfully');
    client.release();
  } catch (err) {
    fastify.log.error('Failed to connect to database', err);
    throw err;
  }

  fastify.decorate('db', pool);

  fastify.addHook('onClose', async () => {
    await pool.end();
    fastify.log.info('Database connection closed');
  });
}

export default fp(databasePlugin);
export { databasePlugin };

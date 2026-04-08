import { FastifyInstance } from 'fastify';
import { UserService } from './user.service';
import { RegisterInput, LoginInput, UpdateUserInput } from './user.types';
import { authenticate, getUserIdFromToken } from '../../utils/auth';
import { config } from '../../config';

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService(fastify.db);

  fastify.post('/register', async (request, reply) => {
    const input = request.body as RegisterInput;
    const user = await userService.register(input);
    
    const token = fastify.jwt.sign(
      { userId: user.id, email: user.email },
      { expiresIn: config.jwtExpiresIn }
    );

    reply.code(201);
    return { user, token };
  });

  fastify.post('/login', async (request, reply) => {
    const input = request.body as LoginInput;
    const user = await userService.login(input);
    
    const token = fastify.jwt.sign(
      { userId: user.id, email: user.email },
      { expiresIn: config.jwtExpiresIn }
    );

    const publicUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };

    return { user: publicUser, token };
  });

  fastify.get('/me', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = getUserIdFromToken(request);
    const user = await userService.getUserById(userId);
    return user;
  });

  fastify.put('/me', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = getUserIdFromToken(request);
    const input = request.body as UpdateUserInput;
    const user = await userService.updateUser(userId, input);
    return user;
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: number };
    const user = await userService.getUserById(id);
    return user;
  });
}

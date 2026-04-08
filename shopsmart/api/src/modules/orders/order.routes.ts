import { FastifyInstance } from 'fastify';
import { OrderService } from './order.service';
import { CreateOrderInput, UpdateOrderStatusInput } from './order.types';
import { authenticate, getUserIdFromToken } from '../../utils/auth';

export async function orderRoutes(fastify: FastifyInstance) {
  const orderService = new OrderService(fastify.db);

  fastify.post('/', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = getUserIdFromToken(request);
    const input = request.body as CreateOrderInput;
    const order = await orderService.createOrder(userId, input);
    reply.code(201);
    return order;
  });

  fastify.get('/', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = getUserIdFromToken(request);
    const { page, limit } = request.query as { page?: number; limit?: number };
    const result = await orderService.getUserOrders(userId, page, limit);
    return result;
  });

  fastify.get('/:id', { onRequest: [authenticate] }, async (request, reply) => {
    const userId = getUserIdFromToken(request);
    const { id } = request.params as { id: number };
    const order = await orderService.getOrderById(id, userId);
    return order;
  });

  fastify.patch('/:id/status', { onRequest: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: number };
    const input = request.body as UpdateOrderStatusInput;
    const order = await orderService.updateOrderStatus(id, input);
    return order;
  });
}

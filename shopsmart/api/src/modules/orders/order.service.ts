import { Pool } from 'pg';
import { Order, OrderWithItems, CreateOrderInput, UpdateOrderStatusInput, OrderStatus, OrderItemWithProduct } from './order.types';
import { NotFoundError, ValidationError } from '../../utils/errors';

export class OrderService {
  constructor(private db: Pool) {}

  async createOrder(userId: number, input: CreateOrderInput): Promise<OrderWithItems> {
    if (!input.items || input.items.length === 0) {
      throw new ValidationError('Order must contain at least one item');
    }

    const client = await this.db.connect();

    try {
      await client.query('BEGIN');

      let totalAmount = 0;
      const orderItems: OrderItemWithProduct[] = [];

      for (const item of input.items) {
        const productResult = await client.query(
          'SELECT id, name, price, stock, category FROM products WHERE id = $1',
          [item.product_id]
        );

        if (productResult.rows.length === 0) {
          throw new NotFoundError(`Product with id ${item.product_id} not found`);
        }

        const product = productResult.rows[0];

        if (product.stock < item.quantity) {
          throw new ValidationError(
            `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`
          );
        }

        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );

        totalAmount += product.price * item.quantity;

        orderItems.push({
          id: 0,
          order_id: 0,
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price,
          created_at: new Date(),
          product_name: product.name,
          product_category: product.category,
        });
      }

      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [userId, totalAmount, OrderStatus.PENDING]
      );

      const order = orderResult.rows[0] as Order;

      for (const item of orderItems) {
        const itemResult = await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [order.id, item.product_id, item.quantity, item.price]
        );
        item.id = itemResult.rows[0].id;
        item.order_id = order.id;
      }

      await client.query('COMMIT');

      return {
        ...order,
        items: orderItems,
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async getOrderById(orderId: number, userId?: number): Promise<OrderWithItems> {
    const orderQuery = userId
      ? 'SELECT * FROM orders WHERE id = $1 AND user_id = $2'
      : 'SELECT * FROM orders WHERE id = $1';
    
    const orderParams = userId ? [orderId, userId] : [orderId];
    const orderResult = await this.db.query(orderQuery, orderParams);

    if (orderResult.rows.length === 0) {
      throw new NotFoundError(`Order with id ${orderId} not found`);
    }

    const order = orderResult.rows[0] as Order;

    const itemsResult = await this.db.query(
      `SELECT oi.*, p.name as product_name, p.category as product_category
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [orderId]
    );

    return {
      ...order,
      items: itemsResult.rows as OrderItemWithProduct[],
    };
  }

  async getUserOrders(userId: number, page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    const countResult = await this.db.query(
      'SELECT COUNT(*) FROM orders WHERE user_id = $1',
      [userId]
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const ordersResult = await this.db.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );

    const orders: OrderWithItems[] = [];

    for (const order of ordersResult.rows) {
      const itemsResult = await this.db.query(
        `SELECT oi.*, p.name as product_name, p.category as product_category
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );

      orders.push({
        ...order,
        items: itemsResult.rows as OrderItemWithProduct[],
      });
    }

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateOrderStatus(orderId: number, input: UpdateOrderStatusInput): Promise<Order> {
    const result = await this.db.query(
      `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [input.status, orderId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError(`Order with id ${orderId} not found`);
    }

    return result.rows[0] as Order;
  }
}

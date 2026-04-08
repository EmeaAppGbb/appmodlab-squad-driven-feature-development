export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: Date;
}

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[];
}

export interface OrderItemWithProduct extends OrderItem {
  product_name: string;
  product_category: string;
}

export interface CreateOrderInput {
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

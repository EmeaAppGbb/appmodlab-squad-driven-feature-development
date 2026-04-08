import { Pool } from 'pg';
import { Product, CreateProductInput, UpdateProductInput, ProductQueryParams } from './product.types';
import { NotFoundError } from '../../utils/errors';

export class ProductService {
  constructor(private db: Pool) {}

  async getProducts(params: ProductQueryParams) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE 1=1';
    const values: any[] = [];
    let paramCount = 0;

    if (params.category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      values.push(params.category);
    }

    if (params.search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${params.search}%`);
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await this.db.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    values.push(limit, offset);

    const result = await this.db.query(query, values);

    return {
      products: result.rows as Product[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: number): Promise<Product> {
    const result = await this.db.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    return result.rows[0] as Product;
  }

  async createProduct(input: CreateProductInput): Promise<Product> {
    const result = await this.db.query(
      `INSERT INTO products (name, description, price, category, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [input.name, input.description, input.price, input.category, input.stock, input.image_url]
    );

    return result.rows[0] as Product;
  }

  async updateProduct(id: number, input: UpdateProductInput): Promise<Product> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    if (input.name !== undefined) {
      paramCount++;
      updates.push(`name = $${paramCount}`);
      values.push(input.name);
    }
    if (input.description !== undefined) {
      paramCount++;
      updates.push(`description = $${paramCount}`);
      values.push(input.description);
    }
    if (input.price !== undefined) {
      paramCount++;
      updates.push(`price = $${paramCount}`);
      values.push(input.price);
    }
    if (input.category !== undefined) {
      paramCount++;
      updates.push(`category = $${paramCount}`);
      values.push(input.category);
    }
    if (input.stock !== undefined) {
      paramCount++;
      updates.push(`stock = $${paramCount}`);
      values.push(input.stock);
    }
    if (input.image_url !== undefined) {
      paramCount++;
      updates.push(`image_url = $${paramCount}`);
      values.push(input.image_url);
    }

    if (updates.length === 0) {
      return this.getProductById(id);
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await this.db.query(
      `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }

    return result.rows[0] as Product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.db.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
  }
}

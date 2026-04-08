import { Pool } from 'pg';
import crypto from 'crypto';
import { User, UserPublic, RegisterInput, LoginInput, UpdateUserInput } from './user.types';
import { NotFoundError, ValidationError, UnauthorizedError } from '../../utils/errors';

export class UserService {
  constructor(private db: Pool) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private toPublicUser(user: User): UserPublic {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };
  }

  async register(input: RegisterInput): Promise<UserPublic> {
    const existingUser = await this.db.query('SELECT id FROM users WHERE email = $1', [input.email]);
    
    if (existingUser.rows.length > 0) {
      throw new ValidationError('Email already registered');
    }

    const passwordHash = this.hashPassword(input.password);
    
    const result = await this.db.query(
      `INSERT INTO users (email, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [input.email, passwordHash, input.first_name, input.last_name]
    );

    return this.toPublicUser(result.rows[0] as User);
  }

  async login(input: LoginInput): Promise<User> {
    const passwordHash = this.hashPassword(input.password);
    
    const result = await this.db.query(
      'SELECT * FROM users WHERE email = $1 AND password_hash = $2',
      [input.email, passwordHash]
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedError('Invalid email or password');
    }

    return result.rows[0] as User;
  }

  async getUserById(id: number): Promise<UserPublic> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return this.toPublicUser(result.rows[0] as User);
  }

  async updateUser(id: number, input: UpdateUserInput): Promise<UserPublic> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 0;

    if (input.first_name !== undefined) {
      paramCount++;
      updates.push(`first_name = $${paramCount}`);
      values.push(input.first_name);
    }
    if (input.last_name !== undefined) {
      paramCount++;
      updates.push(`last_name = $${paramCount}`);
      values.push(input.last_name);
    }
    if (input.email !== undefined) {
      const existingUser = await this.db.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [input.email, id]
      );
      if (existingUser.rows.length > 0) {
        throw new ValidationError('Email already in use');
      }
      paramCount++;
      updates.push(`email = $${paramCount}`);
      values.push(input.email);
    }

    if (updates.length === 0) {
      return this.getUserById(id);
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await this.db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return this.toPublicUser(result.rows[0] as User);
  }
}

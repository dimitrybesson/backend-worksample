import pool from '../config/database';
import User from '../models/user';

class UserRepository {
  async createUser(name: string, email: string) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';

    const result = await pool.query(query, [name, email]);
    return result.rows[0] as User;
  }

  async getUsers(order?: 'ASC' | 'DESC') {
    const query = `SELECT * FROM users ORDER BY created_at ${order || 'ASC'}`;

    const result = await pool.query(query);
    return result.rows as User[];
  }

  async getUserByEmail(email: string) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE email=$1';

    const result = await pool.query(query, [email])
    return result.rows[0] as User;
  }

}

export default new UserRepository();
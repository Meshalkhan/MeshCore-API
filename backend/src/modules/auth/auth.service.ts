import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../../infrastructure/db/pool';
import { env } from '../../core/config/env';
import { AppError } from '../../core/errors/app-error';
export class AuthService {
  async login(email: string, password: string) {
    const result = await pool.query('SELECT id, email, password_hash, role, tenant_id FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) throw new AppError('Invalid credentials', 401);
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new AppError('Invalid credentials', 401);
    const expiresIn = env.jwtExpiresIn as jwt.SignOptions['expiresIn'];
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role, tenantId: user.tenant_id },
      env.jwtSecret,
      { expiresIn }
    );
    return { accessToken: token, user: { id: user.id, email: user.email, role: user.role, tenantId: user.tenant_id } };
  }
}

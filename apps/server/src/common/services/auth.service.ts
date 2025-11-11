import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export default class AuthService {
  private readonly saltRounds = 12;
  private readonly jwtSecret = process.env.JWT_SECRET;

  async createHash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validatePassword(plain: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plain, hashed);
  }

  generateToken(userId: number, email: string, isAdmin: boolean): string {
    return sign({ userId, email, isAdmin }, this.jwtSecret!, {
      expiresIn: '1h',
    });
  }

  verifyToken(token: string): string | JwtPayload {
    try {
      return verify(token, this.jwtSecret!);
    } catch {
      throw new Error('Invalid token');
    }
  }
}

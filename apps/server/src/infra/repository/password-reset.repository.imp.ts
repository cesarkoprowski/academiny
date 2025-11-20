import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PasswordReset from 'common/entities/password-reset/password-reset.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class PasswordResetRepository {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly repository: Repository<PasswordReset>,
  ) {}

  async create(input: Partial<PasswordReset>): Promise<PasswordReset> {
    return await this.repository.save(input);
  }

  async findByEmailAndCode(
    email: string,
    code: string,
  ): Promise<PasswordReset | null> {
    return await this.repository.findOne({
      where: { email, code, used: false },
    });
  }

  async markAsUsed(id: number): Promise<void> {
    await this.repository.update(id, { used: true });
  }

  async deleteExpired(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('expiresAt < :now', { now: new Date() })
      .execute();
  }

  async findValidCodeByEmail(email: string): Promise<PasswordReset | null> {
    return await this.repository.findOne({
      where: {
        email,
        used: false,
      },
      order: { createdAt: 'DESC' },
    });
  }
}

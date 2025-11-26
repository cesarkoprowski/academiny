import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Notification from 'common/entities/notification/notification.entity';
import { IRepository } from 'common/interface/repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export default class NotificationRepository
  implements IRepository<Notification>
{
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(input: Partial<Notification>): Promise<Notification> {
    return await this.notificationRepo.save(input);
  }
  async getById(input: number): Promise<Notification | null> {
    return await this.notificationRepo.findOneBy({ id: input });
  }
  async getAllUser(userId: number): Promise<Notification[]> {
    return await this.notificationRepo.find({
      order: { id: 'DESC' },
      where: {
        destinationUserId: userId,
      },
    });
  }
  async getAll(): Promise<Notification[]> {
    return await this.notificationRepo.find({ order: { id: 'DESC' } });
  }
  delete(input: number): Promise<boolean> {
    return this.notificationRepo
      .delete(input)
      .then((result) => result.affected! > 0);
  }
  async update(
    id: number,
    input: Partial<Notification>,
  ): Promise<Notification | null> {
    const notification = await this.notificationRepo.findOneBy({ id });

    if (!notification) {
      return Promise.resolve(null);
    }

    return this.notificationRepo.save({ ...notification, ...input });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';
import { IUseCase } from 'common/interface/use-case.interface';

@Injectable()
export default class ReadAllNotificationUC implements IUseCase<number, void> {
  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(userId: number): Promise<void> {
    const notificationsUser =
      await this.notificationRepository.getAllUser(userId);

    for (const notification of notificationsUser) {
      if (!notification.read) {
        await this.notificationRepository.update(notification.id, {
          read: true,
        });
      }
    }
  }
}

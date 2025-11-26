import { Inject, Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';
import { IUseCase } from 'common/interface/use-case.interface';
import SendNotificationRequestDTO from '../dto/request/send-notification.request.dto';

@Injectable()
export default class SendNotificationUC
  implements IUseCase<SendNotificationRequestDTO, void>
{
  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(input: SendNotificationRequestDTO): Promise<void> {
    await this.notificationRepository.create(input);
  }
}

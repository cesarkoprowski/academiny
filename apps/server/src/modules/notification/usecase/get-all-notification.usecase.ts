import { Inject, Injectable } from '@nestjs/common';
import NotificationRepository from '../repository/notification.repository';
import { IUseCase } from 'common/interface/use-case.interface';
import GetAllNotificationResponseDTO from '../dto/response/get-all-notification.dto';

@Injectable()
export default class GetAllNotificationUC
  implements IUseCase<number, GetAllNotificationResponseDTO[]>
{
  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(input: number): Promise<GetAllNotificationResponseDTO[]> {
    return await this.notificationRepository.getAllUser(input);
  }
}

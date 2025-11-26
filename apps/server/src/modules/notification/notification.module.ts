import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Notification from 'common/entities/notification/notification.entity';
import SendNotificationUC from './usecase/send-notification.usecase';
import GetAllNotificationUC from './usecase/get-all-notification.usecase';
import NotificationRepository from './repository/notification.repository';
import ReadAllNotificationUC from './usecase/read-all-notification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [
    NotificationRepository,
    SendNotificationUC,
    GetAllNotificationUC,
    ReadAllNotificationUC,
  ],
  exports: [
    SendNotificationUC,
    GetAllNotificationUC,
    NotificationRepository,
    ReadAllNotificationUC,
  ],
})
export default class NotificationModule {}

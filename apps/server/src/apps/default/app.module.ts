import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Entities } from 'common/entities/index.entity';
import UserModule from 'modules/user-account/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.example',
    }),
    UserModule,

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'academiny',
        entities: Entities,
        synchronize: true,
        autoLoadEntities: true,
        ssl:
          process.env.SSL_ENABLED === 'true'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { Entities } from 'common/entities/index.entity';
import UserModule from 'modules/user/user.module';
import { CursoModule } from 'modules/curso/curso.module';
import { TypeOrmExceptionFilter } from 'common/error/filter/typeorm.exeception.filter';
import AdminModule from 'modules/admin/admin.module';
import { DisciplinaModule } from 'modules/disciplina/disciplina.module';
import { AtividadeExtensaoModule } from 'modules/atividade/atividade.module';
import AuthGuard from 'common/security/auth/auth.guard';
import AuthService from 'common/services/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    CursoModule,
    AdminModule,
    DisciplinaModule,
    AtividadeExtensaoModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        schema: 'public',
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AppModule {}

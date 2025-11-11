import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/default/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET NOT FOUND');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

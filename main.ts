import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: false,
  });

  app.listen(3000, 'localhost');
}
bootstrap();

import { Module } from '@nestjs/common';
import { CornalShareModule } from '../modules/shared.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [CornalShareModule],
})
export class AppModule {}

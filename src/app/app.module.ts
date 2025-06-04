import { Module } from '@nestjs/common';
import { ShareModule } from '../modules/shared.module';

@Module({
  controllers: [],
  imports: [ShareModule],
})
export class AppModule {}

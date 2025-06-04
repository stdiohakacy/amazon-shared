import { Module } from '@nestjs/common';
import { ShareModule } from '../modules/shared.module';

@Module({
  imports: [ShareModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ShareModule } from 'src/modules/shared.module';

@Module({
  imports: [ShareModule],
})
export class AppModule {}

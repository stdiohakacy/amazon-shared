import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { HelperModule } from './helpers/helper.module';

@Global()
@Module({
  imports: [LoggerModule, HelperModule.forRoot()],
})
export class ShareModule {}

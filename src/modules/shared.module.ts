import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { HelperModule } from './helpers/helper.module';
import { AppMiddlewareModule } from 'src/app/app.middleware.module';

@Global()
@Module({
  imports: [AppMiddlewareModule, LoggerModule, HelperModule.forRoot()],
})
export class ShareModule {}

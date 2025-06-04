import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { HelperModule } from './helpers/helper.module';
import { AppMiddlewareModule } from '../app/app.middleware.module';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';
import { MessageModule } from './message/message.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    HelperModule.forRoot(),
    MessageModule.forRoot(),
    AppMiddlewareModule,
    LoggerModule,
  ],
})
export class ShareModule {}

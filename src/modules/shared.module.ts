import { Module, Global } from '@nestjs/common';
import { CornalLoggerModule } from './logger/logger.module';
import { CornalHelperModule } from './helpers/helper.module';
import { CornalAppMiddlewareModule } from '../app/app.middleware.module';
import { ConfigModule } from '@nestjs/config';
import configs from '../configs';

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
    CornalHelperModule.forRoot(),
    CornalAppMiddlewareModule,
    CornalLoggerModule,
  ],
})
export class CornalShareModule {}

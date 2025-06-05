import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppCustomLanguageMiddleware } from './middlewares/app.custom-language.middleware';
@Module({})
export class CornalAppMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AppCustomLanguageMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

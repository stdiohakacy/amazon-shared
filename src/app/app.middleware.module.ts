import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppCustomLanguageMiddleware } from './middlewares/app.custom-language.middleware';
@Module({
  providers: [],
  imports: [],
})
export class AppMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppCustomLanguageMiddleware).forRoutes('*wildcard');
  }
}

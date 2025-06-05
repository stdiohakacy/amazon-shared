import { DynamicModule, Module } from '@nestjs/common';
import { IsPasswordConstraint } from './validations/request.is-password.validation';

@Module({})
export class CornalRequestModule {
  static forRoot(): DynamicModule {
    return {
      module: CornalRequestModule,
      providers: [IsPasswordConstraint],
    };
  }
}

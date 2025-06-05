import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  version: VERSION_NEUTRAL,
  path: '/app',
})
export class AppController {
  constructor() {}

  @Get('/app')
  async app() {
    return {
      message: 'Welcome to the NestJS Application!',
      version: '1.0.0',
      status: 'Running',
    };
  }
}

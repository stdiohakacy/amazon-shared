import { Injectable } from '@nestjs/common';
import { Logger as PinoLogger } from 'nestjs-pino';
import { LoggerPort } from './interfaces/logger.port';

@Injectable()
export class PinoLoggerAdapter implements LoggerPort {
  constructor(private readonly logger: PinoLogger) {}

  info(message: string, context?: string) {
    this.logger.log(message, { context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { context, trace });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}

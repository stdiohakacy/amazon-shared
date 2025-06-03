import { HttpStatus } from '@nestjs/common';
import { MessageOptionsPropertiesInterface } from '../../message/interfaces/message.interface';

export interface ResponseCustomPropertyInterface {
  statusCode?: number;
  message?: string;
  httpStatus?: HttpStatus;
  messageProperties?: MessageOptionsPropertiesInterface;
}

export interface ResponseMetadataInterface {
  [key: string]: unknown;
  customProperty?: ResponseCustomPropertyInterface;
}

export interface ResponseInterface<T = void> {
  _metadata?: ResponseMetadataInterface;
  data?: T;
}

export interface ResponseOptionsInterface {
  messageProperties?: MessageOptionsPropertiesInterface;
  // cached?: ResponseCacheOptionsInterface | boolean;
}

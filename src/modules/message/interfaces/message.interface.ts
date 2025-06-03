import { ValidationError } from '@nestjs/common';

export type MessageOptionsPropertiesInterface = Record<string, string | number>;

export interface MessageErrorOptionsInterface {
  readonly customLanguage?: string;
}

export interface MessageSetOptionsInterface
  extends MessageErrorOptionsInterface {
  readonly properties?: MessageOptionsPropertiesInterface;
}

export interface MessageValidationErrorInterface {
  property: string;
  message: string;
}

export interface MessageValidationImportErrorParamInterface {
  sheetName?: string;
  row: number;
  errors: ValidationError[];
}

export interface IMessageValidationImportError
  extends Omit<MessageValidationImportErrorParamInterface, 'error'> {
  errors: MessageValidationErrorInterface[];
}

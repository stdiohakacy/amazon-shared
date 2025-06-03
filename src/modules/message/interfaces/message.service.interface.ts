import { ValidationError } from '@nestjs/common';
import {
  MessageErrorOptionsInterface,
  MessageSetOptionsInterface,
  MessageValidationErrorInterface,
  MessageValidationImportErrorParamInterface,
} from './message.interface';

export interface MessageServiceInterface {
  filterLanguage(customLanguage: string): string[];
  setMessage(path: string, options?: MessageSetOptionsInterface): string;
  setValidationMessage(
    errors: ValidationError[],
    options?: MessageErrorOptionsInterface,
  ): MessageValidationErrorInterface[];
  setValidationImportMessage(
    errors: MessageValidationImportErrorParamInterface[],
    options?: MessageErrorOptionsInterface,
  ): MessageValidationImportErrorParamInterface[];
}

import { Injectable, ValidationError } from '@nestjs/common';
import {
  MessageErrorOptionsInterface,
  MessageServiceInterface,
  MessageSetOptionsInterface,
  MessageValidationErrorInterface,
  MessageValidationImportErrorParamInterface,
} from '../interfaces';
import { ENUM_MESSAGE_LANGUAGE } from '../enums/message.enum';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { HelperArrayService } from '../../helpers/services/helper.array.service';

@Injectable()
export class MessageService implements MessageServiceInterface {
  private readonly defaultLanguage: ENUM_MESSAGE_LANGUAGE;
  private readonly availableLanguage: ENUM_MESSAGE_LANGUAGE[];
  private readonly debug: boolean;

  constructor(
    private readonly i18n: I18nService,
    private readonly configService: ConfigService,
    private readonly helperArrayService: HelperArrayService,
  ) {
    this.defaultLanguage =
      this.configService.get<ENUM_MESSAGE_LANGUAGE>('message.language');
    this.availableLanguage = this.configService.get<ENUM_MESSAGE_LANGUAGE[]>(
      'message.availableLanguage',
    );
    this.debug = this.configService.get<boolean>('debug.enable');
  }

  filterLanguage(customLanguage: string): string[] {
    return this.helperArrayService.getIntersection(
      [customLanguage],
      this.availableLanguage,
    );
  }

  setMessage(path: string, options?: MessageSetOptionsInterface): string {
    const language: string = options?.customLanguage
      ? this.filterLanguage(options.customLanguage)[0]
      : this.defaultLanguage;

    return this.i18n.translate(path, {
      lang: language,
      args: options?.properties,
      debug: this.debug,
    }) as any;
  }

  setValidationMessage(
    errors: ValidationError[],
    options?: MessageErrorOptionsInterface,
  ): MessageValidationErrorInterface[] {
    const messages: MessageValidationErrorInterface[] = [];
    for (const error of errors) {
      const property = error.property;
      const constraints: string[] = Object.keys(error.constraints ?? []);

      if (!constraints.length) {
        messages.push({
          property,
          message: this.setMessage('request.unknownMessage', {
            customLanguage: options?.customLanguage,
            properties: { property, value: error.value },
          }),
        });

        continue;
      }

      for (const constraint of constraints) {
        const message = this.setMessage(`request.${constraint}`, {
          customLanguage: options?.customLanguage,
          properties: { property, value: error.value },
        });

        messages.push({ property, message: message });
      }
    }

    return messages;
  }

  setValidationImportMessage(
    errors: MessageValidationImportErrorParamInterface[],
    options?: MessageErrorOptionsInterface,
  ): MessageValidationImportErrorParamInterface[] {
    return errors.map((val) => ({
      row: val.row,
      sheetName: val.sheetName,
      errors: this.setValidationMessage(val.errors, options),
    }));
  }
}

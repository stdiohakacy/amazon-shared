import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseDto, ResponseMetadataDto } from '../dtos/response.dto';
import { Reflector } from '@nestjs/core';
import { HelperDateService } from '../../helpers/services/helper.date.service';
import { ConfigService } from '@nestjs/config';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { RequestAppInterface } from '../../request/interfaces/request.interface';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
} from '../constants/response.constant';
import { MessageOptionsPropertiesInterface } from '../../message/interfaces/message.interface';
import { Response } from 'express';
import { ENUM_MESSAGE_LANGUAGE } from '../../message/enums/message.enum';
import { ResponseInterface } from '../interfaces/response.interface';
import { MessageService } from '../../message/services/message.service';

@Injectable()
export class ResponseInterceptor
  implements NestInterceptor<Promise<ResponseDto>>
{
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly helperDateService: HelperDateService,
    private readonly messageService: MessageService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Promise<ResponseDto>>,
  ): Observable<Promise<ResponseDto>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (res: Promise<ResponseDto>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const response: Response = ctx.getResponse();
          const request: RequestAppInterface =
            ctx.getRequest<RequestAppInterface>();

          let messagePath: string = this.reflector.get<string>(
            RESPONSE_MESSAGE_PATH_META_KEY,
            context.getHandler(),
          );

          let messageProperties: MessageOptionsPropertiesInterface =
            this.reflector.get<MessageOptionsPropertiesInterface>(
              RESPONSE_MESSAGE_PROPERTIES_META_KEY,
              context.getHandler(),
            );

          // set default response
          let httpStatus: HttpStatus = response.statusCode;
          let statusCode: number = response.statusCode;
          let data: Record<string, unknown> = undefined;

          // metadata
          const today = this.helperDateService.create();
          const xPath = request.path;
          const xLanguage: string =
            request.__language ??
            this.configService.get<ENUM_MESSAGE_LANGUAGE>('message.language');
          const xTimestamp = this.helperDateService.getTimestamp(today);
          const xTimezone = this.helperDateService.getZone(today);
          const xVersion =
            request.__version ??
            this.configService.get<string>('app.urlVersion.version');
          const xRepoVersion = this.configService.get<string>('app.version');

          let metadata: ResponseMetadataDto = {
            language: xLanguage,
            timestamp: xTimestamp,
            timezone: xTimezone,
            path: xPath,
            version: xVersion,
            repoVersion: xRepoVersion,
          };

          // response
          const responseData = (await res) as ResponseInterface<
            Record<string, unknown>
          >;

          if (responseData) {
            const { _metadata } = responseData;
            data = responseData.data;

            httpStatus = _metadata?.customProperty?.httpStatus ?? httpStatus;
            statusCode = _metadata?.customProperty?.statusCode ?? statusCode;
            messagePath = _metadata?.customProperty?.message ?? messagePath;
            messageProperties =
              _metadata?.customProperty?.messageProperties ?? messageProperties;

            delete _metadata?.customProperty;

            metadata = {
              ...metadata,
              ..._metadata,
            };

            const message: string = this.messageService.setMessage(
              messagePath,
              {
                customLanguage: xLanguage,
                properties: messageProperties,
              },
            );

            response.setHeader('x-custom-lang', xLanguage);
            response.setHeader('x-timestamp', xTimestamp);
            response.setHeader('x-timezone', xTimezone);
            response.setHeader('x-version', xVersion);
            response.setHeader('x-repo-version', xRepoVersion);
            response.status(httpStatus);

            return {
              statusCode,
              message,
              _metadata: metadata,
              data,
            };
          }
        }),
      );
    }
  }
}

import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import { ENUM_DOC_REQUEST_BODY_TYPE } from '../enums/doc.enum';
import { ENUM_FILE_MIME } from '../../file/enums/file.enum';

export interface DocOptionsInterface {
  summary?: string;
  operation?: string;
  deprecated?: boolean;
  description?: string;
}

export interface DocOfOptionsInterface<T = unknown> {
  statusCode: number;
  messagePath: string;
  dto?: ClassConstructor<T>;
}

export interface DocDefaultOptionsInterface<T = unknown>
  extends DocOfOptionsInterface<T> {
  httpStatus: HttpStatus;
}

export interface DocAuthOptionsInterface {
  jwtAccessToken?: boolean;
  jwtRefreshToken?: boolean;
  xApiKey?: boolean;
  google?: boolean;
  apple?: boolean;
}

export interface DocRequestOptionsInterface<T = unknown> {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
  dto?: ClassConstructor<T>;
}

export type DocRequestFileOptionsInterface = Omit<
  DocRequestOptionsInterface,
  'bodyType'
>;

export interface DocGuardOptionsInterface {
  policy?: boolean;
  role?: boolean;
}

export interface DocResponseOptionsInterface<T = unknown> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  dto?: ClassConstructor<T>;
}

export interface DocResponseFileOptionsInterface
  extends Omit<DocResponseOptionsInterface, 'dto' | 'statusCode'> {
  fileType?: ENUM_FILE_MIME;
}

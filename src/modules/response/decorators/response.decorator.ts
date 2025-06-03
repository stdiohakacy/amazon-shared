import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ResponseOptionsInterface } from '../interfaces/response.interface';
import {
  RESPONSE_MESSAGE_PATH_META_KEY,
  RESPONSE_MESSAGE_PROPERTIES_META_KEY,
} from '../constants/response.constant';
import { ResponseInterceptor } from '../interceptors/response.interceptor';

export function Response(
  messagePath: string,
  options?: ResponseOptionsInterface,
): MethodDecorator {
  const decorators: (MethodDecorator & ClassDecorator)[] = [
    UseInterceptors(ResponseInterceptor),
    SetMetadata(RESPONSE_MESSAGE_PATH_META_KEY, messagePath),
    SetMetadata(
      RESPONSE_MESSAGE_PROPERTIES_META_KEY,
      options?.messageProperties,
    ),
  ];

  //   if (options?.cached) {
  //     decorators.push(UseInterceptors(CacheInterceptor));

  //     if (typeof options?.cached !== 'boolean') {
  //       if (options?.cached?.key) {
  //         decorators.push(CacheKey(options?.cached?.key));
  //       }

  //       if (options?.cached?.ttl) {
  //         decorators.push(CacheTTL(options?.cached?.ttl));
  //       }
  //     }
  //   }

  return applyDecorators(...decorators);
}

import { Injectable } from '@nestjs/common';
import { HelperEncryptionServiceInterface } from '../interfaces/helper.encryption-service.interface';
import {
  HelperJwtOptionsInterface,
  HelperJwtVerifyOptionsInterface,
} from '../interfaces/helper.interface';

@Injectable()
export class HelperEncryptionService
  implements HelperEncryptionServiceInterface
{
  base64Encrypt(data: string): string {
    throw new Error('Method not implemented.');
  }
  base64Decrypt(data: string): string {
    throw new Error('Method not implemented.');
  }
  base64Compare(basicToken1: string, basicToken2: string): boolean {
    throw new Error('Method not implemented.');
  }
  aes256Encrypt<T = Record<string, any>>(
    data: T,
    key: string,
    iv: string,
  ): string {
    throw new Error('Method not implemented.');
  }
  aes256Decrypt<T = Record<string, any>>(
    encrypted: string,
    key: string,
    iv: string,
  ): T {
    throw new Error('Method not implemented.');
  }
  aes256Compare(aes1: string, aes2: string): boolean {
    throw new Error('Method not implemented.');
  }
  jwtEncrypt(
    payload: Record<string, any>,
    options: HelperJwtOptionsInterface,
  ): string {
    throw new Error('Method not implemented.');
  }
  jwtDecrypt<T>(token: string): T {
    throw new Error('Method not implemented.');
  }
  jwtVerify(token: string, options: HelperJwtVerifyOptionsInterface): boolean {
    throw new Error('Method not implemented.');
  }
}

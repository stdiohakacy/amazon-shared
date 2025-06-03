import { Request } from 'express';

export interface RequestAppInterface<T = any> extends Request {
  user?: T;
  __language: string;
  __version: string;
}

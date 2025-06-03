export interface ResponseMetadataInterface {
  [key: string]: unknown;
}

export interface ResponseInterface<T = void> {
  _metadata?: ResponseMetadataInterface;
  data?: T;
}

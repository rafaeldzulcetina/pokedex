export interface HttpAppResponse<T = never, U = never> {
  data: T;
  status: number;
  statusText?: string;
  request?: never; // OPTIONAL
}

export interface HttpAppError<T = never, U = never> extends Error {
  code?: string;
  request?: never;
  response?: HttpAppResponse<T, U>;
}

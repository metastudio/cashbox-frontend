export enum Status {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

export interface IPagination {
  current: number;
  previous?: number;
  pages: number;
  next?: number;
}

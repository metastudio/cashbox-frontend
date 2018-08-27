type ID = number;

enum Status {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

interface IPagination {
  current:   number;
  previous?: number;
  pages?:    number;
  next?:     number;
}

export { ID, Status, IPagination };

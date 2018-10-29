type ID = number;

enum Status {
  Invalid = 'INVALID',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Failure = 'FAILURE',
}

interface IPagination {
  current:   number;
  previous?: number | null;
  pages?:    number | null;
  next?:     number | null;
}

export { ID, Status, IPagination };

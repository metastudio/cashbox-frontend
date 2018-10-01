import { Status } from 'model-types';
import { IMoney } from 'utils/money/types';

interface ITransactionsSummary {
  income:  IMoney;
  expense: IMoney;
  total:   IMoney;
}

interface ITransactionsSummaryState {
  summary: ITransactionsSummary | null;
  status:  Status;
  error:   Error | null;
}

export {
  ITransactionsSummary,
  ITransactionsSummaryState,
};

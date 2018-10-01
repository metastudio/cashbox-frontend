import { Status } from 'model-types';
import { IMoney } from 'utils/money/types';

interface ITransactionsSummaryLine {
  income:     IMoney;
  expense:    IMoney;
  difference: IMoney;
}

interface ITransactionsSummary {
  [currencyCode: string]: ITransactionsSummaryLine;
  total:   ITransactionsSummaryLine;
}

interface ITransactionsSummaryState {
  summary: ITransactionsSummary | null;
  status:  Status;
  error:   Error | null;
}

export {
  ITransactionsSummary,
  ITransactionsSummaryLine,
  ITransactionsSummaryState,
};

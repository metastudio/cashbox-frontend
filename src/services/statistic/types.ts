import { Status } from 'model-types';
import { ICurrency } from 'utils/money/types';

interface IBalanceStatisticItem {
  month:   string;
  income:  number;
  expense: number;
  total:   number;
}

interface IBalanceStatistic {
  data:     IBalanceStatisticItem[];
  currency: ICurrency;
}

interface IBalanceStatisticState {
  data:    IBalanceStatistic | null;
  status:  Status;
  error:   Error | null;
}

export {
  IBalanceStatistic,
  IBalanceStatisticState,
};

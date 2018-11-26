import { IPagination, Status } from 'model-types';
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
  data:       IBalanceStatistic | null;
  pagination: IPagination | null;
  status:     Status;
  error:      Error | null;
}

interface IIncomeCategoriesStatisticItem {
  name:  string;
  value: number;
}

interface IIncomeCategoriesStatistic {
  data:     IIncomeCategoriesStatisticItem[];
  currency: ICurrency;
}

interface IIncomeCategoriesStatisticState {
  data:       IIncomeCategoriesStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface IIncomeCustomersStatisticItem {
  name:  string;
  value: number;
}

interface IIncomeCustomersStatistic {
  data:     IIncomeCustomersStatisticItem[];
  currency: ICurrency;
}

interface IIncomeCustomersStatisticState {
  data:       IIncomeCustomersStatistic | null;
  status:     Status;
  error:      Error | null;
}
export {
  IBalanceStatistic,
  IBalanceStatisticState,

  IIncomeCategoriesStatistic,
  IIncomeCategoriesStatisticState,

  IIncomeCustomersStatistic,
  IIncomeCustomersStatisticState,
};

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

interface ICategoriesStatisticItem {
  name:  string;
  value: number;
}

interface ICategoriesStatistic {
  data:       ICategoriesStatisticItem[];
  currency:   ICurrency;
}

interface IIncomeCategoriesStatisticState {
  data:       ICategoriesStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface IExpenseCategoriesStatisticState {
  data:       ICategoriesStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface ICustomersStatisticItem {
  name:  string;
  value: number;
}

interface ICustomersStatistic {
  data:       ICustomersStatisticItem[];
  currency:   ICurrency;
}

interface IIncomeCustomersStatisticState {
  data:       ICustomersStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface IExpenseCustomersStatisticState {
  data:       ICustomersStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface ITotalsByCustomersStatisticState {
  data:       ICustomersStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface ICustomersBalancesStatisticItem {
  name:    string;
  income:  number;
  expense: number;
}

interface ICustomersBalancesStatistic {
  data:       ICustomersBalancesStatisticItem[];
  currency:   ICurrency;
}

interface IBalancesByCustomersStatisticState {
  data:       ICustomersBalancesStatistic | null;
  status:     Status;
  error:      Error | null;
}

interface ICustomersByMonthsStatisticItem {
  month:         string;
  [key: string]: string | number;
}

interface ICustomersByMonthsStatistic {
  header:   string[];
  data:     ICustomersByMonthsStatisticItem[];
  currency: ICurrency;
}

interface IIncomeCustomersByMonthsStatisticState {
  data:     ICustomersByMonthsStatistic | null;
  status:   Status;
  error:    Error | null;
}

interface IExpenseCustomersByMonthsStatisticState {
  data:     ICustomersByMonthsStatistic | null;
  status:   Status;
  error:    Error | null;
}

export {
  IBalanceStatistic,
  IBalanceStatisticState,

  ICategoriesStatistic,
  IIncomeCategoriesStatisticState,
  IExpenseCategoriesStatisticState,

  ICustomersStatistic,
  IIncomeCustomersStatisticState,
  IExpenseCustomersStatisticState,
  ITotalsByCustomersStatisticState,

  ICustomersByMonthsStatistic,
  IIncomeCustomersByMonthsStatisticState,
  IExpenseCustomersByMonthsStatisticState,

  ICustomersBalancesStatistic,
  IBalancesByCustomersStatisticState,
};

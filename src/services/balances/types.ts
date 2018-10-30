import { Status } from 'model-types';
import { CurrencyCode, IMoney } from 'utils/money';

interface IBalance {
  total:     IMoney;
  exTotal?:  IMoney;
  rate:      string;
  currency:  CurrencyCode;
  updatedAt: Date;
}

interface IOrganizationBalance {
  totalAmount: IMoney;
  defaultCurrency: CurrencyCode;
  totals:          IBalance[];
}

interface IBalancesState {
  status:          Status;
  totalAmount:     IMoney | null;
  defaultCurrency: CurrencyCode | null;
  totals:          IBalance[];
  error:           Error | null;
}

export {
  IBalance,
  IOrganizationBalance,
  IBalancesState,
};

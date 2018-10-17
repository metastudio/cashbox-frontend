import { Status } from 'model-types';
import { CurrencyCode } from 'utils/money';

interface ICurrenciesState {
  items:  CurrencyCode[];
  status: Status;
  error:  Error | null;
}

export { ICurrenciesState };

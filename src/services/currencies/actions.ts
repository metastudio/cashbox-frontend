import { createAction } from 'typesafe-actions';
import { CurrencyCode } from 'utils/money';

const loadCurrencies = {
  request:createAction('LOAD_CURRENCIES_REQUEST'),
  success: createAction(
    'LOAD_CURRENCIES_SUCCESS',
    (resolve) => {
      return (currencies: CurrencyCode[]) => resolve({ currencies });
    },
  ),
  failure: createAction(
    'LOAD_CURRENCIES_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export { loadCurrencies };

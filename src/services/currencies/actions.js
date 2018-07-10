import { createAction } from 'redux-actions';
import { noop } from 'lodash';

const loadCurrencies   = createAction('LOAD_CURRENCIES');
loadCurrencies.request = createAction('LOAD_CURRENCIES_REQUEST');
loadCurrencies.success = createAction('LOAD_CURRENCIES_SUCCESS', (currencies) => ({ currencies }));
loadCurrencies.failure = createAction('LOAD_CURRENCIES_FAILURE');

export { loadCurrencies };

import { createAction } from 'redux-actions';

export const loadCurrenciesRates = createAction('LOAD_CURRENCIES_RATES', () => ({ }));
loadCurrenciesRates.request = createAction('LOAD_CURRENCIES_RATES_REQUEST', () => ({ }));
loadCurrenciesRates.success = createAction('LOAD_CURRENCIES_RATES_SUCCESS', (rates) => ({ rates }));
loadCurrenciesRates.failure = createAction('LOAD_CURRENCIES_RATES_FAILURE');

import { prepareURL, getApi } from './_helpers';

const currenciesURL = () => prepareURL('/api/currencies');
const currencyRatesURL = () => prepareURL('/api/currency_rates');

export const getCurrencies = () => getApi(currenciesURL());
export const getCurrencyRates = () => getApi(currencyRatesURL());

import { prepareURL, getApi } from 'api/_helpers.js';

const currenciesURL = () => prepareURL('/api/currencies');

export const getCurrencies = () => getApi(currenciesURL());

import { prepareURL, getApi } from 'utils/api-helpers';

const currenciesURL = () => prepareURL('/api/currencies');

export const getCurrencies = () => getApi(currenciesURL());

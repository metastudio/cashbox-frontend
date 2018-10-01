import { CURRENCIES } from 'constants/currencies';
import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

const skipCurrencyKeys = (k: string, c: ((key: string) => string)) => CURRENCIES.includes(k) ? k : c(k);

const transactionsSummaryURL = (orgId: ID, query: {}) =>
  prepareURL(`/api/organizations/${orgId}/transactions/summary`, query);

export const getTransactionsSummary = (orgId: ID, query: {}) =>
  getApi(transactionsSummaryURL(orgId, query), { camelizeSkipFilter: skipCurrencyKeys });

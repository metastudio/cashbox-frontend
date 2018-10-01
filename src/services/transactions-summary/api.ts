import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

const transactionsSummaryURL = (orgId: ID, query: {}) =>
  prepareURL(`/api/organizations/${orgId}/transactions/summary`, query);

export const getTransactionsSummary = (orgId: ID, query: {}) =>
  getApi(transactionsSummaryURL(orgId, query));

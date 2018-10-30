import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

function balanceStatisticURL(orgId: ID, query: {}) {
  return prepareURL(`/api/organizations/${orgId}/statistic/balance`, query);
}

export function getBalanceStatistic(orgId: ID, query: {}) {
  return getApi(balanceStatisticURL(orgId, query));
}

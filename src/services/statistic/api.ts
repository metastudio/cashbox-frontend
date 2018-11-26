import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

function balanceStatisticURL(orgId: ID, query: {}) {
  return prepareURL(`/api/organizations/${orgId}/statistic/balance`, query);
}
function incomeCategoriesStatisticURL(orgId: ID, query: {}) {
  return prepareURL(`/api/organizations/${orgId}/statistic/income_categories`, query);
}
function incomeCustomersStatisticURL(orgId: ID, query: {}) {
  return prepareURL(`/api/organizations/${orgId}/statistic/income_customers`, query);
}

export function getBalanceStatistic(orgId: ID, query: {}) {
  return getApi(balanceStatisticURL(orgId, query));
}
export function getIncomeCategoriesStatistic(orgId: ID, query: {}) {
  return getApi(incomeCategoriesStatisticURL(orgId, query));
}
export function getIncomeCustomersStatistic(orgId: ID, query: {}) {
  return getApi(incomeCustomersStatisticURL(orgId, query));
}

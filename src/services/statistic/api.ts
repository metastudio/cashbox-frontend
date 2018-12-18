import { ID } from 'model-types';

import { getApi, prepareURL } from 'utils/api-helpers';

function statisticURL(orgId: ID, action: string, query: {}) {
  return prepareURL(`/api/organizations/${orgId}/statistic/${action}`, query);
}

export function getBalanceStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'balance', query));
}
export function getIncomeCategoriesStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'income_categories', query));
}
export function getExpenseCategoriesStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'expense_categories', query));
}
export function getIncomeCustomersStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'income_customers', query));
}
export function getExpenseCustomersStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'expense_customers', query));
}
export function getTotalsByCustomersStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'totals_by_customers', query));
}
export function getBalancesByCustomersStatistic(orgId: ID, query: {}) {
  return getApi(statisticURL(orgId, 'balances_by_customers', query));
}

import { memoize } from 'lodash';

import { IQuery, parseQuery } from 'utils/url-helpers';

import {
  IBalanceStatisticState,
  IExpenseCategoriesStatisticState,
  IExpenseCustomersStatisticState,
  IIncomeCategoriesStatisticState,
  IIncomeCustomersStatisticState,
} from './types';

interface IStateWithBalanceStats {
  balanceStatistic: IBalanceStatisticState;
}
interface IStateWithIncomeCategoriesStats {
  incomeCategoriesStatistic: IIncomeCategoriesStatisticState;
}
interface IStateWithExpenseCategoriesStats {
  expenseCategoriesStatistic: IExpenseCategoriesStatisticState;
}
interface IStateWithIncomeCustomersStats {
  incomeCustomersStatistic: IIncomeCustomersStatisticState;
}
interface IStateWithExpenseCustomersStats {
  expenseCustomersStatistic: IExpenseCustomersStatisticState;
}

const selectBalanceStatistic           = (state: IStateWithBalanceStats) => state.balanceStatistic.data;
const selectBalanceStatisticPagination = (state: IStateWithBalanceStats) => state.balanceStatistic.pagination;
const selectBalanceStatisticStatus     = (state: IStateWithBalanceStats) => state.balanceStatistic.status;

function selectIncomeCategoriesStatistic(state: IStateWithIncomeCategoriesStats) {
  return state.incomeCategoriesStatistic.data;
}
function selectIncomeCategoriesStatisticStatus(state: IStateWithIncomeCategoriesStats) {
  return state.incomeCategoriesStatistic.status;
}
function selectExpenseCategoriesStatistic(state: IStateWithExpenseCategoriesStats) {
  return state.expenseCategoriesStatistic.data;
}
function selectExpenseCategoriesStatisticStatus(state: IStateWithExpenseCategoriesStats) {
  return state.expenseCategoriesStatistic.status;
}
function selectIncomeCustomersStatistic(state: IStateWithIncomeCustomersStats) {
  return state.incomeCustomersStatistic.data;
}
function selectIncomeCustomersStatisticStatus(state: IStateWithIncomeCustomersStats) {
  return state.incomeCustomersStatistic.status;
}
function selectExpenseCustomersStatistic(state: IStateWithExpenseCustomersStats) {
  return state.expenseCustomersStatistic.data;
}
function selectExpenseCustomersStatisticStatus(state: IStateWithExpenseCustomersStats) {
  return state.expenseCustomersStatistic.status;
}

const selectStatisticsQuery = memoize((search: string): IQuery => parseQuery(search));

function selectStatisticsQueryPage(search: string): number | undefined {
  const query = selectStatisticsQuery(search);
  return query.page ? Number(query.page) : undefined;
}
function selectStatisticsQueryScale(search: string): string | undefined {
  const query = selectStatisticsQuery(search);
  return query.scale ? String(query.scale) : undefined;
}
function selectStatisticsQueryPeriod(search: string): string | undefined {
  const query = selectStatisticsQuery(search);
  return query.period ? String(query.period) : undefined;
}

export {
  selectBalanceStatistic,
  selectBalanceStatisticPagination,
  selectBalanceStatisticStatus,

  selectIncomeCategoriesStatistic,
  selectIncomeCategoriesStatisticStatus,
  selectExpenseCategoriesStatistic,
  selectExpenseCategoriesStatisticStatus,

  selectIncomeCustomersStatistic,
  selectIncomeCustomersStatisticStatus,
  selectExpenseCustomersStatistic,
  selectExpenseCustomersStatisticStatus,

  selectStatisticsQueryPage,
  selectStatisticsQueryScale,
  selectStatisticsQueryPeriod,
};

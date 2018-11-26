import { memoize } from 'lodash';

import { IQuery, parseQuery } from 'utils/url-helpers';

import { IBalanceStatisticState, IIncomeCategoriesStatisticState } from './types';

interface IStateWithBalanceStats {
  balanceStatistic: IBalanceStatisticState;
}

interface IStateWithIncomeCategoriesStats {
  incomeCategoriesStatistic: IIncomeCategoriesStatisticState;
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

  selectStatisticsQueryPage,
  selectStatisticsQueryScale,
  selectStatisticsQueryPeriod,
};

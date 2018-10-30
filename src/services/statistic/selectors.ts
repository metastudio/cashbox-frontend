import { memoize } from 'lodash';

import { IQuery, parseQuery } from 'utils/url-helpers';

import { IBalanceStatisticState } from './types';

interface IState {
  balanceStatistic: IBalanceStatisticState;
}

const selectBalanceStatistic           = (state: IState) => state.balanceStatistic.data;
const selectBalanceStatisticPagination = (state: IState) => state.balanceStatistic.pagination;
const selectBalanceStatisticStatus     = (state: IState) => state.balanceStatistic.status;

const selectStatisticsQuery = memoize((search: string): IQuery => parseQuery(search));

function selectStatisticsQueryPage(search: string): number | undefined {
  const query = selectStatisticsQuery(search);
  return query.page ? Number(query.page) : undefined;
}
function selectStatisticsQueryScale(search: string): string | undefined {
  const query = selectStatisticsQuery(search);
  return query.scale ? String(query.scale) : undefined;
}

export {
  selectBalanceStatistic,
  selectBalanceStatisticPagination,
  selectBalanceStatisticStatus,

  selectStatisticsQueryPage,
  selectStatisticsQueryScale,
};

import { IBalanceStatisticState } from './types';

interface IState {
  balanceStatistic: IBalanceStatisticState;
}

const selectBalanceStatistic           = (state: IState) => state.balanceStatistic.data;
const selectBalanceStatisticPagination = (state: IState) => state.balanceStatistic.pagination;
const selectBalanceStatisticStatus     = (state: IState) => state.balanceStatistic.status;

export {
  selectBalanceStatistic,
  selectBalanceStatisticPagination,
  selectBalanceStatisticStatus,
};

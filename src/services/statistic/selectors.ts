import { IBalanceStatisticState } from './types';

interface IState {
  balanceStatistic: IBalanceStatisticState;
}

const selectBalanceStatistic       = (state: IState) => state.balanceStatistic.data;
const selectBalanceStatisticStatus = (state: IState) => state.balanceStatistic.status;

export {
  selectBalanceStatistic,
  selectBalanceStatisticStatus,
};

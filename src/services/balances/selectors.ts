import { IBalancesState } from './types';

interface IStateWithBalances {
  balances: IBalancesState;
}

const selectBalancesStatus          = (state: IStateWithBalances) => state.balances.status;
const selectBalancesTotalAmount     = (state: IStateWithBalances) => state.balances.totalAmount;
const selectBalancesDefaultCurrency = (state: IStateWithBalances) => state.balances.defaultCurrency;
const selectBalancesTotals          = (state: IStateWithBalances) => state.balances.totals;

export {
  selectBalancesStatus,
  selectBalancesTotalAmount,
  selectBalancesDefaultCurrency,
  selectBalancesTotals,
};

import { IDebtorsState } from './types';

interface IStateWithDebtors {
  debtors: IDebtorsState;
}

const selectDebtors = (state: IStateWithDebtors) => state.debtors.items;
const selectTotal = (state: IStateWithDebtors) => state.debtors.total;
const selectTotalsByCurrency = (state: IStateWithDebtors) => state.debtors.totalsByCurrency;
const selectDebtorsStatus = (state: IStateWithDebtors) => state.debtors.status;

export { selectDebtors, selectTotal, selectTotalsByCurrency, selectDebtorsStatus };

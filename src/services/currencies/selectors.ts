import { ICurrenciesState } from './types';

interface IStateWithCurrencies {
  currencies: ICurrenciesState;
}

const selectCurrenciesStatus = (state: IStateWithCurrencies) => state.currencies.status;
const selectCurrencies       = (state: IStateWithCurrencies) => state.currencies.items;

export { selectCurrenciesStatus, selectCurrencies };

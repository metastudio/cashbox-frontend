import { ActionType, getType } from 'typesafe-actions';

import { Status } from 'model-types';
import { loadCurrencies } from '../actions';
import { ICurrenciesState } from '../types';

const defaultState: ICurrenciesState = {
  items:  [],
  status: Status.Invalid,
  error:  null,
};

function currenciesReducer(
  state: ICurrenciesState = defaultState,
  action: ActionType<
    | typeof loadCurrencies
  >,
): ICurrenciesState {
  switch (action.type) {
    case getType(loadCurrencies.request):
      return {
        ...state,
        status: Status.Pending,
        error:  null,
      };
    case getType(loadCurrencies.success):
      return {
        ...state,
        items:  action.payload.currencies,
        status: Status.Success,
        error:  null,
      };
    case getType(loadCurrencies.failure):
      return {
        ...state,
        status: Status.Failure,
        error:  action.payload,
      };
    default:
      return state;
  }
}

export default currenciesReducer;

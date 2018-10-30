import { actionTypes, FormAction } from 'redux-form';

import { formatMoneyValue, parseMoneyValue } from 'utils/money';

import {
  selectTransferFormExchangeRate,
  selectTransferFormFromAmount,
} from './selectors';
import { ITransferFormState } from './types';

function transferFormReducer(
  state: ITransferFormState,
  action: FormAction,
): ITransferFormState {
  switch (action.type) {
    case actionTypes.CHANGE: {
      const fromAmount    = selectTransferFormFromAmount({ form: { transferForm: state } });
      const exchangeRate  = selectTransferFormExchangeRate({ form: { transferForm: state } });
      const newValue = parseMoneyValue(action.payload);

      switch (action.meta.field) {
        case 'fromAmount': {
          if (!newValue || !exchangeRate) { return state; }

          return {
            ...state,
            values: {
              ...state.values,
              toAmount: formatMoneyValue(newValue * exchangeRate),
            },
          };
        }
        case 'toAmount': {
          if (!fromAmount || !newValue) { return state; }

          return {
            ...state,
            values: {
              ...state.values,
              exchangeRate: formatMoneyValue(newValue / fromAmount),
            },
          };
        }
        case 'exchangeRate': {
          if (!fromAmount || !newValue) { return state; }

          return {
            ...state,
            values: {
              ...state.values,
              toAmount: formatMoneyValue(fromAmount * newValue),
            },
          };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
}

export default transferFormReducer;

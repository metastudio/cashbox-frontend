import { actionTypes, FormAction } from 'redux-form';

import { selectInvoiceFormItemsTotalAmount } from './selectors';
import { IInvoiceFormState } from './types';

function invoiceFormReducer(
  state: IInvoiceFormState,
  action: FormAction,
): IInvoiceFormState {
  switch (action.type) {
    case actionTypes.CHANGE: {
      if (!action.meta.field.startsWith('invoiceItems[')) {
        return state;
      }
      if (!state.values.invoiceItems || state.values.invoiceItems.length === 0) {
        return state;
      }

      return {
        ...state,
        values: {
          ...state.values,
          amount: selectInvoiceFormItemsTotalAmount(state),
        },
      };
    }
    default:
      return state;
  }
}

export default invoiceFormReducer;

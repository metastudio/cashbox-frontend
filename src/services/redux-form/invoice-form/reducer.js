import { handleActions } from 'redux-actions';
import { actionTypes } from 'redux-form';

import { selectInvoiceFormItemsTotalAmount } from './selectors';

export default handleActions({
  [actionTypes.CHANGE]: (state, { meta }) => {
    if (!meta.field.startsWith('invoiceItems[')) {
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
  },
}, {});

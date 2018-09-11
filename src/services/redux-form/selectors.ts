import { memoize } from 'lodash';
import { formValueSelector } from 'redux-form';

import { INVOICE_FORM } from 'constants/forms';
import { IGlobalState } from 'services/global-state';
import { formatMoneyValue, parseMoneyValue } from 'utils/money';
import { IInvoiceFormState, IInvoiceItemFormData } from './types';

const selectInvoiceFormItemsTotalAmount = (state: IInvoiceFormState) => {
  const totalAmount = state.values.invoiceItems.reduce(
    (sum, item) => {
      if (!item.amount || item._destroy) {
        return sum + 0;
      }
      return sum + parseMoneyValue(item.amount)!;
    },
    0,
  );
  return formatMoneyValue(totalAmount);
};

const invoiceFormSelector = formValueSelector(INVOICE_FORM);

const selectInvoiceFormHasItems = memoize((state: IGlobalState) => {
  const invoiceItems: IInvoiceItemFormData[] = invoiceFormSelector(state, 'invoiceItems');
  return invoiceItems && invoiceItems.filter(i => !i._destroy).length > 0;
});

export {
  selectInvoiceFormItemsTotalAmount,
  selectInvoiceFormHasItems,
};

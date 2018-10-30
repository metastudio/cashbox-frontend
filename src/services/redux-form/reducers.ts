import { INVOICE_FORM, TRANSFER_FORM } from 'constants/forms';

import invoiceFormReducer from './invoice-form/reducer';
import transferFormReducer from './transfer-form/reducer';

export default {
  [INVOICE_FORM]: invoiceFormReducer,
  [TRANSFER_FORM]: transferFormReducer,
};

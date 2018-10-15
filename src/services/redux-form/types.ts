import { IInvoiceFormState } from './invoice-form/types';
import { ITransferFormState } from './transfer-form/types';

interface IReduxFormState {
  invoiceForm?: IInvoiceFormState;
  transferForm?: ITransferFormState;
}

export { IReduxFormState };

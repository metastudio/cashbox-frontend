import {
  IInvoicesState,
  IInvoiceState,
  IUnpaidInvoicesCountState,
  IUnpaidInvoicesState,
} from 'services/invoices/types';
import { ICurrentOrganizationState, IOrganizationsState, IOrganizationState } from 'services/organizations/types';
import { IReduxFormState } from 'services/redux-form/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  currentOrganization: ICurrentOrganizationState;
  form:                IReduxFormState;
  organization:        IOrganizationState;
  organizations:       IOrganizationsState;
  transactions:        ITransactionsState;
  transaction:         ITransactionState;
  invoice:             IInvoiceState;
  invoices:            IInvoicesState;
  unpaidInvoices:      IUnpaidInvoicesState;
  unpaidInvoicesCount: IUnpaidInvoicesCountState;
}

export { IGlobalState };

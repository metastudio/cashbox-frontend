import { IBankAccountsState, IBankAccountState } from 'services/bank-accounts';
import {
  IInvoicesState,
  IInvoiceState,
  IUnpaidInvoicesCountState,
  IUnpaidInvoicesState,
} from 'services/invoices/types';
import { ICurrentOrganizationState, IOrganizationsState, IOrganizationState } from 'services/organizations/types';
import { IReduxFormState } from 'services/redux-form/invoice-form/types';
import { ITransactionsSummaryState } from 'services/transactions-summary/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  currentOrganization: ICurrentOrganizationState;
  bankAccount:         IBankAccountState;
  bankAccounts:        IBankAccountsState;
  visibleBankAccounts: IBankAccountsState;
  form:                IReduxFormState;
  organization:        IOrganizationState;
  organizations:       IOrganizationsState;
  transactionsSummary: ITransactionsSummaryState;
  transactions:        ITransactionsState;
  transaction:         ITransactionState;
  invoice:             IInvoiceState;
  invoices:            IInvoicesState;
  unpaidInvoices:      IUnpaidInvoicesState;
  unpaidInvoicesCount: IUnpaidInvoicesCountState;
}

export { IGlobalState };

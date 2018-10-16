import { IAppState } from 'services/app/types';
import { IAuthState } from 'services/auth/types';
import { IBankAccountsState, IBankAccountState } from 'services/bank-accounts/types';
import { ICurrenciesState } from 'services/currencies/types';
import { IFlashMessagesState } from 'services/flash-messages/types';
import {
  IInvoicesState,
  IInvoiceState,
  IUnpaidInvoicesCountState,
  IUnpaidInvoicesState,
} from 'services/invoices/types';
import { ICurrentOrganizationState, IOrganizationsState, IOrganizationState } from 'services/organizations/types';
import { IReduxFormState } from 'services/redux-form/types';
import { ITransactionsSummaryState } from 'services/transactions-summary/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  app:                 IAppState;
  auth:                IAuthState;
  currencies:          ICurrenciesState;
  currentOrganization: ICurrentOrganizationState;
  bankAccount:         IBankAccountState;
  bankAccounts:        IBankAccountsState;
  visibleBankAccounts: IBankAccountsState;
  flashMessages:       IFlashMessagesState;
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

import { IAppState } from 'services/app/types';
import { IAuthState } from 'services/auth/types';
import { IBalancesState } from 'services/balances/types';
import { IBankAccountsState, IBankAccountState } from 'services/bank-accounts/types';
import { ICategoriesState, ICategoryState } from 'services/categories/types';
import { ICurrenciesState } from 'services/currencies/types';
import { ICustomersState, ICustomerState } from 'services/customers/types';
import { IDebtorsState } from 'services/debtors/types';
import { IFlashMessagesState } from 'services/flash-messages/types';
import {
  IInvoicesState,
  IInvoiceState,
  IUnpaidInvoicesCountState,
} from 'services/invoices/types';
import { IMembersState } from 'services/members/types';
import { ICurrentOrganizationState, IOrganizationsState, IOrganizationState } from 'services/organizations/types';
import { IReduxFormState } from 'services/redux-form/types';
import {
  IBalanceStatisticState,
  IIncomeCategoriesStatisticState,
  IIncomeCustomersStatisticState,
} from 'services/statistic/types';
import { ITransactionsSummaryState } from 'services/transactions-summary/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  app:                 IAppState;
  auth:                IAuthState;
  balances:            IBalancesState;
  balanceStatistic:    IBalanceStatisticState;
  bankAccount:         IBankAccountState;
  bankAccounts:        IBankAccountsState;
  visibleBankAccounts: IBankAccountsState;
  categories:          ICategoriesState;
  category:            ICategoryState;
  currencies:          ICurrenciesState;
  currentOrganization: ICurrentOrganizationState;
  customer:            ICustomerState;
  customers:           ICustomersState;
  debtors:             IDebtorsState;
  incomeCategoriesStatistic: IIncomeCategoriesStatisticState;
  incomeCustomersStatistic:  IIncomeCustomersStatisticState;
  flashMessages:       IFlashMessagesState;
  form:                IReduxFormState;
  members:             IMembersState;
  organization:        IOrganizationState;
  organizations:       IOrganizationsState;
  transactionsSummary: ITransactionsSummaryState;
  transactions:        ITransactionsState;
  transaction:         ITransactionState;
  invoice:             IInvoiceState;
  invoices:            IInvoicesState;
  unpaidInvoices:      IInvoicesState;
  unpaidInvoicesCount: IUnpaidInvoicesCountState;
}

export { IGlobalState };

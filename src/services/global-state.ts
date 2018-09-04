import { ICurrentOrganizationState, IOrganizationsState } from 'services/organizations/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  currentOrganization: ICurrentOrganizationState;
  organizations:       IOrganizationsState;
  transactions:        ITransactionsState;
  transaction:         ITransactionState;
}

export { IGlobalState };

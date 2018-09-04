import { ICurrentOrganizationState, IOrganizationsState, IOrganizationState } from 'services/organizations/types';
import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  currentOrganization: ICurrentOrganizationState;
  organization:        IOrganizationState;
  organizations:       IOrganizationsState;
  transactions:        ITransactionsState;
  transaction:         ITransactionState;
}

export { IGlobalState };

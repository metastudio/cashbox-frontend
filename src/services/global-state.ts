import { ITransactionsState, ITransactionState } from 'services/transactions/types';

interface IGlobalState {
  transactions: ITransactionsState;
  transaction:  ITransactionState;
}

export { IGlobalState };

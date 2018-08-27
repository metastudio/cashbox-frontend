import { IGlobalState } from 'services/global-state';

const selectTransactions            = (state: IGlobalState) => state.transactions.items;
const selectTransactionsStatus      = (state: IGlobalState) => state.transactions.status;
const selectTransactionsPagination  = (state: IGlobalState) => state.transactions.pagination;

const selectTransaction             = (state: IGlobalState) => state.transaction.item;
const selectTransactionStatus       = (state: IGlobalState) => state.transaction.status;

export {
  selectTransactions,
  selectTransactionsStatus,
  selectTransaction,
  selectTransactionStatus,
  selectTransactionsPagination,
};

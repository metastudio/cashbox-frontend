const selectTransactions       = (state) => state.transactions.items;
const selectTransactionsStatus = (state) => state.transactions.status;
const selectTransaction        = (state) => state.transaction.item;
const selectTransactionStatus  = (state) => state.transaction.status;

export {
  selectTransactions,
  selectTransactionsStatus,
  selectTransaction,
  selectTransactionStatus,
};

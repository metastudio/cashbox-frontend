const selectTransactions       = (state) => state.transactions.items;
const selectTransactionsStatus = (state) => state.transactions.status;

export {
  selectTransactions,
  selectTransactionsStatus,
};

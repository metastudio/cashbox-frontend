const selectTransactions       = (state) => state.invoices.items;
const selectTransactionsStatus = (state) => state.invoices.status;

export {
  selectTransactions,
  selectTransactionsStatus,
};

const selectBankAccountsStatus = (state) => state.bankAccounts.status;
const selectBankAccounts       = (state) => state.bankAccounts.items;

const selectVisibleBankAccountsStatus = (state) => state.visibleBankAccounts.status;
const selectVisibleBankAccounts       = (state) => state.visibleBankAccounts.items;

export {
  selectBankAccountsStatus,
  selectBankAccounts,
  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts
};

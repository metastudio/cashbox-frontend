const selectBankAccountsStatus = (state) => state.bankAccounts.status;
const selectBankAccounts       = (state) => state.bankAccounts.items;

export { selectBankAccountsStatus, selectBankAccounts };

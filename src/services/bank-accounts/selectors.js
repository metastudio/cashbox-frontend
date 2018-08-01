import { uniq } from 'lodash';

const selectBankAccountsStatus = (state) => state.bankAccounts.status;
const selectBankAccounts       = (state) => state.bankAccounts.items;

const selectVisibleBankAccountsStatus = (state) => state.visibleBankAccounts.status;
const selectVisibleBankAccounts       = (state) => state.visibleBankAccounts.items;

const selectVisibleBankAccountsCurrencies = (state) => uniq(selectVisibleBankAccounts(state).map(ba => ba.currency)).sort();
const selectVisibleBankAccountsWithCurrency = (state, currency) => selectVisibleBankAccounts(state).filter(ba => ba.currency === currency);

export {
  selectBankAccountsStatus,
  selectBankAccounts,

  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts,
  selectVisibleBankAccountsCurrencies,
  selectVisibleBankAccountsWithCurrency,
};

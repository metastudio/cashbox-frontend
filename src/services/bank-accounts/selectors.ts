import { uniq } from 'lodash';

import { ID, Status } from 'model-types';
import { CurrencyCode } from 'utils/money';

import { IBankAccount, IBankAccountsState, IBankAccountState } from './types';

function selectBankAccountsStatus(state: { bankAccounts: IBankAccountsState }): Status {
  return state.bankAccounts.status;
}
function selectBankAccounts(state: { bankAccounts: IBankAccountsState }): IBankAccount[] {
  return state.bankAccounts.items;
}
function selectBankAccountsCurrencies(state: { bankAccounts: IBankAccountsState }): CurrencyCode[] {
  return uniq(selectBankAccounts(state).map(ba => ba.currency)).sort();
}
function selectBankAccountsWithCurrency(
  state: { bankAccounts: IBankAccountsState },
  currency: CurrencyCode,
): IBankAccount[] {
  return selectBankAccounts(state).filter(ba => ba.currency === currency);
}

function selectVisibleBankAccountsStatus(
  state: { visibleBankAccounts: IBankAccountsState },
): Status {
  return state.visibleBankAccounts.status;
}
function selectVisibleBankAccounts(
  state: { visibleBankAccounts: IBankAccountsState },
): IBankAccount[] {
  return state.visibleBankAccounts.items;
}

function selectVisibleBankAccountsCurrencies(
  state: { visibleBankAccounts: IBankAccountsState },
): CurrencyCode[] {
  return uniq(selectVisibleBankAccounts(state).map(ba => ba.currency)).sort();
}
function selectVisibleBankAccountsWithCurrency(
  state: { visibleBankAccounts: IBankAccountsState },
  currency: CurrencyCode,
): IBankAccount[] {
  return selectVisibleBankAccounts(state).filter(ba => ba.currency === currency);
}
function selectVisibleBankAccountById(
  state: { visibleBankAccounts: IBankAccountsState },
  id:    ID,
): IBankAccount | undefined {
  return state.visibleBankAccounts.items.find(ba => ba.id === id);
}

function selectBankAccountStatus(state: { bankAccount: IBankAccountState }): Status {
  return state.bankAccount.status;
}
function selectBankAccount(state: { bankAccount: IBankAccountState }): IBankAccount | null {
  return state.bankAccount.data;
}

export {
  selectBankAccountsStatus,
  selectBankAccounts,
  selectBankAccountsCurrencies,
  selectBankAccountsWithCurrency,

  selectVisibleBankAccountsStatus,
  selectVisibleBankAccounts,
  selectVisibleBankAccountsCurrencies,
  selectVisibleBankAccountsWithCurrency,
  selectVisibleBankAccountById,

  selectBankAccountStatus,
  selectBankAccount,
};

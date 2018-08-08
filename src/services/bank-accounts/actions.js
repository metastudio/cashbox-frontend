import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadBankAccounts = createAction(
  'LOAD_BANK_ACCOUNTS',
  (organizationId) => ({ organizationId }),
);
loadBankAccounts.request = createAction(
  'LOAD_BANK_ACCOUNTS_REQUEST',
  (organizationId) => ({ organizationId }),
);
loadBankAccounts.success = createAction(
  'LOAD_BANK_ACCOUNTS_SUCCESS',
  (organizationId, bankAccounts) => ({ organizationId, bankAccounts }),
);
loadBankAccounts.failure = createAction('LOAD_BANK_ACCOUNTS_FAILURE');

export const loadVisibleBankAccounts = createAction(
  'LOAD_VISIBLE_BANK_ACCOUNTS',
  (organizationId) => ({ organizationId }),
);
loadVisibleBankAccounts.request = createAction(
  'LOAD_VISIBLE_BANK_ACCOUNTS_REQUEST',
  (organizationId) => ({ organizationId }),
);
loadVisibleBankAccounts.success = createAction(
  'LOAD_VISIBLE_BANK_ACCOUNTS_SUCCESS',
  (organizationId, bankAccounts) => ({ organizationId, bankAccounts }),
);
loadVisibleBankAccounts.failure = createAction('LOAD_VISIBLE_BANK_ACCOUNTS_FAILURE');

export const createBankAccount = createAction(
  'CREATE_BANK_ACCOUNT',
  (organizationId, data) => ({ organizationId, data }),
  (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
createBankAccount.request = createAction(
  'CREATE_BANK_ACCOUNT_REQUEST',
  (organizationId) => ({ organizationId }),
);
createBankAccount.success = createAction(
  'CREATE_BANK_ACCOUNT_SUCCESS',
  (organizationId, bankAccount) => ({ organizationId, bankAccount }),
);
createBankAccount.failure = createAction('CREATE_BANK_ACCOUNT_FAILURE');

export const loadBankAccount = createAction(
  'LOAD_BANK_ACCOUNT',
  (organizationId, bankAccountId) => ({ organizationId, bankAccountId }),
);
loadBankAccount.request = createAction(
  'LOAD_BANK_ACCOUNT_REQUEST',
  (organizationId, bankAccountId) => ({ organizationId, bankAccountId }),
);
loadBankAccount.success = createAction(
  'LOAD_BANK_ACCOUNT_SUCCESS',
  (organizationId, bankAccount) => ({ organizationId, bankAccount }),
);
loadBankAccount.failure = createAction('LOAD_BANK_ACCOUNT_FAILURE');

export const updateBankAccount = createAction(
  'UPDATE_BANK_ACCOUNT',
  (organizationId, bankAccountId, data) => ({ organizationId, bankAccountId, data }),
  (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
updateBankAccount.request = createAction(
  'UPDATE_BANK_ACCOUNT_REQUEST',
  (organizationId, bankAccountId) => ({ organizationId, bankAccountId }),
);
updateBankAccount.success = createAction(
  'UPDATE_BANK_ACCOUNT_SUCCESS',
  (organizationId, bankAccount) => ({ organizationId, bankAccount }),
);
updateBankAccount.failure = createAction('UPDATE_BANK_ACCOUNT_FAILURE');

export const deleteBankAccount = createAction(
  'DELETE_BANK_ACCOUNT',
  (organizationId, bankAccountId) => ({ organizationId, bankAccountId }),
  (_organizationId, _bankAccountId, resolve = noop, reject = noop) => ({ resolve, reject }),
);
deleteBankAccount.request = createAction(
  'DELETE_BANK_ACCOUNT_REQUEST',
  (organizationId, bankAccountId) => ({ organizationId, bankAccountId }),
);
deleteBankAccount.success = createAction(
  'DELETE_BANK_ACCOUNT_SUCCESS',
  (organizationId, bankAccount) => ({ organizationId, bankAccount }),
);
deleteBankAccount.failure = createAction('DELETE_BANK_ACCOUNT_FAILURE');

export const clearBankAccount = createAction('CLEAR_BANK_ACCOUNT');

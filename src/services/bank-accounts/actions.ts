import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID } from 'model-types';

import { IBankAccount, IBankAccountParams } from './types';

const loadBankAccounts = {
  request: createAction(
    'LOAD_BANK_ACCOUNTS_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_BANK_ACCOUNTS_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccounts: IBankAccount[]) => resolve({ orgId, bankAccounts });
    },
  ),
  failure: createAction(
    'LOAD_BANK_ACCOUNTS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadVisibleBankAccounts = {
  request: createAction(
    'LOAD_VISIBLE_BANK_ACCOUNTS_REQUEST',
    (resolve) => {
      return (orgId: ID) => resolve({ orgId });
    },
  ),
  success: createAction(
    'LOAD_VISIBLE_BANK_ACCOUNTS_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccounts: IBankAccount[]) => resolve({ orgId, bankAccounts });
    },
  ),
  failure: createAction(
    'LOAD_VISIBLE_BANK_ACCOUNTS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createBankAccount = {
  request: createAction(
    'CREATE_BANK_ACCOUNT_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    IBankAccountParams,
        resolve: ((bankAccount: IBankAccount) => void) = noop,
        reject:  ((error: Error) => void)              = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_BANK_ACCOUNT_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccount: IBankAccount) => resolve({ orgId, bankAccount });
    },
  ),
  failure: createAction(
    'CREATE_BANK_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadBankAccount = {
  request: createAction(
    'LOAD_BANK_ACCOUNT_REQUEST',
    (resolve) => {
      return (orgId: ID, bankAccountId: ID) => resolve({ orgId, bankAccountId });
    },
  ),
  success: createAction(
    'LOAD_BANK_ACCOUNT_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccount: IBankAccount) => resolve({ orgId, bankAccount });
    },
  ),
  failure: createAction(
    'LOAD_BANK_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateBankAccount = {
  request: createAction(
    'UPDATE_BANK_ACCOUNT_REQUEST',
    (res) => {
      return (
        orgId:         ID,
        bankAccountId: ID,
        data:          IBankAccountParams,
        resolve:       ((bankAccount: IBankAccount) => void) = noop,
        reject:        ((error: Error) => void)              = noop,
      ) => res(
        { orgId, bankAccountId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_BANK_ACCOUNT_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccount: IBankAccount) => resolve({ orgId, bankAccount });
    },
  ),
  failure: createAction(
    'UPDATE_BANK_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const deleteBankAccount = {
  request: createAction(
    'DELETE_BANK_ACCOUNT_REQUEST',
    (res) => {
      return (
        orgId:         ID,
        bankAccountId: ID,
        resolve:       ((bankAccount: IBankAccount) => void) = noop,
        reject:        ((error: Error) => void)              = noop,
      ) => res(
        { orgId, bankAccountId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DELETE_BANK_ACCOUNT_SUCCESS',
    (resolve) => {
      return (orgId: ID, bankAccount: IBankAccount) => resolve({ orgId, bankAccount });
    },
  ),
  failure: createAction(
    'DELETE_BANK_ACCOUNT_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadBankAccounts,
  loadVisibleBankAccounts,
  createBankAccount,
  loadBankAccount,
  updateBankAccount,
  deleteBankAccount,
};

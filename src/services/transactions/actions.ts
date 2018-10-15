import { noop } from 'lodash';
import { createAction } from 'typesafe-actions';

import { ID, IPagination } from 'model-types';
import { ITransaction, ITransactionParams, ITransfer, ITransferParams } from './types';

const loadTransactions = {
  request: createAction(
    'LOAD_TRANSACTIONS_REQUEST',
    (resolve) => {
      return (orgId: ID, query: {}) => resolve({ orgId, query });
    },
  ),
  success: createAction(
    'LOAD_TRANSACTIONS_SUCCESS',
    (resolve) => {
      return (
        orgId:        ID,
        transactions: ITransaction[],
        pagination:   IPagination,
      ) => resolve({ orgId, transactions, pagination });
    },
  ),
  failure: createAction(
    'LOAD_TRANSACTIONS_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const loadTransaction = {
  request: createAction(
    'LOAD_TRANSACTION_REQUEST',
    (resolve) => {
      return (orgId: ID, transactionId: ID) => resolve({ orgId, transactionId });
    },
  ),
  success: createAction(
    'LOAD_TRANSACTION_SUCCESS',
    (resolve) => {
      return (orgId: ID, transaction: ITransaction) => resolve({ orgId, transaction });
    },
  ),
  failure: createAction(
    'LOAD_TRANSACTION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createTransaction = {
  request: createAction(
    'CREATE_TRANSACTION_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    ITransactionParams,
        resolve: ((transaction: ITransaction) => void) = noop,
        reject:  ((error: Error) => void)              = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_TRANSACTION_SUCCESS',
    (resolve) => {
      return (orgId: ID, transaction: ITransaction) => resolve({ orgId, transaction });
    },
  ),
  failure: createAction(
    'CREATE_TRANSACTION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const createTransfer = {
  request: createAction(
    'CREATE_TRANSFER_REQUEST',
    (res) => {
      return (
        orgId:   ID,
        data:    ITransferParams,
        resolve: ((transfer: ITransfer) => void) = noop,
        reject:  ((error: Error) => void)        = noop,
      ) => res(
        { orgId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'CREATE_TRANSFER_SUCCESS',
    (resolve) => {
      return (orgId: ID, transfer: ITransfer) => resolve({ orgId, transfer });
    },
  ),
  failure: createAction(
    'CREATE_TRANSFER_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const updateTransaction = {
  request: createAction(
    'UPDATE_TRANSACTION_REQUEST',
    (res) => {
      return (
        orgId:         ID,
        transactionId: ID,
        data:          ITransactionParams,
        resolve:       ((transaction: ITransaction) => void) = noop,
        reject:        ((error: Error) => void)              = noop,
      ) => res(
        { orgId, transactionId, data },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'UPDATE_TRANSACTION_SUCCESS',
    (resolve) => {
      return (orgId: ID, transaction: ITransaction) => resolve({ orgId, transaction });
    },
  ),
  failure: createAction(
    'UPDATE_TRANSACTION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

const destroyTransaction = {
  request: createAction(
    'DESTROY_TRANSACTION_REQUEST',
    (res) => {
      return (
        orgId:         ID,
        transactionId: ID,
        resolve:       ((transactionId: ID) => void) = noop,
        reject:        ((error: Error) => void)      = noop,
      ) => res(
        { orgId, transactionId },
        { resolve, reject },
      );
    },
  ),
  success: createAction(
    'DESTROY_TRANSACTION_SUCCESS',
    (resolve) => {
      return (orgId: ID, transactionId: ID) => resolve({ orgId, transactionId });
    },
  ),
  failure: createAction(
    'DESTROY_TRANSACTION_FAILURE',
    (resolve) => {
      return (error: Error) => resolve(error);
    },
  ),
};

export {
  loadTransactions,
  loadTransaction,
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
};

import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadTransactions = createAction(
  'LOAD_TRANSACTIONS',
  (organizationId, params) => ({ organizationId, params }),
);
loadTransactions.request = createAction(
  'LOAD_TRANSACTIONS_REQUEST',
  (organizationId) => ({ organizationId }),
);
loadTransactions.success = createAction(
  'LOAD_TRANSACTIONS_SUCCESS',
  (organizationId, transactions, pagination) => ({ organizationId, transactions, pagination }),
);
loadTransactions.failure = createAction('LOAD_TRANSACTIONS_FAILURE');

export const createTransaction = createAction(
  'CREATE_TRANSACTION',
  (organizationId, data) => ({ organizationId, data }),
  (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
createTransaction.request = createAction(
  'CREATE_TRANSACTION_REQUEST',
  (organizationId) => ({ organizationId }),
);
createTransaction.success = createAction(
  'CREATE_TRANSACTION_SUCCESS',
  (organizationId, transaction) => ({ organizationId, transaction }),
);
createTransaction.failure = createAction('CREATE_TRANSACTION_FAILURE');

export const createTransfer = createAction(
  'CREATE_TRANSFER',
  (organizationId, data) => ({ organizationId, data }),
  (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
createTransfer.request = createAction(
  'CREATE_TRANSFER_REQUEST',
  (organizationId) => ({ organizationId }),
);
createTransfer.success = createAction(
  'CREATE_TRANSFER_SUCCESS',
  (organizationId, transfer) => ({ organizationId, transfer }),
);
createTransfer.failure = createAction('CREATE_TRANSFER_FAILURE');

export const loadTransaction = createAction(
  'LOAD_TRANSACTION',
  (organizationId, transactionId) => ({ organizationId, transactionId }),
);
loadTransaction.request = createAction(
  'LOAD_TRANSACTION_REQUEST',
  (organizationId, transactionId) => ({ organizationId, transactionId }),
);
loadTransaction.success = createAction(
  'LOAD_TRANSACTION_SUCCESS',
  (organizationId, transaction) => ({ organizationId, transaction }),
);
loadTransaction.failure = createAction('LOAD_TRANSACTION_FAILURE');

export const updateTransaction = createAction(
  'UPDATE_TRANSACTION',
  (organizationId, transactionId, data) => ({ organizationId, transactionId, data }),
  (_organizationId, _transactionId, _data, resolve = noop, reject = noop) => ({ resolve, reject }),
);
updateTransaction.request = createAction(
  'UPDATE_TRANSACTION_REQUEST',
  (organizationId) => ({ organizationId }),
);
updateTransaction.success = createAction(
  'UPDATE_TRANSACTION_SUCCESS',
  (organizationId, transaction) => ({ organizationId, transaction }),
);
updateTransaction.failure = createAction('UPDATE_TRANSACTION_FAILURE');

export const destroyTransaction = createAction(
  'DESTROY_TRANSACTION',
  (organizationId, transactionId) => ({ organizationId, transactionId }),
  (_organizationId, _transactionId, resolve = noop, reject = noop) => ({ resolve, reject }),
);
destroyTransaction.request = createAction(
  'DESTROY_TRANSACTION_REQUEST',
  (organizationId) => ({ organizationId }),
);
destroyTransaction.success = createAction(
  'DESTROY_TRANSACTION_SUCCESS',
  (organizationId, transaction) => ({ organizationId, transaction }),
);
destroyTransaction.failure = createAction('DESTROY_TRANSACTION_FAILURE');

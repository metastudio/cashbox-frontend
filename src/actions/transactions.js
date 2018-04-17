import { createAction } from 'redux-actions';
import { noop } from 'lodash';

export const loadTransactions = createAction('LOAD_TRANSACTIONS', (organizationId) => ({ organizationId }));
loadTransactions.request = createAction('LOAD_TRANSACTIONS_REQUEST', (organizationId) => ({ organizationId }));
loadTransactions.success = createAction('LOAD_TRANSACTIONS_SUCCESS', (organizationId, transactions) => ({ organizationId, transactions }));
loadTransactions.failure = createAction('LOAD_TRANSACTIONS_FAILURE');

export const createTransaction = createAction('CREATE_TRANSACTION', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }));
createTransaction.request = createAction('CREATE_TRANSACTION_REQUEST', (organizationId) => ({ organizationId }));
createTransaction.success = createAction('CREATE_TRANSACTION_SUCCESS', (organizationId, transaction) => ({ organizationId, transaction }));
createTransaction.failure = createAction('CREATE_TRANSACTION_FAILURE');

export const createTransfer = createAction('CREATE_TRANSFER', (organizationId, data) => ({ organizationId, data }), (_organizationId, _data, resolve = noop, reject = noop) => ({ resolve, reject }));
createTransfer.request = createAction('CREATE_TRANSFER_REQUEST', (organizationId) => ({ organizationId }));
createTransfer.success = createAction('CREATE_TRANSFER_SUCCESS', (organizationId, transfer) => ({ organizationId, transfer }));
createTransfer.failure = createAction('CREATE_TRANSFER_FAILURE');

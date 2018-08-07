import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from './actions.js';
import {
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
} from 'services/transactions';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadBankAccounts.request]: (state) => ({
    ...state,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadBankAccounts.success]: (state, { payload }) => ({
    ...state,
    items:  payload.bankAccounts,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadBankAccounts.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload
  }),
  [updateBankAccount.success]: (state, { payload }) => ({
    ...state,
    items: state.items.map((ba) => ba.id == payload.bankAccount.id ? payload.bankAccount.id : ba),
  }),
  [deleteBankAccount.success]: (state, { payload }) => ({
    ...state,
    items:  state.items.filter((ba) => ba.id !== payload.bankAccount.id),
  }),
  [combineActions(
    createBankAccount.success,
    createTransaction.success,
    createTransfer.success,
    updateTransaction.success,
    destroyTransaction.success,
  )]: (state) => ({
    ...state,
    status: statuses.INVALID,
  })
}, defaultState);

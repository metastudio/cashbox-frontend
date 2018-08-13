import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadTransactions,
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
} from '../actions.js';

const defaultState = {
  items:      [],
  status:     statuses.INVALID,
  error:      null,
  pagination: null,
};

export default handleActions({
  [loadTransactions.request]: (state) => ({
    ...state,
    items:      [],
    status:     statuses.PENDING,
    error:      null,
    pagination: null,
  }),
  [loadTransactions.success]: (state, { payload }) => ({
    ...state,
    items:      payload.transactions,
    status:     statuses.SUCCESS,
    error:      null,
    pagination: payload.pagination,
  }),
  [loadTransactions.failure]: (state, { payload }) => ({
    ...state,
    items:      [],
    status:     statuses.FAILURE,
    error:      payload,
    pagination: null,
  }),
  [createTransaction.success]: (state, { payload }) => ({
    ...state,
    items: [payload.transaction].concat(state.items),
  }),
  [createTransfer.success]: (state, { payload }) => ({
    ...state,
    items: [payload.transfer].concat(state.items),
  }),
  [updateTransaction.success]: (state, { payload }) => ({
    ...state,
    items: state.items.map(t => t.id === payload.transaction.id ? payload.transaction : t),
  }),
  [destroyTransaction.success]: (state, { payload }) => ({
    ...state,
    items: state.items.filter(t => t.id !== payload.transactionId),
  }),
}, defaultState);

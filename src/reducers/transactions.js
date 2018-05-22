import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadTransactions,
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
} from 'actions/transactions.js';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadTransactions.request]: (state) => ({
    ...state,
    items:  [],
    status: statuses.PENDING,
    error:  null,
  }),
  [loadTransactions.success]: (state, { payload }) => ({
    ...state,
    items:  payload.transactions,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadTransactions.failure]: (state, { payload }) => ({
    ...state,
    items:  [],
    status: statuses.FAILURE,
    error:  payload
  }),
  [combineActions(
    createTransaction.success,
    createTransfer.success,
    updateTransaction.success,
    destroyTransaction.success,
  )]: (state) => ({
    ...state,
    status: statuses.INVALID,
  })
}, defaultState);

import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';

import { loadOrganizationBalances } from '../actions.js';
import {
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
} from 'services/transactions/actions';
import { setCurrentOrganization } from 'services/organizations/actions';

const defaultState = {
  status:          statuses.INVALID,
  totalAmount:     null,
  defaultCurrency: null,
  totals:          [],
  error:           null,
};

export default handleActions({
  [loadOrganizationBalances.request]: (state) => ({
    ...state,
    totalAmount:     null,
    defaultCurrency: null,
    totals:          [],
    status:          statuses.PENDING,
    error:           null,
  }),
  [loadOrganizationBalances.success]: (state, { payload }) => ({
    ...state,
    totalAmount:     payload.balances.totalAmount,
    defaultCurrency: payload.balances.defaultCurrency,
    totals:          payload.balances.totals,
    status:          statuses.SUCCESS,
    error:           null,
  }),
  [loadOrganizationBalances.failure]: (state, { payload }) => ({
    ...state,
    totalAmount:     null,
    defaultCurrency: null,
    totals:          [],
    status:          statuses.FAILURE,
    error:           payload,
  }),
  [combineActions(
    createTransaction.success,
    createTransfer.success,
    updateTransaction.success,
    destroyTransaction.success,
  )]: (state) => ({
    ...state,
    status: statuses.INVALID,
  }),
  [setCurrentOrganization.success]: (state) => ({
    ...state,
    ...defaultState,
  }),
}, defaultState);

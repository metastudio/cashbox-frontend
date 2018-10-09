import { handleActions, combineActions } from 'redux-actions';

import * as statuses from 'constants/statuses.js';
import {
  loadVisibleBankAccounts,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from '../actions.js';
import {
  createTransaction,
  createTransfer,
  updateTransaction,
  destroyTransaction,
} from 'services/transactions';
import { setCurrentOrganization } from 'services/organizations/actions';

const defaultState = {
  items:  [],
  status: statuses.INVALID,
  error:  null,
};

export default handleActions({
  [loadVisibleBankAccounts.request]: (state) => ({
    ...state,
    status: statuses.PENDING,
    error:  null,
  }),
  [loadVisibleBankAccounts.success]: (state, { payload }) => ({
    ...state,
    items:  payload.bankAccounts,
    status: statuses.SUCCESS,
    error:  null,
  }),
  [loadVisibleBankAccounts.failure]: (state, { payload }) => ({
    ...state,
    status: statuses.FAILURE,
    error:  payload,
  }),
  [deleteBankAccount.success]: (state, { payload }) => ({
    ...state,
    items: state.items.filter((ba) => ba.id !== payload.bankAccount.id),
  }),
  [combineActions(
    createBankAccount.success,
    updateBankAccount.success,
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
